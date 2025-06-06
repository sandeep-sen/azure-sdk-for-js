/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { ServiceFabricManagementClient } from "@azure/arm-servicefabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets information about an available Service Fabric cluster code version.
 *
 * @summary Gets information about an available Service Fabric cluster code version.
 * x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ClusterVersionsGet_example.json
 */
async function getClusterVersion(): Promise<void> {
  const subscriptionId =
    process.env["SERVICEFABRIC_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const location = "eastus";
  const clusterVersion = "6.1.480.9494";
  const credential = new DefaultAzureCredential();
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  const result = await client.clusterVersions.get(location, clusterVersion);
  console.log(result);
}

async function main(): Promise<void> {
  await getClusterVersion();
}

main().catch(console.error);
