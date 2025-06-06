// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 *  This sample demonstrates how to use agent operations with the Microsoft Fabric tool from the Azure Agents service.
 *
 * @summary demonstrates how to use agent operations with the Microsoft Fabric tool.
 *
 */

import type { MessageContent, MessageTextContent } from "@azure/ai-agents";
import { AgentsClient, ToolUtility, isOutputOfType } from "@azure/ai-agents";
import { delay } from "@azure/core-util";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";

export async function main(): Promise<void> {
  // Create an Azure AI Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

  const connectionId = process.env["FABRIC_CONNECTION_ID"] || "<connection-name>";

  // Initialize agent Microsoft Fabric tool with the connection id
  const fabricTool = ToolUtility.createFabricTool(connectionId);

  // Create agent with the Microsoft Fabric tool and process assistant run
  const agent = await client.createAgent(modelDeploymentName, {
    name: "my-agent",
    instructions: "You are a helpful agent",
    tools: [fabricTool.definition],
  });
  console.log(`Created agent, agent ID : ${agent.id}`);

  // Create thread for communication
  const thread = await client.threads.create();
  console.log(`Created thread, thread ID: ${thread.id}`);

  // Create message to thread
  const message = await client.messages.create(
    thread.id,
    "user",
    "What are the top 3 weather events with the highest property damage?",
  );
  console.log(`Created message, message ID: ${message.id}`);

  // Create and process agent run in thread with tools
  let run = await client.runs.create(thread.id, agent.id);
  while (run.status === "queued" || run.status === "in_progress") {
    await delay(1000);
    run = await client.runs.get(thread.id, run.id);
  }
  if (run.status === "failed") {
    console.log(`Run failed: ${run.lastError}`);
  }
  console.log(`Run finished with status: ${run.status}`);
  console.log(`Failure: ${run.lastError?.message}`);

  // Delete the agent when done
  await client.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID: ${agent.id}`);

  // Fetch and log all messages
  const messagesIterator = client.messages.list(thread.id);
  console.log(`Messages:`);

  // Get the first message
  for await (const m of messagesIterator) {
    const agentMessage: MessageContent = m.content[0];
    if (isOutputOfType<MessageTextContent>(agentMessage, "text")) {
      const textContent = agentMessage as MessageTextContent;
      console.log(`Text Message Content - ${textContent.text.value}`);
    }
    break; // Only process the first message
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
