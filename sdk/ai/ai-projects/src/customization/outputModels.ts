// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** An abstract representation of an input tool definition that an agent can use. */
export interface ToolDefinitionOutputParent {
  type: string;
}

/** The input definition information for a code interpreter tool as used to configure an agent. */
export interface CodeInterpreterToolDefinitionOutput extends ToolDefinitionOutputParent {
  /** The object type, which is always 'code_interpreter'. */
  type: "code_interpreter";
}

/** The input definition information for a file search tool as used to configure an agent. */
export interface FileSearchToolDefinitionOutput extends ToolDefinitionOutputParent {
  /** The object type, which is always 'file_search'. */
  type: "file_search";
  /** Options overrides for the file search tool. */
  fileSearch?: FileSearchToolDefinitionDetailsOutput;
}

/** Options overrides for the file search tool. */
export interface FileSearchToolDefinitionDetailsOutput {
  /**
   * The maximum number of results the file search tool should output. The default is 20 for gpt-4* models and 5 for gpt-3.5-turbo. This number should be between 1 and 50 inclusive.
   *
   * Note that the file search tool may output fewer than `maxNumResults` results. See the file search tool documentation for more information.
   */
  maxNumResults?: number;
  /** Ranking options for file search. */
  rankingOptions?: FileSearchRankingOptionsOutput;
}

/** Ranking options for file search. */
export interface FileSearchRankingOptionsOutput {
  /** File search ranker. */
  ranker: string;
  /** Ranker search threshold. */
  scoreThreshold: number;
}

/** The input definition information for a function tool as used to configure an agent. */
export interface FunctionToolDefinitionOutput extends ToolDefinitionOutputParent {
  /** The object type, which is always 'function'. */
  type: "function";
  /** The definition of the concrete function that the function tool should call. */
  function: FunctionDefinitionOutput;
}

/** The input definition information for a function. */
export interface FunctionDefinitionOutput {
  /** The name of the function to be called. */
  name: string;
  /** A description of what the function does, used by the model to choose when and how to call the function. */
  description?: string;
  /** The parameters the functions accepts, described as a JSON Schema object. */
  parameters: any;
}

/** The input definition information for a bing grounding search tool as used to configure an agent. */
export interface BingGroundingToolDefinitionOutput extends ToolDefinitionOutputParent {
  /** The object type, which is always 'bing_grounding'. */
  type: "bing_grounding";
  /** The list of connections used by the bing grounding tool. */
  bingGrounding: ToolConnectionListOutput;
}

/** The input definition information for a bing custom search tool as used to configure an agent. */
export interface BingCustomSearchToolDefinitionOutput extends ToolDefinitionOutputParent {
  /** The object type, which is always 'bing_custom_search'. */
  type: "bing_custom_search";
  /** The list of connections used by the bing custom search tool. */
  bingCustomSearch?: SearchConfigurationListOutput;
}

/** A set of connection resources currently used by either the `bing_grounding`, `fabric_dataagent`, or `sharepoint_grounding` tools. */
export interface ToolConnectionListOutput {
  /**
   * The connections attached to this tool. There can be a maximum of 1 connection
   * resource attached to the tool.
   */
  connections?: Array<ToolConnectionOutput>;
}

/** An array of connection resources currently used by the `bing_custom_search` tool. */
export interface SearchConfigurationListOutput {
  /** The connections attached to this tool. */
  searchConfigurations?: Array<SearchConfigurationOutput>;
}

/** The connection information for a search configuration. This is used by the `bing_custom_search` tool. */
export interface SearchConfigurationOutput {
  /** The connection ID of the search configuration. */
  connectionId: string;
  /** The name of the search configuration. */
  instanceName: string;
}

/** A connection resource. */
export interface ToolConnectionOutput {
  /** A connection in a ToolConnectionList attached to this tool. */
  connectionId: string;
}

/** The input definition information for a Microsoft Fabric tool as used to configure an agent. */
export interface MicrosoftFabricToolDefinitionOutput extends ToolDefinitionOutputParent {
  /** The object type, which is always 'fabric_dataagent'. */
  type: "fabric_dataagent";
  /** The list of connections used by the Microsoft Fabric tool. */
  fabricDataAgent: ToolConnectionListOutput;
}

/** The input definition information for a sharepoint tool as used to configure an agent. */
export interface SharepointToolDefinitionOutput extends ToolDefinitionOutputParent {
  /** The object type, which is always 'sharepoint_grounding'. */
  type: "sharepoint_grounding";
  /** The list of connections used by the SharePoint tool. */
  sharepointGrounding: ToolConnectionListOutput;
}

/** The input definition information for an Azure AI search tool as used to configure an agent. */
export interface AzureAISearchToolDefinitionOutput extends ToolDefinitionOutputParent {
  /** The object type, which is always 'azure_ai_search'. */
  type: "azure_ai_search";
}

/** The input definition information for an OpenAPI tool as used to configure an agent. */
export interface OpenApiToolDefinitionOutput extends ToolDefinitionOutputParent {
  /** The object type, which is always 'openapi'. */
  type: "openapi";
  /** The openapi function definition. */
  openapi: OpenApiFunctionDefinitionOutput;
}

/** The input definition information for an openapi function. */
export interface OpenApiFunctionDefinitionOutput {
  /** The name of the function to be called. */
  name: string;
  /** A description of what the function does, used by the model to choose when and how to call the function. */
  description?: string;
  /** The openapi function shape, described as a JSON Schema object. */
  spec: any;
  /** Open API authentication details */
  auth: OpenApiAuthDetailsOutput;
}

/** authentication details for OpenApiFunctionDefinition */
export interface OpenApiAuthDetailsOutputParent {
  type: OpenApiAuthTypeOutput;
}

/** Security details for OpenApi anonymous authentication */
export interface OpenApiAnonymousAuthDetailsOutput extends OpenApiAuthDetailsOutputParent {
  /** The object type, which is always 'anonymous'. */
  type: "anonymous";
}

/** Security details for OpenApi connection authentication */
export interface OpenApiConnectionAuthDetailsOutput extends OpenApiAuthDetailsOutputParent {
  /** The object type, which is always 'connection'. */
  type: "connection";
  /** Connection auth security details */
  securityScheme: OpenApiConnectionSecuritySchemeOutput;
}

/** Security scheme for OpenApi managed_identity authentication */
export interface OpenApiConnectionSecuritySchemeOutput {
  /** Connection id for Connection auth type */
  connectionId: string;
}

/** Security details for OpenApi managed_identity authentication */
export interface OpenApiManagedAuthDetailsOutput extends OpenApiAuthDetailsOutputParent {
  /** The object type, which is always 'managed_identity'. */
  type: "managed_identity";
  /** Connection auth security details */
  securityScheme: OpenApiManagedSecuritySchemeOutput;
}

/** Security scheme for OpenApi managed_identity authentication */
export interface OpenApiManagedSecuritySchemeOutput {
  /** Authentication scope for managed_identity auth type */
  audience: string;
}

/** The input definition information for a azure function tool as used to configure an agent. */
export interface AzureFunctionToolDefinitionOutput extends ToolDefinitionOutputParent {
  /** The object type, which is always 'azure_function'. */
  type: "azure_function";
  /** The definition of the concrete function that the function tool should call. */
  azureFunction: AzureFunctionDefinitionOutput;
}

