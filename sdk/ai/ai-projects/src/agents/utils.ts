// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AzureAISearchToolDefinition,
  AzureFunctionToolDefinition,
  CodeInterpreterToolDefinition,
  FileSearchToolDefinition,
  FileSearchToolDefinitionDetails,
  FunctionDefinition,
  FunctionToolDefinition,
  SearchConfigurationOutput,
  OpenApiToolDefinition,
  RequiredActionOutput,
  RequiredToolCallOutput,
  ToolDefinition,
  ToolDefinitionOutputParent,
  ToolResources,
  VectorStoreConfigurations,
  VectorStoreDataSource,
  AzureFunctionStorageQueue,
  AzureFunctionDefinition,
  OpenApiFunctionDefinition,
} from "./inputOutputs.js";
import type { CreateAzureAISearchToolOptions } from "../customization/models.js";

/**
 * Determines if the given output is of the specified type.
 *
 * @typeParam T - The type to check against, which extends one of the possible output parent types.
 * @param output - The action to check, which can be of type `RequiredActionOutput`, `RequiredToolCallOutput`, or `ToolDefinitionOutputParent`.
 * @param type - The type to check the action against.
 * @returns A boolean indicating whether the action is of the specified type.
 */
export function isOutputOfType<T extends { type: string }>(
  output: RequiredActionOutput | RequiredToolCallOutput | ToolDefinitionOutputParent,
  type: string,
): output is T {
  return output.type === type;
}

/** Types of connection tools used to configure an agent */
export enum connectionToolType {
  /** Bing grounding search tool */
  BingGrounding = "bing_grounding",
  /** Microsoft Fabric tool */
  MicrosoftFabric = "fabric_dataagent",
  /** Sharepoint tool */
  SharepointGrounding = "sharepoint_grounding",
  /** Azure Function tool */
  AzureFunction = "azure_function",
  /** Bing custom search tool */
  BingCustomSearch = "bing_custom_search",
}

const toolMap = {
  bing_grounding: "bingGrounding",
  fabric_dataagent: "fabric_dataagent",
  sharepoint_grounding: "sharepointGrounding",
  azure_function: "azureFunction",
  bing_custom_search: "bingCustomSearch",
};

/**
 * Utility class for creating various tools.
 */
export class ToolUtility {
  /**
   * Creates a connection tool
   *
   * @param toolType - The type of the connection tool.
   * @param connectionIds - A list of the IDs of the connections to use.
   * @returns An object containing the definition for the connection tool
   */
  static createConnectionTool(
    toolType: connectionToolType,
    connectionIds: string[],
  ): { definition: ToolDefinition } {
    return {
      definition: {
        type: toolType,
        [toolMap[toolType]]: {
          connections: connectionIds.map((connectionId) => ({ connectionId: connectionId })),
        },
      },
    };
  }

  /**
   * Creates a bing custom search tool
   *
   * @param searchConfigurations - The ID of bing search connection and instanceName.
   *
   * @returns An object containing the definition and resources for the bing custom search tool
   */

  static createBingCustomSearchTool(searchConfigurations: SearchConfigurationOutput[]): {
    definition: ToolDefinition;
  } {
    return {
      definition: {
        type: "bing_custom_search",
        bingCustomSearch: {
          searchConfigurations: searchConfigurations.map((searchConfiguration) => ({
            connectionId: searchConfiguration.connectionId,
            instanceName: searchConfiguration.instanceName,
          })),
        },
      },
    };
  }

  /**
   * Creates a file search tool
   *
   * @param vectorStoreIds - The ID of the vector store attached to this agent. There can be a maximum of 1 vector store attached to the agent.
   * @param vectorStores - The list of vector store configuration objects from Azure. This list is limited to one element. The only element of this list contains the list of azure asset IDs used by the search tool.
   * @param definitionDetails - The input definition information for a file search tool as used to configure an agent.
   *
   * @returns An object containing the definition and resources for the file search tool
   */
  static createFileSearchTool(
    vectorStoreIds?: string[],
    vectorStores?: Array<VectorStoreConfigurations>,
    definitionDetails?: FileSearchToolDefinitionDetails,
  ): { definition: FileSearchToolDefinition; resources: ToolResources } {
    return {
      definition: { type: "file_search", fileSearch: definitionDetails },
      resources: { fileSearch: { vectorStoreIds: vectorStoreIds, vectorStores: vectorStores } },
    };
  }

