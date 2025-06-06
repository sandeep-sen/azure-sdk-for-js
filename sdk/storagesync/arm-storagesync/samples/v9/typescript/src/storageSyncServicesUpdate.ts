/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to Patch a given StorageSyncService.
 *
 * @summary Patch a given StorageSyncService.
 * x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/StorageSyncServices_Update.json
 */
import {
  StorageSyncServiceUpdateParameters,
  MicrosoftStorageSync
} from "@azure/arm-storagesync";
import { DefaultAzureCredential } from "@azure/identity";

async function storageSyncServicesUpdate(): Promise<void> {
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const resourceGroupName = "SampleResourceGroup_1";
  const storageSyncServiceName = "SampleStorageSyncService_1";
  const parameters: StorageSyncServiceUpdateParameters = {
    incomingTrafficPolicy: "AllowAllTraffic",
    tags: { dept: "IT", environment: "Test" }
  };
  const options = { parameters: parameters };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const result = await client.storageSyncServices.beginUpdateAndWait(
    resourceGroupName,
    storageSyncServiceName,
    options
  );
  console.log(result);
}

storageSyncServicesUpdate().catch(console.error);