/** The definition of Azure function. */
export interface AzureFunctionDefinitionOutput {
  /** The definition of azure function and its parameters. */
  function: FunctionDefinitionOutput;
  /** Input storage queue. The queue storage trigger runs a function as messages are added to it. */
  inputBinding: AzureFunctionBindingOutput;
  /** Output storage queue. The function writes output to this queue when the input items are processed. */
  outputBinding: AzureFunctionBindingOutput;
}

/** The structure for keeping storage queue name and URI. */
export interface AzureFunctionBindingOutput {
  /** The type of binding, which is always 'storage_queue'. */
  type: "storage_queue";
  /** Storage queue. */
  storageQueue: AzureFunctionStorageQueueOutput;
}

/** The structure for keeping storage queue name and URI. */
export interface AzureFunctionStorageQueueOutput {
  /** URI to the Azure Storage Queue service allowing you to manipulate a queue. */
  queueServiceEndpoint: string;
  /** The name of an Azure function storage queue. */
  queueName: string;
}

/**
 * A set of resources that are used by the agent's tools. The resources are specific to the type of
 * tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search`
 * tool requires a list of vector store IDs.
 */
export interface ToolResourcesOutput {
  /** Resources to be used by the `code_interpreter` tool consisting of file IDs. */
  codeInterpreter?: CodeInterpreterToolResourceOutput;
  /** Resources to be used by the `file_search` tool consisting of vector store IDs. */
  fileSearch?: FileSearchToolResourceOutput;
  /** Resources to be used by the `azure_ai_search` tool consisting of index IDs and names. */
  azureAISearch?: AzureAISearchResourceOutput;
}

/** A set of resources that are used by the `code_interpreter` tool. */
export interface CodeInterpreterToolResourceOutput {
  /**
   * A list of file IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files
   * associated with the tool.
   */
  fileIds?: string[];
  /** The data sources to be used. This option is mutually exclusive with the `fileIds` property. */
  dataSources?: Array<VectorStoreDataSourceOutput>;
}

/**
 * The structure, containing Azure asset URI path and the asset type of the file used as a data source
 * for the enterprise file search.
 */
export interface VectorStoreDataSourceOutput {
  /** Asset URI. */
  uri: string;
  /**
   * The asset type
   *
   * Possible values: "uri_asset", "id_asset"
   */
  type: VectorStoreDataSourceAssetTypeOutput;
}

/** A set of resources that are used by the `file_search` tool. */
export interface FileSearchToolResourceOutput {
  /**
   * The ID of the vector store attached to this agent. There can be a maximum of 1 vector
   * store attached to the agent.
   */
  vectorStoreIds?: string[];
  /**
   * The list of vector store configuration objects from Azure.
   * This list is limited to one element.
   * The only element of this list contains the list of azure asset IDs used by the search tool.
   */
  vectorStores?: Array<VectorStoreConfigurationsOutput>;
}

/** The structure, containing the list of vector storage configurations i.e. the list of azure asset IDs. */
export interface VectorStoreConfigurationsOutput {
  /** Name */
  name: string;
  /** Configurations */
  configuration: VectorStoreConfigurationOutput;
}

/**
 * Vector storage configuration is the list of data sources, used when multiple
 * files can be used for the enterprise file search.
 */
export interface VectorStoreConfigurationOutput {
  /** Data sources */
  dataSources: Array<VectorStoreDataSourceOutput>;
}

/** A set of index resources used by the `azure_ai_search` tool. */
export interface AzureAISearchResourceOutput {
  /**
   * The indices attached to this agent. There can be a maximum of 1 index
   * resource attached to the agent.
   */
  indexes?: Array<IndexResourceOutput>;
}

/** A Index resource. */
export interface IndexResourceOutput {
  /** An index connection id in an IndexResource attached to this agent. */
  indexConnectionId: string;
  /** The name of an index in an IndexResource attached to this agent. */
  indexName: string;
}

/**
 * An object describing the expected output of the model. If `json_object` only `function` type `tools` are allowed to be passed to the Run.
 * If `text` the model can return text or any value needed.
 */
export interface AgentsApiResponseFormatOutput {
  /**
   * Must be one of `text` or `json_object`.
   *
   * Possible values: "text", "json_object"
   */
  type?: ResponseFormatOutput;
}

/** The type of response format being defined: `json_schema` */
export interface ResponseFormatJsonSchemaTypeOutput {
  /** Type */
  type: "json_schema";
  /** The JSON schema, describing response format. */
  jsonSchema: ResponseFormatJsonSchemaOutput;
}

/** A description of what the response format is for, used by the model to determine how to respond in the format. */
export interface ResponseFormatJsonSchemaOutput {
  /** A description of what the response format is for, used by the model to determine how to respond in the format. */
  description?: string;
  /** The name of a schema. */
  name: string;
  /** The JSON schema object, describing the response format. */
  schema: any;
}

/** Represents an agent that can call the model and use tools. */
export interface AgentOutput {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always assistant. */
  object: "assistant";
  /** The Unix timestamp, in seconds, representing when this object was created. */
  createdAt: Date;
  /** The name of the agent. */
  name: string | null;
  /** The description of the agent. */
  description: string | null;
  /** The ID of the model to use. */
  model: string;
  /** The system instructions for the agent to use. */
  instructions: string | null;
  /** The collection of tools enabled for the agent. */
  tools: Array<ToolDefinitionOutput>;
  /**
   * A set of resources that are used by the agent's tools. The resources are specific to the type of tool. For example, the `code_interpreter`
   * tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.
   */
  toolResources: ToolResourcesOutput | null;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random,
   * while lower values like 0.2 will make it more focused and deterministic.
   */
  temperature: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass.
   * So 0.1 means only the tokens comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or temperature but not both.
   */
  topP: number | null;
  /** The response format of the tool calls used by this agent. */
  responseFormat?: AgentsApiResponseFormatOptionOutput | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata: Record<string, string> | null;
}

