/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get a specific governance rule for the requested scope by ruleId
 *
 * @summary Get a specific governance rule for the requested scope by ruleId
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2022-01-01-preview/examples/GovernanceRules/GetManagementGroupGovernanceRule_example.json
 */
async function getAGovernanceRuleOverManagementGroupScope(): Promise<void> {
  const scope = "providers/Microsoft.Management/managementGroups/contoso";
  const ruleId = "ad9a8e26-29d9-4829-bb30-e597a58cdbb8";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.governanceRules.get(scope, ruleId);
  console.log(result);
}

/**
 * This sample demonstrates how to Get a specific governance rule for the requested scope by ruleId
 *
 * @summary Get a specific governance rule for the requested scope by ruleId
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2022-01-01-preview/examples/GovernanceRules/GetSecurityConnectorGovernanceRule_example.json
 */
async function getAGovernanceRuleOverSecurityConnectorScope(): Promise<void> {
  const scope =
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/gcpResourceGroup/providers/Microsoft.Security/securityConnectors/gcpconnector";
  const ruleId = "ad9a8e26-29d9-4829-bb30-e597a58cdbb8";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.governanceRules.get(scope, ruleId);
  console.log(result);
}

/**
 * This sample demonstrates how to Get a specific governance rule for the requested scope by ruleId
 *
 * @summary Get a specific governance rule for the requested scope by ruleId
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2022-01-01-preview/examples/GovernanceRules/GetGovernanceRule_example.json
 */
async function getAGovernanceRuleOverSubscriptionScope(): Promise<void> {
  const scope = "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const ruleId = "ad9a8e26-29d9-4829-bb30-e597a58cdbb8";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.governanceRules.get(scope, ruleId);
  console.log(result);
}

async function main(): Promise<void> {
  await getAGovernanceRuleOverManagementGroupScope();
  await getAGovernanceRuleOverSecurityConnectorScope();
  await getAGovernanceRuleOverSubscriptionScope();
}

main().catch(console.error);
