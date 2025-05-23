// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProgrammableConnectivityClient } = require("@azure/arm-programmableconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get an Operator API Connection.
 *
 * @summary get an Operator API Connection.
 * x-ms-original-file: 2024-01-15-preview/OperatorApiConnections_Get_MaximumSet_Gen.json
 */
async function operatorApiConnectionsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "B976474B-99FA-4C25-A3BD-8B05C3C3D07A";
  const client = new ProgrammableConnectivityClient(credential, subscriptionId);
  const result = await client.operatorApiConnections.get("rgopenapi", "uetzqjrwqtkwgcirdqy");
  console.log(result);
}

async function main() {
  await operatorApiConnectionsGet();
}

main().catch(console.error);