/** The response data for a requested list of items. */
export interface OpenAIPageableListOfAgentOutput {
  /** The object type, which is always list. */
  object: "list";
  /** The requested list of items. */
  data: Array<AgentOutput>;
  /** The first ID represented in this list. */
  firstId: string;
  /** The last ID represented in this list. */
  lastId: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

/** The status of an agent deletion operation. */
export interface AgentDeletionStatusOutput {
  /** The ID of the resource specified for deletion. */
  id: string;
  /** A value indicating whether deletion was successful. */
  deleted: boolean;
  /** The object type, which is always 'assistant.deleted'. */
  object: "assistant.deleted";
}

/** This describes to which tools a file has been attached. */
export interface MessageAttachmentOutput {
  /** The ID of the file to attach to the message. */
  fileId?: string;
  /** Azure asset ID. */
  dataSource?: VectorStoreDataSourceOutput;
  /** The tools to add to this file. */
  tools: MessageAttachmentToolDefinitionOutput[];
}

/** Information about a single thread associated with an agent. */
export interface AgentThreadOutput {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always 'thread'. */
  object: "thread";
  /** The Unix timestamp, in seconds, representing when this object was created. */
  createdAt: Date;
  /**
   * A set of resources that are made available to the agent's tools in this thread. The resources are specific to the type
   * of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list
   * of vector store IDs.
   */
  toolResources: ToolResourcesOutput | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata: Record<string, string> | null;
}

/** The status of a thread deletion operation. */
export interface ThreadDeletionStatusOutput {
  /** The ID of the resource specified for deletion. */
  id: string;
  /** A value indicating whether deletion was successful. */
  deleted: boolean;
  /** The object type, which is always 'thread.deleted'. */
  object: "thread.deleted";
}

/** The response data for a requested list of items. */
export interface OpenAIPageableListOfAgentThreadOutput {
  /** The object type, which is always list. */
  object: "list";
  /** The requested list of items. */
  data: Array<AgentThreadOutput>;
  /** The first ID represented in this list. */
  firstId: string;
  /** The last ID represented in this list. */
  lastId: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

/** A single, existing message within an agent thread. */
export interface ThreadMessageOutput {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always 'thread.message'. */
  object: "thread.message";
  /** The Unix timestamp, in seconds, representing when this object was created. */
  createdAt: Date;
  /** The ID of the thread that this message belongs to. */
  threadId: string;
  /**
   * The status of the message.
   *
   * Possible values: "in_progress", "incomplete", "completed"
   */
  status: MessageStatusOutput;
  /** On an incomplete message, details about why the message is incomplete. */
  incompleteDetails: MessageIncompleteDetailsOutput | null;
  /** The Unix timestamp (in seconds) for when the message was completed. */
  completedAt: Date | null;
  /** The Unix timestamp (in seconds) for when the message was marked as incomplete. */
  incompleteAt: Date | null;
  /**
   * The role associated with the agent thread message.
   *
   * Possible values: "user", "assistant"
   */
  role: MessageRoleOutput;
  /** The list of content items associated with the agent thread message. */
  content: Array<MessageContentOutput>;
  /** If applicable, the ID of the agent that authored this message. */
  assistantId: string | null;
  /** If applicable, the ID of the run associated with the authoring of this message. */
  runId: string | null;
  /** A list of files attached to the message, and the tools they were added to. */
  attachments: Array<MessageAttachmentOutput> | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata: Record<string, string> | null;
}

/** Information providing additional detail about a message entering an incomplete status. */
export interface MessageIncompleteDetailsOutput {
  /**
   * The provided reason describing why the message was marked as incomplete.
   *
   * Possible values: "content_filter", "max_tokens", "run_cancelled", "run_failed", "run_expired"
   */
  reason: MessageIncompleteDetailsReasonOutput;
}

/** An abstract representation of a single item of thread message content. */
export interface MessageContentOutputParent {
  type: string;
}

/** A representation of a textual item of thread message content. */
export interface MessageTextContentOutput extends MessageContentOutputParent {
  /** The object type, which is always 'text'. */
  type: "text";
  /** The text and associated annotations for this thread message content item. */
  text: MessageTextDetailsOutput;
}

/** The text and associated annotations for a single item of agent thread message content. */
export interface MessageTextDetailsOutput {
  /** The text data. */
  value: string;
  /** A list of annotations associated with this text. */
  annotations: Array<MessageTextAnnotationOutput>;
}

/** An abstract representation of an annotation to text thread message content. */
export interface MessageTextAnnotationOutputParent {
  /** The textual content associated with this text annotation item. */
  text: string;
  type: string;
}

/** A citation within the message that points to a specific quote from a specific File associated with the agent or the message. Generated when the agent uses the 'file_search' tool to search files. */
export interface MessageTextFileCitationAnnotationOutput extends MessageTextAnnotationOutputParent {
  /** The object type, which is always 'file_citation'. */
  type: "file_citation";
  /**
   * A citation within the message that points to a specific quote from a specific file.
   * Generated when the agent uses the "file_search" tool to search files.
   */
  fileCitation: MessageTextFileCitationDetailsOutput;
  /** The first text index associated with this text annotation. */
  startIndex?: number;
  /** The last text index associated with this text annotation. */
  endIndex?: number;
}

/** A representation of a file-based text citation, as used in a file-based annotation of text thread message content. */
export interface MessageTextFileCitationDetailsOutput {
  /** The ID of the file associated with this citation. */
  fileId: string;
  /** The specific quote cited in the associated file. */
  quote: string;
}

/** A citation within the message that points to a file located at a specific path. */
export interface MessageTextFilePathAnnotationOutput extends MessageTextAnnotationOutputParent {
  /** The object type, which is always 'file_path'. */
  type: "file_path";
  /** A URL for the file that's generated when the agent used the code_interpreter tool to generate a file. */
  filePath: MessageTextFilePathDetailsOutput;
  /** The first text index associated with this text annotation. */
  startIndex?: number;
  /** The last text index associated with this text annotation. */
  endIndex?: number;
}

/** An encapsulation of an image file ID, as used by message image content. */
export interface MessageTextFilePathDetailsOutput {
  /** The ID of the specific file that the citation is from. */
  fileId: string;
}

/** A representation of image file content in a thread message. */
export interface MessageImageFileContentOutput extends MessageContentOutputParent {
  /** The object type, which is always 'image_file'. */
  type: "image_file";
  /** The image file for this thread message content item. */
  imageFile: MessageImageFileDetailsOutput;
}

/** An image reference, as represented in thread message content. */
export interface MessageImageFileDetailsOutput {
  /** The ID for the file associated with this image. */
  fileId: string;
}

/** The response data for a requested list of items. */
export interface OpenAIPageableListOfThreadMessageOutput {
  /** The object type, which is always list. */
  object: "list";
  /** The requested list of items. */
  data: Array<ThreadMessageOutput>;
  /** The first ID represented in this list. */
  firstId: string;
  /** The last ID represented in this list. */
  lastId: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

/**
 * Controls for how a thread will be truncated prior to the run. Use this to control the initial
 * context window of the run.
 */
export interface TruncationObjectOutput {
  /**
   * The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will
   * be truncated to the `lastMessages` count most recent messages in the thread. When set to `auto`, messages in the middle of the thread
   * will be dropped to fit the context length of the model, `max_prompt_tokens`.
   *
   * Possible values: "auto", "last_messages"
   */
  type: TruncationStrategyOutput;
  /** The number of most recent messages from the thread when constructing the context for the run. */
  lastMessages?: number | null;
}

/** Specifies a tool the model should use. Use to force the model to call a specific tool. */
export interface AgentsNamedToolChoiceOutput {
  /**
   * the type of tool. If type is `function`, the function name must be set.
   *
   * Possible values: "function", "code_interpreter", "file_search", "bing_grounding", "fabric_dataagent", "sharepoint_grounding", "azure_ai_search"
   */
  type: AgentsNamedToolChoiceTypeOutput;
  /** The name of the function to call */
  function?: FunctionNameOutput;
}

/** The function name that will be used, if using the `function` tool */
export interface FunctionNameOutput {
  /** The name of the function to call */
  name: string;
}

/** Data representing a single evaluation run of an agent thread. */
export interface ThreadRunOutput {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always 'thread.run'. */
  object: "thread.run";
  /** The ID of the thread associated with this run. */
  threadId: string;
  /** The ID of the agent associated with the thread this run was performed against. */
  assistantId: string;
  /**
   * The status of the agent thread run.
   *
   * Possible values: "queued", "in_progress", "requires_action", "cancelling", "cancelled", "failed", "completed", "expired"
   */
  status: RunStatusOutput;
  /** The details of the action required for the agent thread run to continue. */
  requiredAction?: RequiredActionOutput | null;
  /** The last error, if any, encountered by this agent thread run. */
  lastError: RunErrorOutput | null;
  /** The ID of the model to use. */
  model: string;
  /** The overridden system instructions used for this agent thread run. */
  instructions: string;
  /** The overridden enabled tools used for this agent thread run. */
  tools: Array<ToolDefinitionOutput>;
  /** The Unix timestamp, in seconds, representing when this object was created. */
  createdAt: Date;
  /** The Unix timestamp, in seconds, representing when this item expires. */
  expiresAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this item was started. */
  startedAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this completed. */
  completedAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this was cancelled. */
  cancelledAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this failed. */
  failedAt: Date | null;
  /** Details on why the run is incomplete. Will be `null` if the run is not incomplete. */
  incompleteDetails: IncompleteRunDetailsOutput | null;
  /** Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.). */
  usage: RunCompletionUsageOutput | null;
  /** The sampling temperature used for this run. If not set, defaults to 1. */
  temperature?: number | null;
  /** The nucleus sampling value used for this run. If not set, defaults to 1. */
  topP?: number | null;
  /** The maximum number of prompt tokens specified to have been used over the course of the run. */
  maxPromptTokens: number | null;
  /** The maximum number of completion tokens specified to have been used over the course of the run. */
  maxCompletionTokens: number | null;
  /** The strategy to use for dropping messages as the context windows moves forward. */
  truncationStrategy: TruncationObjectOutput | null;
  /** Controls whether or not and which tool is called by the model. */
  toolChoice: AgentsApiToolChoiceOptionOutput | null;
  /** The response format of the tool calls used in this run. */
  responseFormat: AgentsApiResponseFormatOptionOutput | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata: Record<string, string> | null;
  /** Override the tools the agent can use for this run. This is useful for modifying the behavior on a per-run basis */
  toolResources?: UpdateToolResourcesOptionsOutput | null;
  /** Determines if tools can be executed in parallel within the run. */
  parallelToolCalls: boolean;
}

/** An abstract representation of a required action for an agent thread run to continue. */
export interface RequiredActionOutputParent {
  type: string;
}

/** The details for required tool calls that must be submitted for an agent thread run to continue. */
export interface SubmitToolOutputsActionOutput extends RequiredActionOutputParent {
  /** The object type, which is always 'submit_tool_outputs'. */
  type: "submit_tool_outputs";
  /** The details describing tools that should be called to submit tool outputs. */
  submitToolOutputs: SubmitToolOutputsDetailsOutput;
}

/** The details describing tools that should be called to submit tool outputs. */
export interface SubmitToolOutputsDetailsOutput {
  /** The list of tool calls that must be resolved for the agent thread run to continue. */
  toolCalls: Array<RequiredToolCallOutput>;
}

/** An abstract representation of a tool invocation needed by the model to continue a run. */
export interface RequiredToolCallOutputParent {
  /** The ID of the tool call. This ID must be referenced when submitting tool outputs. */
  id: string;
  type: string;
}

/** A representation of a requested call to a function tool, needed by the model to continue evaluation of a run. */
export interface RequiredFunctionToolCallOutput extends RequiredToolCallOutputParent {
  /** The object type of the required tool call. Always 'function' for function tools. */
  type: "function";
  /** Detailed information about the function to be executed by the tool that includes name and arguments. */
  function: RequiredFunctionToolCallDetailsOutput;
}

/** The detailed information for a function invocation, as provided by a required action invoking a function tool, that includes the name of and arguments to the function. */
export interface RequiredFunctionToolCallDetailsOutput {
  /** The name of the function. */
  name: string;
  /** The arguments to use when invoking the named function, as provided by the model. Arguments are presented as a JSON document that should be validated and parsed for evaluation. */
  arguments: string;
}

/** The details of an error as encountered by an agent thread run. */
export interface RunErrorOutput {
  /** The status for the error. */
  code: string;
  /** The human-readable text associated with the error. */
  message: string;
}

/** Details on why the run is incomplete. Will be `null` if the run is not incomplete. */
export interface IncompleteRunDetailsOutput {
  /**
   * The reason why the run is incomplete. This indicates which specific token limit was reached during the run.
   *
   * Possible values: "max_completion_tokens", "max_prompt_tokens"
   */
  reason: IncompleteDetailsReasonOutput;
}

/** Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.). */
export interface RunCompletionUsageOutput {
  /** Number of completion tokens used over the course of the run. */
  completionTokens: number;
  /** Number of prompt tokens used over the course of the run. */
  promptTokens: number;
  /** Total number of tokens used (prompt + completion). */
  totalTokens: number;
}

/**
 * Request object. A set of resources that are used by the agent's tools. The resources are specific to the type of tool.
 * For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of
 * vector store IDs.
 */
export interface UpdateToolResourcesOptionsOutput {
  /**
   * Overrides the list of file IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files
   * associated with the tool.
   */
  codeInterpreter?: UpdateCodeInterpreterToolResourceOptionsOutput;
  /** Overrides the vector store attached to this agent. There can be a maximum of 1 vector store attached to the agent. */
  fileSearch?: UpdateFileSearchToolResourceOptionsOutput;
  /** Overrides the resources to be used by the `azure_ai_search` tool consisting of index IDs and names. */
  azureAISearch?: AzureAISearchResourceOutput;
}

/** Request object to update `code_interpreted` tool resources. */
export interface UpdateCodeInterpreterToolResourceOptionsOutput {
  /** A list of file IDs to override the current list of the agent. */
  fileIds?: string[];
}

/** Request object to update `file_search` tool resources. */
export interface UpdateFileSearchToolResourceOptionsOutput {
  /** A list of vector store IDs to override the current list of the agent. */
  vectorStoreIds?: string[];
}

/** The response data for a requested list of items. */
export interface OpenAIPageableListOfThreadRunOutput {
  /** The object type, which is always list. */
  object: "list";
  /** The requested list of items. */
  data: Array<ThreadRunOutput>;
  /** The first ID represented in this list. */
  firstId: string;
  /** The last ID represented in this list. */
  lastId: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

/** Detailed information about a single step of an agent thread run. */
export interface RunStepOutput {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always 'thread.run.step'. */
  object: "thread.run.step";
  /**
   * The type of run step, which can be either message_creation or tool_calls.
   *
   * Possible values: "message_creation", "tool_calls"
   */
  type: RunStepTypeOutput;
  /** The ID of the agent associated with the run step. */
  assistantId: string;
  /** The ID of the thread that was run. */
  threadId: string;
  /** The ID of the run that this run step is a part of. */
  runId: string;
  /**
   * The status of this run step.
   *
   * Possible values: "in_progress", "cancelled", "failed", "completed", "expired"
   */
  status: RunStepStatusOutput;
  /** The details for this run step. */
  stepDetails: RunStepDetailsOutput;
  /** If applicable, information about the last error encountered by this run step. */
  lastError: RunStepErrorOutput | null;
  /** The Unix timestamp, in seconds, representing when this object was created. */
  createdAt: Date;
  /** The Unix timestamp, in seconds, representing when this item expired. */
  expiredAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this completed. */
  completedAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this was cancelled. */
  cancelledAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this failed. */
  failedAt: Date | null;
  /** Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`. */
  usage?: RunStepCompletionUsageOutput | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata: Record<string, string> | null;
}

/** An abstract representation of the details for a run step. */
export interface RunStepDetailsOutputParent {
  type: RunStepTypeOutput;
}

/** The detailed information associated with a message creation run step. */
export interface RunStepMessageCreationDetailsOutput extends RunStepDetailsOutputParent {
  /** The object type, which is always 'message_creation'. */
  type: "message_creation";
  /** Information about the message creation associated with this run step. */
  messageCreation: RunStepMessageCreationReferenceOutput;
}

/** The details of a message created as a part of a run step. */
export interface RunStepMessageCreationReferenceOutput {
  /** The ID of the message created by this run step. */
  messageId: string;
}

/** The detailed information associated with a run step calling tools. */
export interface RunStepToolCallDetailsOutput extends RunStepDetailsOutputParent {
  /** The object type, which is always 'tool_calls'. */
  type: "tool_calls";
  /** A list of tool call details for this run step. */
  toolCalls: Array<RunStepToolCallOutput>;
}

/** An abstract representation of a detailed tool call as recorded within a run step for an existing run. */
export interface RunStepToolCallOutputParent {
  /** The ID of the tool call. This ID must be referenced when you submit tool outputs. */
  id: string;
  type: string;
}

/**
 * A record of a call to a code interpreter tool, issued by the model in evaluation of a defined tool, that
 * represents inputs and outputs consumed and emitted by the code interpreter.
 */
export interface RunStepCodeInterpreterToolCallOutput extends RunStepToolCallOutputParent {
  /** The object type, which is always 'code_interpreter'. */
  type: "code_interpreter";
  /** The details of the tool call to the code interpreter tool. */
  codeInterpreter: RunStepCodeInterpreterToolCallDetailsOutput;
}

/** The detailed information about a code interpreter invocation by the model. */
export interface RunStepCodeInterpreterToolCallDetailsOutput {
  /** The input provided by the model to the code interpreter tool. */
  input: string;
  /** The outputs produced by the code interpreter tool back to the model in response to the tool call. */
  outputs: Array<RunStepCodeInterpreterToolCallOutputOutput>;
}

/** An abstract representation of an emitted output from a code interpreter tool. */
export interface RunStepCodeInterpreterToolCallOutputOutputParent {
  type: string;
}

/** A representation of a log output emitted by a code interpreter tool in response to a tool call by the model. */
export interface RunStepCodeInterpreterLogOutputOutput
  extends RunStepCodeInterpreterToolCallOutputOutputParent {
  /** The object type, which is always 'logs'. */
  type: "logs";
  /** The serialized log output emitted by the code interpreter. */
  logs: string;
}

/** A representation of an image output emitted by a code interpreter tool in response to a tool call by the model. */
export interface RunStepCodeInterpreterImageOutputOutput
  extends RunStepCodeInterpreterToolCallOutputOutputParent {
  /** The object type, which is always 'image'. */
  type: "image";
  /** Referential information for the image associated with this output. */
  image: RunStepCodeInterpreterImageReferenceOutput;
}

/** An image reference emitted by a code interpreter tool in response to a tool call by the model. */
export interface RunStepCodeInterpreterImageReferenceOutput {
  /** The ID of the file associated with this image. */
  fileId: string;
}

/**
 * A record of a call to a file search tool, issued by the model in evaluation of a defined tool, that represents
 * executed file search.
 */
export interface RunStepFileSearchToolCallOutput extends RunStepToolCallOutputParent {
  /** The object type, which is always 'file_search'. */
  type: "file_search";
  /** The ID of the tool call. This ID must be referenced when you submit tool outputs. */
  id: string;
  /** For now, this is always going to be an empty object. */
  fileSearch: RunStepFileSearchToolCallResultsOutput;
}

/** The results of the file search. */
export interface RunStepFileSearchToolCallResultsOutput {
  /** Ranking options for file search. */
  rankingOptions?: FileSearchRankingOptionsOutput;
  /** The array of a file search results */
  results: Array<RunStepFileSearchToolCallResultOutput>;
}

/**   File search tool call result. */
export interface RunStepFileSearchToolCallResultOutput {
  /** The ID of the file that result was found in. */
  fileId: string;
  /** The name of the file that result was found in. */
  fileName: string;
  /** The score of the result. All values must be a floating point number between 0 and 1. */
  score: number;
  /** The content of the result that was found. The content is only included if requested via the include query parameter. */
  content?: Array<FileSearchToolCallContentOutput>;
}

/** The file search result content object. */
export interface FileSearchToolCallContentOutput {
  /** The type of the content. */
  type: "text";
  /** The text content of the file. */
  text: string;
}

/**
 * A record of a call to a bing grounding tool, issued by the model in evaluation of a defined tool, that represents
 * executed search with bing grounding.
 */
export interface RunStepBingGroundingToolCallOutput extends RunStepToolCallOutputParent {
  /** The object type, which is always 'bing_grounding'. */
  type: "bing_grounding";
  /** Reserved for future use. */
  bingGrounding: Record<string, string>;
}

/**
 * A record of a call to an Azure AI Search tool, issued by the model in evaluation of a defined tool, that represents
 * executed Azure AI search.
 */
export interface RunStepAzureAISearchToolCallOutput extends RunStepToolCallOutputParent {
  /** The object type, which is always 'azure_ai_search'. */
  type: "azure_ai_search";
  /** Reserved for future use. */
  azureAISearch: Record<string, string>;
}

/**
 * A record of a call to a SharePoint tool, issued by the model in evaluation of a defined tool, that represents
 * executed SharePoint actions.
 */
export interface RunStepSharepointToolCallOutput extends RunStepToolCallOutputParent {
  /** The object type, which is always 'sharepoint_grounding'. */
  type: "sharepoint_grounding";
  /** Reserved for future use. */
  sharepointGrounding: Record<string, string>;
}

/**
 * A record of a call to a Microsoft Fabric tool, issued by the model in evaluation of a defined tool, that represents
 * executed Microsoft Fabric operations.
 */
export interface RunStepMicrosoftFabricToolCallOutput extends RunStepToolCallOutputParent {
  /** The object type, which is always 'fabric_dataagent'. */
  type: "fabric_dataagent";
  /** Reserved for future use. */
  fabricDataAgent: Record<string, string>;
}

/**
 * A record of a call to a function tool, issued by the model in evaluation of a defined tool, that represents the inputs
 * and output consumed and emitted by the specified function.
 */
export interface RunStepFunctionToolCallOutput extends RunStepToolCallOutputParent {
  /** The object type, which is always 'function'. */
  type: "function";
  /** The detailed information about the function called by the model. */
  function: RunStepFunctionToolCallDetailsOutput;
}

/** The detailed information about the function called by the model. */
export interface RunStepFunctionToolCallDetailsOutput {
  /** The name of the function. */
  name: string;
  /** The arguments that the model requires are provided to the named function. */
  arguments: string;
  /** The output of the function, only populated for function calls that have already have had their outputs submitted. */
  output: string | null;
}

/** The error information associated with a failed run step. */
export interface RunStepErrorOutput {
  /**
   * The error code for this error.
   *
   * Possible values: "server_error", "rate_limit_exceeded"
   */
  code: RunStepErrorCodeOutput;
  /** The human-readable text associated with this error. */
  message: string;
}

/** Usage statistics related to the run step. */
export interface RunStepCompletionUsageOutput {
  /** Number of completion tokens used over the course of the run step. */
  completionTokens: number;
  /** Number of prompt tokens used over the course of the run step. */
  promptTokens: number;
  /** Total number of tokens used (prompt + completion). */
  totalTokens: number;
}

/** The response data for a requested list of items. */
export interface OpenAIPageableListOfRunStepOutput {
  /** The object type, which is always list. */
  object: "list";
  /** The requested list of items. */
  data: Array<RunStepOutput>;
  /** The first ID represented in this list. */
  firstId: string;
  /** The last ID represented in this list. */
  lastId: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

/** The response data from a file list operation. */
export interface FileListResponseOutput {
  /** The object type, which is always 'list'. */
  object: "list";
  /** The files returned for the request. */
  data: Array<OpenAIFileOutput>;
}

/** Represents an agent that can call the model and use tools. */
export interface OpenAIFileOutput {
  /** The object type, which is always 'file'. */
  object: "file";
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The size of the file, in bytes. */
  bytes: number;
  /** The name of the file. */
  filename: string;
  /** The Unix timestamp, in seconds, representing when this object was created. */
  createdAt: Date;
  /**
   * The intended purpose of a file.
   *
   * Possible values: "fine-tune", "fine-tune-results", "assistants", "assistants_output", "batch", "batch_output", "vision"
   */
  purpose: FilePurposeOutput;
  /**
   * The state of the file. This field is available in Azure OpenAI only.
   *
   * Possible values: "uploaded", "pending", "running", "processed", "error", "deleting", "deleted"
   */
  status?: FileStateOutput;
  /** The error message with details in case processing of this file failed. This field is available in Azure OpenAI only. */
  statusDetails?: string;
}

/** A status response from a file deletion operation. */
export interface FileDeletionStatusOutput {
  /** The ID of the resource specified for deletion. */
  id: string;
  /** A value indicating whether deletion was successful. */
  deleted: boolean;
  /** The object type, which is always 'file'. */
  object: "file";
}

/** The response data for a requested list of items. */
export interface OpenAIPageableListOfVectorStoreOutput {
  /** The object type, which is always list. */
  object: "list";
  /** The requested list of items. */
  data: Array<VectorStoreOutput>;
  /** The first ID represented in this list. */
  firstId: string;
  /** The last ID represented in this list. */
  lastId: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

/** A vector store is a collection of processed files can be used by the `file_search` tool. */
export interface VectorStoreOutput {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always `vector_store` */
  object: "vector_store";
  /** The Unix timestamp (in seconds) for when the vector store was created. */
  createdAt: Date;
  /** The name of the vector store. */
  name: string;
  /** The total number of bytes used by the files in the vector store. */
  usageBytes: number;
  /** Files count grouped by status processed or being processed by this vector store. */
  fileCounts: VectorStoreFileCountOutput;
  /**
   * The status of the vector store, which can be either `expired`, `in_progress`, or `completed`. A status of `completed` indicates that the vector store is ready for use.
   *
   * Possible values: "expired", "in_progress", "completed"
   */
  status: VectorStoreStatusOutput;
  /** Details on when this vector store expires */
  expiresAfter?: VectorStoreExpirationPolicyOutput;
  /** The Unix timestamp (in seconds) for when the vector store will expire. */
  expiresAt?: Date | null;
  /** The Unix timestamp (in seconds) for when the vector store was last active. */
  lastActiveAt: Date | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata: Record<string, string> | null;
}

/** Counts of files processed or being processed by this vector store grouped by status. */
export interface VectorStoreFileCountOutput {
  /** The number of files that are currently being processed. */
  inProgress: number;
  /** The number of files that have been successfully processed. */
  completed: number;
  /** The number of files that have failed to process. */
  failed: number;
  /** The number of files that were cancelled. */
  cancelled: number;
  /** The total number of files. */
  total: number;
}

/** The expiration policy for a vector store. */
export interface VectorStoreExpirationPolicyOutput {
  /**
   * Anchor timestamp after which the expiration policy applies. Supported anchors: `last_active_at`.
   *
   * Possible values: "last_active_at"
   */
  anchor: VectorStoreExpirationPolicyAnchorOutput;
  /** The anchor timestamp after which the expiration policy applies. */
  days: number;
}

/** Options to configure a vector store static chunking strategy. */
export interface VectorStoreStaticChunkingStrategyOptionsOutput {
  /** The maximum number of tokens in each chunk. The default value is 800. The minimum value is 100 and the maximum value is 4096. */
  maxChunkSizeTokens: number;
  /**
   * The number of tokens that overlap between chunks. The default value is 400.
   * Note that the overlap must not exceed half of max_chunk_size_tokens.
   */
  chunkOverlapTokens: number;
}

/** Response object for deleting a vector store. */
export interface VectorStoreDeletionStatusOutput {
  /** The ID of the resource specified for deletion. */
  id: string;
  /** A value indicating whether deletion was successful. */
  deleted: boolean;
  /** The object type, which is always 'vector_store.deleted'. */
  object: "vector_store.deleted";
}

/** The response data for a requested list of items. */
export interface OpenAIPageableListOfVectorStoreFileOutput {
  /** The object type, which is always list. */
  object: "list";
  /** The requested list of items. */
  data: Array<VectorStoreFileOutput>;
  /** The first ID represented in this list. */
  firstId: string;
  /** The last ID represented in this list. */
  lastId: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

/** Description of a file attached to a vector store. */
export interface VectorStoreFileOutput {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always `vector_store.file`. */
  object: "vector_store.file";
  /**
   * The total vector store usage in bytes. Note that this may be different from the original file
   * size.
   */
  usageBytes: number;
  /** The Unix timestamp (in seconds) for when the vector store file was created. */
  createdAt: Date;
  /** The ID of the vector store that the file is attached to. */
  vectorStoreId: string;
  /**
   * The status of the vector store file, which can be either `in_progress`, `completed`, `cancelled`, or `failed`. The status `completed` indicates that the vector store file is ready for use.
   *
   * Possible values: "in_progress", "completed", "failed", "cancelled"
   */
  status: VectorStoreFileStatusOutput;
  /** The last error associated with this vector store file. Will be `null` if there are no errors. */
  lastError: VectorStoreFileErrorOutput | null;
  /** The strategy used to chunk the file. */
  chunkingStrategy: VectorStoreChunkingStrategyResponseOutput;
}

/** Details on the error that may have occurred while processing a file for this vector store */
export interface VectorStoreFileErrorOutput {
  /**
   * One of `server_error` or `rate_limit_exceeded`.
   *
   * Possible values: "server_error", "invalid_file", "unsupported_file"
   */
  code: VectorStoreFileErrorCodeOutput;
  /** A human-readable description of the error. */
  message: string;
}

/** An abstract representation of a vector store chunking strategy configuration. */
export interface VectorStoreChunkingStrategyResponseOutputParent {
  type: VectorStoreChunkingStrategyResponseTypeOutput;
}

/** This is returned when the chunking strategy is unknown. Typically, this is because the file was indexed before the chunking_strategy concept was introduced in the API. */
export interface VectorStoreAutoChunkingStrategyResponseOutput
  extends VectorStoreChunkingStrategyResponseOutputParent {
  /** The object type, which is always 'other'. */
  type: "other";
}

/** A statically configured chunking strategy. */
export interface VectorStoreStaticChunkingStrategyResponseOutput
  extends VectorStoreChunkingStrategyResponseOutputParent {
  /** The object type, which is always 'static'. */
  type: "static";
  /** The options for the static chunking strategy. */
  static: VectorStoreStaticChunkingStrategyOptionsOutput;
}

/** Response object for deleting a vector store file relationship. */
export interface VectorStoreFileDeletionStatusOutput {
  /** The ID of the resource specified for deletion. */
  id: string;
  /** A value indicating whether deletion was successful. */
  deleted: boolean;
  /** The object type, which is always 'vector_store.deleted'. */
  object: "vector_store.file.deleted";
}

/** A batch of files attached to a vector store. */
export interface VectorStoreFileBatchOutput {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always `vector_store.file_batch`. */
  object: "vector_store.files_batch";
  /** The Unix timestamp (in seconds) for when the vector store files batch was created. */
  createdAt: Date;
  /** The ID of the vector store that the file is attached to. */
  vectorStoreId: string;
  /**
   * The status of the vector store files batch, which can be either `in_progress`, `completed`, `cancelled` or `failed`.
   *
   * Possible values: "in_progress", "completed", "cancelled", "failed"
   */
  status: VectorStoreFileBatchStatusOutput;
  /** Files count grouped by status processed or being processed by this vector store. */
  fileCounts: VectorStoreFileCountOutput;
}

/** Response from the Workspace - Get operation */
export interface GetWorkspaceResponseOutput {
  /** A unique identifier for the resource */
  id: string;
  /** The name of the resource */
  name: string;
  /** The properties of the resource */
  properties: WorkspacePropertiesOutput;
}

/** workspace properties */
export interface WorkspacePropertiesOutput {
  /** Authentication type of the connection target */
  applicationInsights: string;
}

/** Response from the list operation */
export interface ListConnectionsResponseOutput {
  /** A list of connection list secrets */
  value: Array<GetConnectionResponseOutput>;
}

/** Response from the listSecrets operation */
export interface GetConnectionResponseOutput {
  /** A unique identifier for the connection */
  id: string;
  /** The name of the resource */
  name: string;
  /** The properties of the resource */
  properties: InternalConnectionPropertiesOutput;
}

/** Connection properties */
export interface InternalConnectionPropertiesOutputParent {
  /** Category of the connection */
  category: ConnectionTypeOutput;
  /** The connection URL to be used for this service */
  target: string;
  authType: AuthenticationTypeOutput;
}

/** Connection properties for connections with API key authentication */
export interface InternalConnectionPropertiesApiKeyAuthOutput
  extends InternalConnectionPropertiesOutputParent {
  /** Authentication type of the connection target */
  authType: "ApiKey";
  /** Credentials will only be present for authType=ApiKey */
  credentials: CredentialsApiKeyAuthOutput;
}

/** The credentials needed for API key authentication */
export interface CredentialsApiKeyAuthOutput {
  /** The API key */
  key: string;
}

/** Connection properties for connections with AAD authentication (aka `Entra ID passthrough`) */
export interface InternalConnectionPropertiesAADAuthOutput
  extends InternalConnectionPropertiesOutputParent {
  /** Authentication type of the connection target */
  authType: "AAD";
}

/** Connection properties for connections with SAS authentication */
export interface InternalConnectionPropertiesSASAuthOutput
  extends InternalConnectionPropertiesOutputParent {
  /** Authentication type of the connection target */
  authType: "SAS";
  /** Credentials will only be present for authType=ApiKey */
  credentials: CredentialsSASAuthOutput;
}

/** The credentials needed for Shared Access Signatures (SAS) authentication */
export interface CredentialsSASAuthOutput {
  /** The Shared Access Signatures (SAS) token */
  SAS: string;
}

/** Response from getting properties of the Application Insights resource */
export interface GetAppInsightsResponseOutput {
  /** A unique identifier for the resource */
  id: string;
  /** The name of the resource */
  name: string;
  /** The properties of the resource */
  properties: AppInsightsPropertiesOutput;
}

/** The properties of the Application Insights resource */
export interface AppInsightsPropertiesOutput {
  /** Authentication type of the connection target */
  ConnectionString: string;
}

/** Evaluation Definition */
export interface EvaluationOutput {
  /** Identifier of the evaluation. */
  readonly id: string;
  /** Data for evaluation. */
  data: InputDataOutput;
  /** Display Name for evaluation. It helps to find the evaluation easily in AI Foundry. It does not need to be unique. */
  displayName?: string;
  /** Description of the evaluation. It can be used to store additional information about the evaluation and is mutable. */
  description?: string;
  /** Metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemDataOutput;
  /** Status of the evaluation. It is set by service and is read-only. */
  readonly status?: string;
  /** Evaluation's tags. Unlike properties, tags are fully mutable. */
  tags?: Record<string, string>;
  /** Evaluation's properties. Unlike tags, properties are add-only. Once added, a property cannot be removed. */
  properties?: Record<string, string>;
  /** Evaluators to be used for the evaluation. */
  evaluators: Record<string, EvaluatorConfigurationOutput>;
}

/** Abstract data class for input data configuration. */
export interface InputDataOutputParent {
  type: string;
}

/** Data Source for Application Insights. */
export interface ApplicationInsightsConfigurationOutput extends InputDataOutputParent {
  readonly type: "app_insights";
  /** LogAnalytic Workspace resourceID associated with ApplicationInsights */
  resourceId: string;
  /** Query to fetch the data. */
  query: string;
  /** Service name. */
  serviceName: string;
  /** Connection String to connect to ApplicationInsights. */
  connectionString?: string;
}

/** Dataset as source for evaluation. */
export interface DatasetOutput extends InputDataOutputParent {
  readonly type: "dataset";
  /** Evaluation input data */
  id: string;
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemDataOutput {
  /** The timestamp the resource was created at. */
  readonly createdAt?: string;
  /** The identity that created the resource. */
  readonly createdBy?: string;
  /** The identity type that created the resource. */
  readonly createdByType?: string;
  /** The timestamp of resource last modification (UTC) */
  readonly lastModifiedAt?: string;
}

/** Evaluator Configuration */
export interface EvaluatorConfigurationOutput {
  /** Identifier of the evaluator. */
  id: string;
  /** Initialization parameters of the evaluator. */
  initParams?: Record<string, any>;
  /** Data parameters of the evaluator. */
  dataMapping?: Record<string, string>;
}

/** Paged collection of Evaluation items */
export interface PagedEvaluationOutput {
  /** The Evaluation items on this page */
  value: Array<EvaluationOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Evaluation Schedule Definition */
export interface EvaluationScheduleOutput {
  /** Name of the schedule, which also serves as the unique identifier for the evaluation */
  readonly name: string;
  /** Data for evaluation. */
  data: ApplicationInsightsConfigurationOutput;
  /** Description of the evaluation. It can be used to store additional information about the evaluation and is mutable. */
  description?: string;
  /** Metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemDataOutput;
  /** Provisioning State of the evaluation. It is set by service and is read-only. */
  readonly provisioningState?: string;
  /** Evaluation's tags. Unlike properties, tags are fully mutable. */
  tags?: Record<string, string>;
  /** Evaluation's properties. Unlike tags, properties are add-only. Once added, a property cannot be removed. */
  properties?: Record<string, string>;
  /** Enabled status of the evaluation. It is set by service and is read-only. */
  readonly isEnabled?: string;
  /** Evaluators to be used for the evaluation. */
  evaluators: Record<string, EvaluatorConfigurationOutput>;
  /** Trigger for the evaluation. */
  trigger: TriggerOutput;
}

/** Abstract data class for input data configuration. */
export interface TriggerOutputParent {
  type: string;
}

/** Recurrence Trigger Definition */
export interface RecurrenceTriggerOutput extends TriggerOutputParent {
  readonly type: "Recurrence";
  /**
   * The frequency to trigger schedule.
   *
   * Possible values: "Month", "Week", "Day", "Hour", "Minute"
   */
  frequency: FrequencyOutput;
  /** Specifies schedule interval in conjunction with frequency */
  interval: number;
  /** The recurrence schedule. */
  schedule?: RecurrenceScheduleOutput;
}

/** RecurrenceSchedule Definition */
export interface RecurrenceScheduleOutput {
  /** List of hours for the schedule. */
  hours: number[];
  /** List of minutes for the schedule. */
  minutes: number[];
  /** List of days for the schedule. */
  weekDays?: WeekDaysOutput[];
  /** List of month days for the schedule */
  monthDays?: number[];
}

/** Cron Trigger Definition */
export interface CronTriggerOutput extends TriggerOutputParent {
  readonly type: "Cron";
  /** Cron expression for the trigger. */
  expression: string;
}

/** Paged collection of EvaluationSchedule items */
export interface PagedEvaluationScheduleOutput {
  /** The EvaluationSchedule items on this page */
  value: Array<EvaluationScheduleOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** An abstract representation of an input tool definition that an agent can use. */
export type ToolDefinitionOutput =
  | ToolDefinitionOutputParent
  | CodeInterpreterToolDefinitionOutput
  | FileSearchToolDefinitionOutput
  | FunctionToolDefinitionOutput
  | BingGroundingToolDefinitionOutput
  | MicrosoftFabricToolDefinitionOutput
  | SharepointToolDefinitionOutput
  | AzureAISearchToolDefinitionOutput
  | OpenApiToolDefinitionOutput
  | BingCustomSearchToolDefinitionOutput
  | AzureFunctionToolDefinitionOutput;
/** authentication details for OpenApiFunctionDefinition */
export type OpenApiAuthDetailsOutput =
  | OpenApiAuthDetailsOutputParent
  | OpenApiAnonymousAuthDetailsOutput
  | OpenApiConnectionAuthDetailsOutput
  | OpenApiManagedAuthDetailsOutput;
/** An abstract representation of a single item of thread message content. */
export type MessageContentOutput =
  | MessageContentOutputParent
  | MessageTextContentOutput
  | MessageImageFileContentOutput;
/** An abstract representation of an annotation to text thread message content. */
export type MessageTextAnnotationOutput =
  | MessageTextAnnotationOutputParent
  | MessageTextFileCitationAnnotationOutput
  | MessageTextFilePathAnnotationOutput;
/** An abstract representation of a required action for an agent thread run to continue. */
export type RequiredActionOutput = RequiredActionOutputParent | SubmitToolOutputsActionOutput;
/** An abstract representation of a tool invocation needed by the model to continue a run. */
export type RequiredToolCallOutput = RequiredToolCallOutputParent | RequiredFunctionToolCallOutput;
/** An abstract representation of the details for a run step. */
export type RunStepDetailsOutput =
  | RunStepDetailsOutputParent
  | RunStepMessageCreationDetailsOutput
  | RunStepToolCallDetailsOutput;
/** An abstract representation of a detailed tool call as recorded within a run step for an existing run. */
export type RunStepToolCallOutput =
  | RunStepToolCallOutputParent
  | RunStepCodeInterpreterToolCallOutput
  | RunStepFileSearchToolCallOutput
  | RunStepBingGroundingToolCallOutput
  | RunStepAzureAISearchToolCallOutput
  | RunStepSharepointToolCallOutput
  | RunStepMicrosoftFabricToolCallOutput
  | RunStepFunctionToolCallOutput;
/** An abstract representation of an emitted output from a code interpreter tool. */
export type RunStepCodeInterpreterToolCallOutputOutput =
  | RunStepCodeInterpreterToolCallOutputOutputParent
  | RunStepCodeInterpreterLogOutputOutput
  | RunStepCodeInterpreterImageOutputOutput;
/** An abstract representation of a vector store chunking strategy configuration. */
export type VectorStoreChunkingStrategyResponseOutput =
  | VectorStoreChunkingStrategyResponseOutputParent
  | VectorStoreAutoChunkingStrategyResponseOutput
  | VectorStoreStaticChunkingStrategyResponseOutput;
/** Connection properties */
export type InternalConnectionPropertiesOutput =
  | InternalConnectionPropertiesOutputParent
  | InternalConnectionPropertiesApiKeyAuthOutput
  | InternalConnectionPropertiesAADAuthOutput
  | InternalConnectionPropertiesSASAuthOutput;
/** Abstract data class for input data configuration. */
export type InputDataOutput =
  | InputDataOutputParent
  | ApplicationInsightsConfigurationOutput
  | DatasetOutput;
/** Abstract data class for input data configuration. */
export type TriggerOutput = TriggerOutputParent | RecurrenceTriggerOutput | CronTriggerOutput;
/** Alias for OpenApiAuthTypeOutput */
export type OpenApiAuthTypeOutput = string;
/** Alias for VectorStoreDataSourceAssetTypeOutput */
export type VectorStoreDataSourceAssetTypeOutput = string;
/** Alias for AgentsApiResponseFormatModeOutput */
export type AgentsApiResponseFormatModeOutput = string;
/** Alias for ResponseFormatOutput */
export type ResponseFormatOutput = string;
/** Alias for AgentsApiResponseFormatOptionOutput */
export type AgentsApiResponseFormatOptionOutput =
  | string
  | AgentsApiResponseFormatModeOutput
  | AgentsApiResponseFormatOutput
  | ResponseFormatJsonSchemaTypeOutput;
/** Alias for MessageRoleOutput */
export type MessageRoleOutput = string;
/** Alias for MessageAttachmentToolDefinitionOutput */
export type MessageAttachmentToolDefinitionOutput =
  | CodeInterpreterToolDefinitionOutput
  | FileSearchToolDefinitionOutput;
/** Alias for MessageStatusOutput */
export type MessageStatusOutput = string;
/** Alias for MessageIncompleteDetailsReasonOutput */
export type MessageIncompleteDetailsReasonOutput = string;
/** Alias for TruncationStrategyOutput */
export type TruncationStrategyOutput = string;
/** Alias for AgentsApiToolChoiceOptionModeOutput */
export type AgentsApiToolChoiceOptionModeOutput = string;
/** Alias for AgentsNamedToolChoiceTypeOutput */
export type AgentsNamedToolChoiceTypeOutput = string;
/** Alias for AgentsApiToolChoiceOptionOutput */
export type AgentsApiToolChoiceOptionOutput =
  | string
  | AgentsApiToolChoiceOptionModeOutput
  | AgentsNamedToolChoiceOutput;
/** Alias for RunStatusOutput */
export type RunStatusOutput = string;
/** Alias for IncompleteDetailsReasonOutput */
export type IncompleteDetailsReasonOutput = string;
/** Alias for RunStepTypeOutput */
export type RunStepTypeOutput = string;
/** Alias for RunStepStatusOutput */
export type RunStepStatusOutput = string;
/** Alias for RunStepErrorCodeOutput */
export type RunStepErrorCodeOutput = string;
/** Alias for FilePurposeOutput */
export type FilePurposeOutput = string;
/** Alias for FileStateOutput */
export type FileStateOutput = string;
/** Alias for VectorStoreStatusOutput */
export type VectorStoreStatusOutput = string;
/** Alias for VectorStoreExpirationPolicyAnchorOutput */
export type VectorStoreExpirationPolicyAnchorOutput = string;
/** Alias for VectorStoreFileStatusOutput */
export type VectorStoreFileStatusOutput = string;
/** Alias for VectorStoreFileErrorCodeOutput */
export type VectorStoreFileErrorCodeOutput = string;
/** Alias for VectorStoreChunkingStrategyResponseTypeOutput */
export type VectorStoreChunkingStrategyResponseTypeOutput = string;
/** Alias for VectorStoreFileBatchStatusOutput */
export type VectorStoreFileBatchStatusOutput = string;
/** The Type (or category) of the connection */
export type ConnectionTypeOutput =
  | "AzureOpenAI"
  | "Serverless"
  | "AzureBlob"
  | "AIServices"
  | "CognitiveSearch";
/** Authentication type used by Azure AI service to connect to another service */
export type AuthenticationTypeOutput = "ApiKey" | "AAD" | "SAS";
/** Alias for FrequencyOutput */
export type FrequencyOutput = string;
/** Alias for WeekDaysOutput */
export type WeekDaysOutput = string;
