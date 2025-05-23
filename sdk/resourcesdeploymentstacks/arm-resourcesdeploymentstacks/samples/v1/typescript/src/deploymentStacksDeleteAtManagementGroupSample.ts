/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { DeploymentStacksClient } from "@azure/arm-resourcesdeploymentstacks";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes a Deployment stack by name at Management Group scope. When operation completes, status code 200 returned without content.
 *
 * @summary Deletes a Deployment stack by name at Management Group scope. When operation completes, status code 200 returned without content.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackManagementGroupDelete.json
 */
async function deploymentStacksManagementGroupDelete(): Promise<void> {
  const managementGroupId = "myMg";
  const deploymentStackName = "simpleDeploymentStack";
  const credential = new DefaultAzureCredential();
  const client = new DeploymentStacksClient(credential);
  const result =
    await client.deploymentStacks.beginDeleteAtManagementGroupAndWait(
      managementGroupId,
      deploymentStackName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  deploymentStacksManagementGroupDelete();
}

main().catch(console.error);
