/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  TagsObject,
  HybridNetworkManagementClient
} from "@azure/arm-hybridnetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates a artifact manifest resource.
 *
 * @summary Updates a artifact manifest resource.
 * x-ms-original-file: specification/hybridnetwork/resource-manager/Microsoft.HybridNetwork/stable/2023-09-01/examples/ArtifactManifestUpdateTags.json
 */
async function updateAArtifactManifestResourceTags(): Promise<void> {
  const subscriptionId =
    process.env["HYBRIDNETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HYBRIDNETWORK_RESOURCE_GROUP"] || "rg";
  const publisherName = "TestPublisher";
  const artifactStoreName = "TestArtifactStore";
  const artifactManifestName = "TestManifest";
  const parameters: TagsObject = { tags: { tag1: "value1", tag2: "value2" } };
  const credential = new DefaultAzureCredential();
  const client = new HybridNetworkManagementClient(credential, subscriptionId);
  const result = await client.artifactManifests.update(
    resourceGroupName,
    publisherName,
    artifactStoreName,
    artifactManifestName,
    parameters
  );
  console.log(result);
}

async function main(): Promise<void> {
  updateAArtifactManifestResourceTags();
}

main().catch(console.error);