  /**
   * Creates a code interpreter tool
   *
   * @param fileIds - A list of file IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.
   * @param dataSources - The data sources to be used. This option is mutually exclusive with fileIds.
   *
   * @returns An object containing the definition and resources for the code interpreter tool.
   */
  static createCodeInterpreterTool(
    fileIds?: string[],
    dataSources?: Array<VectorStoreDataSource>,
  ): { definition: CodeInterpreterToolDefinition; resources: ToolResources } {
    if (fileIds && dataSources) {
      throw new Error("Cannot specify both fileIds and dataSources");
    }

    return {
      definition: { type: "code_interpreter" },
      resources: { codeInterpreter: { fileIds: fileIds, dataSources: dataSources } },
    };
  }

  /**
   * Creates an Azure Function tool
   * @param name - The name of the Azure Function.
   * @param description - The description of the Azure Function.
   * @param parameters - The parameters of the Azure Function.
   * @param inputQueue - The input queue configuration.
   * @param outputQueue - The output queue configuration.
   * @returns An object containing the definition and resources for the Azure Function tool.
   */
  static createAzureFunctionTool(
    name: string,
    description: string,
    parameters: unknown,
    inputQueue: AzureFunctionStorageQueue,
    outputQueue: AzureFunctionStorageQueue,
    definitionDetails: AzureFunctionDefinition,
  ): { definition: AzureFunctionToolDefinition; resources: ToolResources } {
    return {
      definition: { type: "azure_function", azureFunction: definitionDetails },
      resources: {
        azureFunction: {
          name: name,
          description: description,
          parameters: parameters,
          inputQueue: inputQueue,
          outputQueue: outputQueue,
        },
      },
    };
  }
  /**
   * Creates an Azure AI search tool
   *
   * @param indexConnectionId - The connection ID of the Azure AI search index.
   * @param indexName - The name of the Azure AI search index.
   *
   * @returns An object containing the definition and resources for the Azure AI search tool.
   */
  static createAzureAISearchTool(
    indexConnectionId: string,
    indexName: string,
    options?: CreateAzureAISearchToolOptions,
  ): { definition: AzureAISearchToolDefinition; resources: ToolResources } {
    return {
      definition: { type: "azure_ai_search" },
      resources: {
        azureAISearch: {
          indexes: [
            {
              indexConnectionId: indexConnectionId,
              indexName: indexName,
              queryType: options?.queryType,
              topK: options?.topK,
              filter: options?.filter,
            },
          ],
        },
      },
    };
  }

  /**
   * Creates a Microsoft Fabric tool
   *
   * @param connectionIds - A list of the IDs of the Fabric connections to use.
   * @returns An object containing the definition for the Microsoft Fabric tool
   */
  static createFabricTool(connectionId: string): { definition: ToolDefinition } {
    return {
      definition: {
        type: "fabric_dataagent",
        fabricDataAgent: {
          connections: [{ connectionId: connectionId }],
        },
      },
    };
  }

  /**
   * Creates a function tool
   *
   * @param functionDefinition - The function definition to use.
   *
   * @returns An object containing the definition for the function tool.
   */
  static createFunctionTool(functionDefinition: FunctionDefinition): {
    definition: FunctionToolDefinition;
  } {
    return {
      definition: {
        type: "function",
        function: functionDefinition,
      },
    };
  }

  /**
   * Creates an OpenApi tool
   *
   * @param openApiFunctionDefinition - The OpenApi function definition to use.
   *
   * @returns An object containing the definition for the OpenApi tool.
   */
  static createOpenApiTool(openApiFunctionDefinition: OpenApiFunctionDefinition): {
    definition: OpenApiToolDefinition;
  } {
    return {
      definition: {
        type: "openapi",
        openapi: openApiFunctionDefinition,
      },
    };
  }
}
/**
 * Represents a set of tools with their definitions and resources.
 */
export class ToolSet {
  /** A list of tool definitions that have been added to the tool set. */
  toolDefinitions: ToolDefinition[] = [];

  /** A collection of resources associated with the tools in the tool set. */
  toolResources: ToolResources = {};

  /**
   * Adds a connection tool to the tool set.
   *
   * @param toolType - The type of the connection tool.
   * @param connectionIds - A list of the IDs of the connections to use.
   *
   * @returns An object containing the definition for the connection tool
   */
  addConnectionTool(
    toolType: connectionToolType,
    connectionIds: string[],
  ): { definition: ToolDefinition } {
    const tool = ToolUtility.createConnectionTool(toolType, connectionIds);
    this.toolDefinitions.push(tool.definition);
    return tool;
  }

