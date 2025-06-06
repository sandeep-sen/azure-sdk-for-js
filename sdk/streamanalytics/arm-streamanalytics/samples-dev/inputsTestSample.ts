/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { StreamAnalyticsManagementClient } from "@azure/arm-streamanalytics";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Tests whether an input’s datasource is reachable and usable by the Azure Stream Analytics service.
 *
 * @summary Tests whether an input’s datasource is reachable and usable by the Azure Stream Analytics service.
 * x-ms-original-file: specification/streamanalytics/resource-manager/Microsoft.StreamAnalytics/preview/2021-10-01-preview/examples/Input_Test.json
 */
async function testTheConnectionForAnInput(): Promise<void> {
  const subscriptionId =
    process.env["STREAMANALYTICS_SUBSCRIPTION_ID"] || "56b5e0a9-b645-407d-99b0-c64f86013e3d";
  const resourceGroupName = process.env["STREAMANALYTICS_RESOURCE_GROUP"] || "sjrg8440";
  const jobName = "sj9597";
  const inputName = "input7225";
  const credential = new DefaultAzureCredential();
  const client = new StreamAnalyticsManagementClient(credential, subscriptionId);
  const result = await client.inputs.beginTestAndWait(resourceGroupName, jobName, inputName);
  console.log(result);
}

async function main(): Promise<void> {
  await testTheConnectionForAnInput();
}

main().catch(console.error);
