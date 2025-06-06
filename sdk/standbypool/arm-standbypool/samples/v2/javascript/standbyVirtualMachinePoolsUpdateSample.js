// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StandbyPoolManagementClient } = require("@azure/arm-standbypool");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a StandbyVirtualMachinePoolResource
 *
 * @summary update a StandbyVirtualMachinePoolResource
 * x-ms-original-file: 2025-03-01/StandbyVirtualMachinePools_Update.json
 */
async function standbyVirtualMachinePoolsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000009";
  const client = new StandbyPoolManagementClient(credential, subscriptionId);
  const result = await client.standbyVirtualMachinePools.update("rgstandbypool", "pool", {
    tags: {},
    properties: {
      elasticityProfile: { maxReadyCapacity: 304, minReadyCapacity: 300 },
      virtualMachineState: "Running",
      attachedVirtualMachineScaleSetId:
        "/subscriptions/00000000-0000-0000-0000-000000000009/resourceGroups/rgstandbypool/providers/Microsoft.Compute/virtualMachineScaleSets/myVmss",
    },
  });
  console.log(result);
}

async function main() {
  await standbyVirtualMachinePoolsUpdate();
}

main().catch(console.error);
