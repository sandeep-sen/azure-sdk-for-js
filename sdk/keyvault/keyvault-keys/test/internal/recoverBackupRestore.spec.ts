// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { KeyClient } from "../../src/index.js";
import { testPollerProperties } from "../public/utils/recorderUtils.js";
import { Recorder, env, isPlaybackMode, isRecordMode } from "@azure-tools/test-recorder";
import { authenticate, envSetupForPlayback } from "../public/utils/testAuthentication.js";
import type TestClient from "../public/utils/testClient.js";
import { RestoreKeyBackupPoller } from "../public/utils/lro/restore/poller.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Keys client - restore keys and recover backups", () => {
  const keyPrefix = `backupRestore${env.KEY_NAME || "KeyName"}`;
  let keySuffix: string;
  let client: KeyClient;
  let testClient: TestClient;
  let recorder: Recorder;

  beforeEach(async function (ctx) {
    recorder = new Recorder(ctx);
    await recorder.start(envSetupForPlayback);

    const authentication = await authenticate(recorder);
    keySuffix = authentication.keySuffix;
    client = authentication.client;
    testClient = authentication.testClient;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // The tests follow

  it("can recover a deleted key", async function (ctx) {
    const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    const deletePoller = await client.beginDeleteKey(keyName, testPollerProperties);
    assert.equal(
      deletePoller.getResult()!.name,
      keyName,
      "Unexpected key name in result from deletePoller.getResult().",
    );
    await deletePoller.pollUntilDone();

    const getDeletedResult = await deletePoller.getResult();
    assert.equal(getDeletedResult!.name, keyName, "Unexpected key name in result from getKey().");

    const recoverPoller = await client.beginRecoverDeletedKey(keyName, testPollerProperties);
    await recoverPoller.pollUntilDone();
    const getResult = await client.getKey(keyName);
    assert.equal(getResult.name, keyName, "Unexpected key name in result from getKey().");
    await testClient.flushKey(keyName);
  });

  it("fails if one tries to recover a non-existing deleted key", async function (ctx) {
    const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
    let error;
    try {
      const recoverPoller = await client.beginRecoverDeletedKey(keyName, testPollerProperties);
      await recoverPoller.pollUntilDone();
      throw Error("Expecting an error but not catching one.");
    } catch (e: any) {
      error = e;
    }
    assert.equal(error.code, "KeyNotFound");
    assert.equal(error.statusCode, 404);
  });

  it("can generate a backup of a key", async function (ctx) {
    const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
    await client.createKey(keyName, "RSA");
    const result = await client.backupKey(keyName);
    assert.equal(Buffer.isBuffer(result), true, "Unexpected return value from backupKey()");
    assert.ok(result!.length > 0, "Unexpected length of buffer from backupKey()");
    await testClient.flushKey(keyName);
  });

  it("fails to generate a backup of a non-existing key", async function (ctx) {
    const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
    let error;
    try {
      await client.backupKey(keyName);
      throw Error("Expecting an error but not catching one.");
    } catch (e: any) {
      error = e;
    }
    assert.equal(error.code, "KeyNotFound");
    assert.equal(error.statusCode, 404);
  });

  if (isRecordMode() || isPlaybackMode()) {
    // This test can't run live,
    // since the purge operation currently can't be expected to finish anytime soon.
    it("can restore a key with a given backup", async function (ctx) {
      const keyName = testClient.formatName(`${keyPrefix}-${ctx.task.name}-${keySuffix}`);
      await client.createKey(keyName, "RSA");
      const backup = await client.backupKey(keyName);
      const deletePoller = await client.beginDeleteKey(keyName, testPollerProperties);
      await deletePoller.pollUntilDone();
      await client.purgeDeletedKey(keyName);

      // One would normally do this, but this can't immediately happen after the resource is purged:
      // await client.restoreKeyBackup(backup as Uint8Array);

      // This test implementation of a restore poller only applies for backups that have been recently deleted.
      // Backups might not be ready to be restored in an unknown amount of time.
      // If this is useful to you, please open an issue at: https://github.com/Azure/azure-sdk-for-js/issues
      const restorePoller = new RestoreKeyBackupPoller({
        backup: backup!,
        client,
        intervalInMs: testPollerProperties.intervalInMs,
      });

      const restoredKey = await restorePoller.pollUntilDone();

      assert.equal(restoredKey.name, keyName);
      await testClient.flushKey(keyName);
    });
  }

  it("fails to restore a key with a malformed backup", async () => {
    const backup = new Uint8Array(8693);
    let error;
    try {
      await client.restoreKeyBackup(backup);
      throw Error("Expecting an error but not catching one.");
    } catch (e: any) {
      error = e;
    }
    assert.equal(
      error.message,
      "Backup blob contains invalid or corrupt version.",
      "Unexpected error from restoreKeyBackup()",
    );
  });
});
