/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get the specified public IP address in a cloud service.
 *
 * @summary Get the specified public IP address in a cloud service.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-05-01/examples/CloudServicePublicIpGet.json
 */
async function getVmssPublicIP(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "cs-tester";
  const cloudServiceName = "cs1";
  const roleInstanceName = "Test_VM_0";
  const networkInterfaceName = "nic1";
  const ipConfigurationName = "ip1";
  const publicIpAddressName = "pub1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPAddresses.getCloudServicePublicIPAddress(
    resourceGroupName,
    cloudServiceName,
    roleInstanceName,
    networkInterfaceName,
    ipConfigurationName,
    publicIpAddressName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getVmssPublicIP();
}

main().catch(console.error);
