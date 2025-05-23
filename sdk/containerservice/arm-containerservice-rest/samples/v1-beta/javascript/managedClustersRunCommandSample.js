/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const ContainerServiceManagementClient = require("@azure-rest/arm-containerservice").default,
  { getLongRunningPoller } = require("@azure-rest/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to AKS will create a pod to run the command. This is primarily useful for private clusters. For more information see [AKS Run Command](https://learn.microsoft.com/azure/aks/private-clusters#aks-run-command-preview).
 *
 * @summary AKS will create a pod to run the command. This is primarily useful for private clusters. For more information see [AKS Run Command](https://learn.microsoft.com/azure/aks/private-clusters#aks-run-command-preview).
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/preview/2022-05-02-preview/examples/RunCommandRequest.json
 */
async function submitNewCommand() {
  const subscriptionId = "subid1";
  const resourceGroupName = "rg1";
  const resourceName = "clustername1";
  const requestPayload = {
    body: {
      clusterToken: "",
      command: "kubectl apply -f ns.yaml",
      context: "",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = ContainerServiceManagementClient(credential);
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/runCommand",
      subscriptionId,
      resourceGroupName,
      resourceName,
    )
    .post(requestPayload);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = poller.pollUntilDone();
  console.log(result);
}

submitNewCommand().catch(console.error);
