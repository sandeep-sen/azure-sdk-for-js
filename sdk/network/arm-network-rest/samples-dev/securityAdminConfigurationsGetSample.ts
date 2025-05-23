// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { SecurityAdminConfigurationsGetParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieves a network manager security admin configuration.
 *
 * @summary Retrieves a network manager security admin configuration.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkManagerSecurityAdminConfigurationGet.json
 */
async function getSecurityAdminConfigurations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkManagerName = "testNetworkManager";
  const configurationName = "myTestSecurityConfig";
  const options: SecurityAdminConfigurationsGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/securityAdminConfigurations/{configurationName}",
      subscriptionId,
      resourceGroupName,
      networkManagerName,
      configurationName,
    )
    .get(options);
  console.log(result);
}

getSecurityAdminConfigurations().catch(console.error);