  /**
   * Adds a file search tool to the tool set.
   *
   * @param vectorStoreIds - The ID of the vector store attached to this agent. There can be a maximum of 1 vector store attached to the agent.
   * @param vectorStores -  The list of vector store configuration objects from Azure. This list is limited to one element. The only element of this list contains the list of azure asset IDs used by the search tool.
   * @param definitionDetails - The input definition information for a file search tool as used to configure an agent.
   *
   * @returns An object containing the definition and resources for the file search tool
   */
  addFileSearchTool(
    vectorStoreIds?: string[],
    vectorStores?: Array<VectorStoreConfigurations>,
    definitionDetails?: FileSearchToolDefinitionDetails,
  ): { definition: FileSearchToolDefinition; resources: ToolResources } {
    const tool = ToolUtility.createFileSearchTool(vectorStoreIds, vectorStores, definitionDetails);
    this.toolDefinitions.push(tool.definition);
    this.toolResources = { ...this.toolResources, ...tool.resources };
    return tool;
  }

  /**
   * Adds a code interpreter tool to the tool set.
   *
   * @param fileIds - A list of file IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.
   * @param dataSources - The data sources to be used. This option is mutually exclusive with fileIds.
   *
   * @returns An object containing the definition and resources for the code interpreter tool
   */
  addCodeInterpreterTool(
    fileIds?: string[],
    dataSources?: Array<VectorStoreDataSource>,
  ): { definition: CodeInterpreterToolDefinition; resources: ToolResources } {
    const tool = ToolUtility.createCodeInterpreterTool(fileIds, dataSources);
    this.toolDefinitions.push(tool.definition);
    this.toolResources = { ...this.toolResources, ...tool.resources };
    return tool;
  }

  /**
   * Adds an Azure AI search tool to the tool set.
   *
   * @param indexConnectionId - The connection ID of the Azure AI search index.
   * @param indexName - The name of the Azure AI search index.
   *
   * @returns An object containing the definition and resources for the Azure AI search tool
   */
  addAzureAISearchTool(
    indexConnectionId: string,
    indexName: string,
  ): { definition: AzureAISearchToolDefinition; resources: ToolResources } {
    const tool = ToolUtility.createAzureAISearchTool(indexConnectionId, indexName);
    this.toolDefinitions.push(tool.definition);
    this.toolResources = { ...this.toolResources, ...tool.resources };
    return tool;
  }

  /**
   * Adds an OpenApi tool to the tool set.
   *
   * @param openApiFunctionDefinition - The OpenApi function definition to use.
   *
   * @returns An object containing the definition for the OpenApi tool
   */
  addOpenApiTool(openApiFunctionDefinition: OpenApiFunctionDefinition): {
    definition: OpenApiToolDefinition;
  } {
    const tool = ToolUtility.createOpenApiTool(openApiFunctionDefinition);
    this.toolDefinitions.push(tool.definition);
    return tool;
  }

  /**
   * Adds an Azure Function tool to the tool set.
   *
   * @param name - The name of the Azure Function.
   * @param description - The description of the Azure Function.
   * @param parameters - The parameters of the Azure Function.
   * @param inputQueue - The input queue configuration.
   * @param outputQueue - The output queue configuration.
   *
   * @returns An object containing the definition and resources for the Azure Function tool.
   */
  addAzureFunctionTool(
    name: string,
    description: string,
    parameters: unknown,
    inputQueue: AzureFunctionStorageQueue,
    outputQueue: AzureFunctionStorageQueue,
    definitionDetails: AzureFunctionDefinition,
  ): { definition: AzureFunctionToolDefinition; resources: ToolResources } {
    const tool = ToolUtility.createAzureFunctionTool(
      name,
      description,
      parameters,
      inputQueue,
      outputQueue,
      definitionDetails,
    );
    this.toolDefinitions.push(tool.definition);
    this.toolResources = { ...this.toolResources, ...tool.resources };
    return tool;
  }
  /**
   * Adds a Microsoft Fabric tool to the tool set.
   *
   * @param connectionId - The ID of the Fabric connection to use.
   * @returns An object containing the definition for the Microsoft Fabric tool
   */
  addFabricTool(connectionId: string): { definition: ToolDefinition } {
    const tool = ToolUtility.createFabricTool(connectionId);
    this.toolDefinitions.push(tool.definition);
    return tool;
  }
}
