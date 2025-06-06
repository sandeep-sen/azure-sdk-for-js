/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { ExternalIdentitiesConfigurationClient } from "@azure/arm-azureadexternalidentities";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Deletes a Guest Usages resource for the Microsoft.AzureActiveDirectory resource provider
 *
 * @summary Deletes a Guest Usages resource for the Microsoft.AzureActiveDirectory resource provider
 * x-ms-original-file: specification/cpim/resource-manager/Microsoft.AzureActiveDirectory/stable/2021-04-01/examples/GuestUsagesDelete.json
 */
async function guestUsagesDelete(): Promise<void> {
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const resourceGroupName = "contosoResourceGroup";
  const resourceName = "contoso.onmicrosoft.com";
  const credential = new DefaultAzureCredential();
  const client = new ExternalIdentitiesConfigurationClient(credential, subscriptionId);
  const result = await client.guestUsages.delete(resourceGroupName, resourceName);
  console.log(result);
}

guestUsagesDelete().catch(console.error);
