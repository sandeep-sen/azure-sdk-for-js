// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CommonClientOptions,
  FullOperationResponse,
  OperationOptions,
} from "@azure/core-client";
import type { RequestBodyType } from "@azure/core-rest-pipeline";
import { RestError } from "@azure/core-rest-pipeline";
import { GeneratedClient } from "./generated/generatedClient.js";
import type {
  WebPubSubGroup,
  GroupAddConnectionOptions,
  GroupRemoveConnectionOptions,
} from "./groupClient.js";
import { WebPubSubGroupImpl } from "./groupClient.js";
import type { AzureKeyCredential, TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import { webPubSubKeyCredentialPolicy } from "./webPubSubCredentialPolicy.js";
import { tracingClient } from "./tracing.js";
import { logger } from "./logger.js";
import { parseConnectionString } from "./parseConnectionString.js";
import jwt from "jsonwebtoken";
import { getPayloadForMessage } from "./utils.js";
import type {
  GeneratedClientOptionalParams,
  AddToGroupsRequest,
  RemoveFromGroupsRequest,
} from "./generated/index.js";
import { webPubSubReverseProxyPolicy } from "./reverseProxyPolicy.js";

/**
 * Options for closing a connection to a hub.
 */
export interface HubCloseConnectionOptions extends OperationOptions {
  /**
   * Reason the connection is being closed.
   */
  reason?: string;
}

/**
 * Options for closing all connections to a hub.
 */
export interface HubCloseAllConnectionsOptions extends OperationOptions {
  /**
   * Reason the connection is being closed.
   */
  reason?: string;
}

/**
 * Options for closing all of a user's connections to a hub.
 */
export interface HubCloseUserConnectionsOptions extends OperationOptions {
  /**
   * Reason the connection is being closed.
   */
  reason?: string;
}

/**
 * Options for sending messages to hubs.
 */
export interface HubSendToAllOptions extends OperationOptions {
  /**
   * Connection ids to exclude from receiving this message.
   */
  excludedConnections?: string[];
  /**
   * The filter syntax to filter out the connections to send the messages to following OData filter syntax.
   * Examples:
   *  * Exclude connections from `user1` and `user2`: `userId ne 'user1' and userId ne 'user2'`
   *  * Exclude connections in `group1`: `not('group1' in groups)`
   * Details about `filter` syntax please see [OData filter syntax for Azure Web PubSub](https://aka.ms/awps/filter-syntax).
   */
  filter?: string;
  /**
   * The time-to-live (TTL) value in seconds for messages sent to the service.
   * 0 is the default value, which means the message never expires.
   * 300 is the maximum value.
   * If this parameter is non-zero, messages that are not consumed by the client within the specified TTL will be dropped by the service.
   * This parameter can help when the client's bandwidth is limited.
   */
  messageTtlSeconds?: number;
}

/**
 * Options for sending text messages to hubs.
 */
export interface HubSendTextToAllOptions extends HubSendToAllOptions {
  /**
   * The content will be sent to the clients in plain text.
   */
  contentType: "text/plain";
}

/**
 * Types which can be serialized and sent as JSON.
 */
export type JSONTypes = string | number | boolean | object;

/**
 * Options for constructing a HubAdmin client.
 */
export interface WebPubSubServiceClientOptions extends CommonClientOptions {
  /**
   * Reverse proxy endpoint (for example, your Azure API management endpoint)
   */
  reverseProxyEndpoint?: string;
  /**
   * Options to configure the logging options.
   */
  loggingOptions?: WebPubSubServiceClientLogOptions;
}

/**
 * Options to configure the logging options.
 */
export declare interface WebPubSubServiceClientLogOptions {
  /**
   * Header names whose values will be logged when logging is enabled.
   * Defaults include a list of well-known safe headers. Any headers
   * specified in this field will be added to that list.  Any other values will
   * be written to logs as "REDACTED".
   */
  additionalAllowedHeaderNames?: string[];
  /**
   * Query string names whose values will be logged when logging is enabled. By default no
   * query string values are logged.
   */
  additionalAllowedQueryParameters?: string[];
}

/**
 * Options for checking if a connection exists.
 */
export interface HasConnectionOptions extends OperationOptions {}

/**
 * Options for checking if a group exists.
 */
export interface HubHasGroupOptions extends OperationOptions {}

/**
 * Options for checking if a user exists.
 */
export interface HubHasUserOptions extends OperationOptions {}

/**
 * Options for removing a user from all groups.
 */
export interface HubRemoveUserFromAllGroupsOptions extends HubCloseConnectionOptions {}

/**
 * Options for sending a message to a specific connection.
 */
export interface HubSendToConnectionOptions extends OperationOptions {
  /**
   * The time-to-live (TTL) value in seconds for messages sent to the service.
   * 0 is the default value, which means the message never expires.
   * 300 is the maximum value.
   * If this parameter is non-zero, messages that are not consumed by the client within the specified TTL will be dropped by the service.
   * This parameter can help when the client's bandwidth is limited.
   */
  messageTtlSeconds?: number;
}

/**
 * Options for sending a text message to a connection.
 */
export interface HubSendTextToConnectionOptions extends HubSendToConnectionOptions {
  contentType: "text/plain";
}

/**
 * Options for sending a message to a user.
 */
export interface HubSendToUserOptions extends OperationOptions {
  /**
   * The filter syntax to filter out the connections to send the messages to following OData filter syntax.
   * Examples:
   *  * Exclude connections in `group1`: `not('group1' in groups)`
   *  * Send to connections in `group1` or `group2`: `'group1' in groups or `group2` in groups`
   * Details about `filter` syntax please see [OData filter syntax for Azure Web PubSub](https://aka.ms/awps/filter-syntax).
   */
  filter?: string;
  /**
   * The time-to-live (TTL) value in seconds for messages sent to the service.
   * 0 is the default value, which means the message never expires.
   * 300 is the maximum value.
   * If this parameter is non-zero, messages that are not consumed by the client within the specified TTL will be dropped by the service.
   * This parameter can help when the client's bandwidth is limited.
   */
  messageTtlSeconds?: number;
}

/**
 * Options for sending a text message to a user.
 */
export interface HubSendTextToUserOptions extends HubSendToUserOptions {
  /**
   * The content will be sent to the clients in plain text.
   */
  contentType: "text/plain";
}

export type Permission = "joinLeaveGroup" | "sendToGroup";

/**
 * Options for grant permissions to a connection
 */
export interface HubGrantPermissionOptions extends OperationOptions {
  /**
   * The meaning of the target depends on the specific permission.
   * For joinLeaveGroup and sendToGroup, targetName is a required parameter standing for the group name.
   */
  targetName?: string;
}

/**
 * Options for revoke permissions from a connection
 */
export interface HubRevokePermissionOptions extends OperationOptions {
  /**
   * The meaning of the target depends on the specific permission.
   * For joinLeaveGroup and sendToGroup, targetName is a required parameter standing for the group name.
   */
  targetName?: string;
}

/**
 * Options for checking if a connection has the specified permission
 */
export interface HubHasPermissionOptions extends OperationOptions {
  /**
   * The meaning of the target depends on the specific permission.
   * For joinLeaveGroup and sendToGroup, targetName is a required parameter standing for the group name.
   */
  targetName?: string;
}

/**
 * The type of client endpoint that is being requested.
 */
export type WebPubSubClientProtocol = "default" | "mqtt" | "socketio";

/**
 * Options for generating a token to connect a client to the Azure Web Pubsub service.
 */
export interface GenerateClientTokenOptions extends OperationOptions {
  /**
   * The userId for the client.
   */
  userId?: string;

  /**
   * The roles that the connection with the generated token will have.
   * Roles give the client initial permissions to leave, join, or publish to groups when using PubSub subprotocol
   * * `webpubsub.joinLeaveGroup`: the client can join or leave any group
   * * `webpubsub.sendToGroup`: the client can send messages to any group
   * * `webpubsub.joinLeaveGroup.<group>`: the client can join or leave group `<group>`
   * * `webpubsub.sendToGroup.<group>`: the client can send messages to group `<group>`
   *
   * {@link https://azure.github.io/azure-webpubsub/references/pubsub-websocket-subprotocol#permissions}
   */
  roles?: string[];

  /**
   * Minutes until the token expires.
   */
  expirationTimeInMinutes?: number;

  /**
   * The groups to join when the client connects
   */
  groups?: string[];

  /**
   * The protocol type of the client
   * * `default`: Default WebPubSub Client. Example Client Connection URL: _wss://exampleHost.com/client/hubs/exampleHub_
   * * `mqtt`: MQTT Client. Example Client Connection URL:  _wss://exampleHost.com/client/mqtt/hubs/exampleHub_
   */
  clientProtocol?: WebPubSubClientProtocol;
}

/**
 * A response containing the client token.
 */
export interface ClientTokenResponse {
  /**
   * The client token.
   */
  token: string;
  /**
   * The URL client connects to
   */
  baseUrl: string;
  /**
   * The URL client connects to with access_token query string
   */
  url: string;
}

/**
 * Client for connecting to a Web PubSub hub
 */
export class WebPubSubServiceClient {
  private readonly client: GeneratedClient;
  private credential!: AzureKeyCredential | TokenCredential;
  private readonly clientOptions?: WebPubSubServiceClientOptions;

  /**
   * The name of the hub this client is connected to
   */
  public readonly hubName: string;
  /**
   * The Web PubSub API version being used by this client
   */
  public readonly apiVersion: string = "2024-12-01";

  /**
   * The Web PubSub endpoint this client is connected to
   */
  public endpoint!: string;

  /**
   * Creates an instance of a WebPubSubServiceClient for sending messages and managing groups, connections, and users.
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleCreateClient_ConnectionString
   * import { WebPubSubServiceClient } from "@azure/web-pubsub";
   *
   * const serviceClient = new WebPubSubServiceClient("<ConnectionString>", "<hubName>");
   * ```
   *
   * @param connectionString - The connection string
   * @param hubName - The name of the hub to connect to. If omitted, '_default' is used.
   * @param options - Options to configure the http pipeline
   */
  constructor(connectionString: string, hubName: string, options?: WebPubSubServiceClientOptions);

  /**
   * Creates an instance of a WebPubSubServiceClient for sending messages and managing groups, connections, and users.
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleCreateClient_KeyCredential
   * import { AzureKeyCredential, WebPubSubServiceClient } from "@azure/web-pubsub";
   *
   * const key = new AzureKeyCredential("<Key>");
   * const serviceClient = new WebPubSubServiceClient("<Endpoint>", key, "<hubName>");
   * ```
   *
   * @param endpoint - The endpoint to connect to
   * @param credential - An AzureKeyCredential holding your service key
   * @param hubName - The name of the hub to connect to.
   * @param options - Options to configure the http pipeline
   */
  constructor(
    endpoint: string,
    credential: AzureKeyCredential | TokenCredential,
    hubName: string,
    options?: WebPubSubServiceClientOptions,
  );
  constructor(
    endpointOrConnectionString: string,
    credsOrHubName?: AzureKeyCredential | TokenCredential | string,
    hubNameOrOpts?: string | WebPubSubServiceClientOptions,
    opts?: WebPubSubServiceClientOptions,
  ) {
    // unpack constructor arguments
    if (typeof credsOrHubName === "object") {
      this.endpoint = endpointOrConnectionString;
      this.hubName = hubNameOrOpts as string;
      this.clientOptions = opts;
      this.credential = credsOrHubName;
    } else {
      const parsedCs = parseConnectionString(endpointOrConnectionString);
      this.endpoint = parsedCs.endpoint;
      this.credential = parsedCs.credential;
      this.hubName = credsOrHubName as string;
      this.clientOptions = hubNameOrOpts as WebPubSubServiceClientOptions;
    }

    const internalPipelineOptions: GeneratedClientOptionalParams = {
      ...this.clientOptions,
      ...{
        apiVersion: this.apiVersion,
        loggingOptions: {
          additionalAllowedHeaderNames:
            this.clientOptions?.loggingOptions?.additionalAllowedHeaderNames,
          additionalAllowedQueryParameters:
            this.clientOptions?.loggingOptions?.additionalAllowedQueryParameters,
          logger: logger.info,
        },
      },
      ...(isTokenCredential(this.credential)
        ? {
            credential: this.credential,
            credentialScopes: ["https://webpubsub.azure.com/.default"],
          }
        : {}),
    };

    this.client = new GeneratedClient(this.endpoint, internalPipelineOptions);

    if (!isTokenCredential(this.credential)) {
      this.client.pipeline.addPolicy(webPubSubKeyCredentialPolicy(this.credential));
    }

    if (this.clientOptions?.reverseProxyEndpoint) {
      this.client.pipeline.addPolicy(
        webPubSubReverseProxyPolicy(this.clientOptions?.reverseProxyEndpoint),
      );
    }
  }

  /**
   * Get a client for a group
   * @param groupName - The name of the group to connect to.
   */
  public group(groupName: string): WebPubSubGroup {
    return new WebPubSubGroupImpl(this.client, this.hubName, groupName);
  }

  /**
   * Broadcast a text message to all connections on this hub.
   *
   * @param message - The text message to send
   * @param options - Additional options
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  public async sendToAll(message: string, options: HubSendTextToAllOptions): Promise<void>;
  /**
   * Broadcast a JSON message to all connections on this hub.
   *
   * @param message - The JSON message to send
   * @param options - Additional options
   */
  public async sendToAll(message: JSONTypes, options?: HubSendToAllOptions): Promise<void>;
  /**
   * Broadcast a binary message to all connections on this hub.
   *
   * @param message - The message to send
   * @param options - Additional options
   */
  public async sendToAll(message: RequestBodyType, options?: HubSendToAllOptions): Promise<void>;

  public async sendToAll(
    message: RequestBodyType | JSONTypes,
    options: HubSendToAllOptions | HubSendTextToAllOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan("WebPubSubServiceClient.sendToAll", options, (updatedOptions) => {
      const { contentType, payload } = getPayloadForMessage(message, updatedOptions);
      return this.client.webPubSub.sendToAll(
        this.hubName,
        contentType,
        payload as any,
        updatedOptions,
      );
    });
  }

  /**
   * Send a text message to a specific user
   *
   * @param username - User name to send to
   * @param message - The text message to send
   * @param options - Additional options
   */
  public async sendToUser(
    username: string,
    message: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: HubSendTextToUserOptions,
  ): Promise<void>;

  /**
   * Send a JSON message to a specific user
   *
   * @param username - User name to send to
   * @param message - The josn message to send
   * @param options - Additional options
   */
  public async sendToUser(
    username: string,
    message: JSONTypes,
    options?: HubSendToUserOptions,
  ): Promise<void>;

  /**
   * Send a binary message to a specific user
   *
   * @param username - The user name to send to
   * @param message - The binary message to send
   * @param options - Additional options
   */
  public async sendToUser(
    username: string,
    message: RequestBodyType,
    options?: HubSendToUserOptions | HubSendTextToUserOptions,
  ): Promise<void>;
  public async sendToUser(
    username: string,
    message: RequestBodyType | JSONTypes,
    options: HubSendToUserOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "WebPubSubServiceClient.sendToUser",
      options,
      (updatedOptions) => {
        const { contentType, payload } = getPayloadForMessage(message, updatedOptions);
        return this.client.webPubSub.sendToUser(
          this.hubName,
          username,
          contentType,
          payload as any,
          updatedOptions,
        );
      },
    );
  }

  /**
   * Send a text message to a specific connection
   *
   * @param connectionId - Connection id to send to
   * @param message - The text message
   * @param options - Additional options
   */
  public async sendToConnection(
    connectionId: string,
    message: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: HubSendTextToConnectionOptions,
  ): Promise<void>;

  /**
   * Send a binary message to a specific connection
   *
   * @param connectionId - Connection id to send to
   * @param message - The JSON message
   * @param options - Additional options
   */
  public async sendToConnection(
    connectionId: string,
    message: JSONTypes,
    options?: HubSendToConnectionOptions,
  ): Promise<void>;

  /**
   * Send a binary message to a specific connection
   *
   * @param connectionId - Connection id to send to
   * @param message - The binary message
   * @param options - Additional options
   */
  public async sendToConnection(
    connectionId: string,
    message: RequestBodyType,
    options?: HubSendToConnectionOptions | HubSendTextToConnectionOptions,
  ): Promise<void>;
  public async sendToConnection(
    connectionId: string,
    message: RequestBodyType | JSONTypes,
    options: HubSendToConnectionOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "WebPubSubServiceClient.sendToConnection",
      options,
      (updatedOptions) => {
        const { contentType, payload } = getPayloadForMessage(message, updatedOptions);

        return this.client.webPubSub.sendToConnection(
          this.hubName,
          connectionId,
          contentType,
          payload as any,
          updatedOptions,
        );
      },
    );
  }

  /**
   * Check if a specific connection is connected to this hub
   *
   * @param connectionId - Connection id to check
   * @param options - Additional options
   */
  public async connectionExists(
    connectionId: string,
    options: HasConnectionOptions = {},
  ): Promise<boolean> {
    let response: FullOperationResponse | undefined;
    function onResponse(rawResponse: FullOperationResponse, flatResponse: unknown): void {
      response = rawResponse;
      if (options.onResponse) {
        options.onResponse(rawResponse, flatResponse);
      }
    }

    return tracingClient.withSpan(
      "WebPubSubServiceClient.connectionExists",
      options,
      async (updatedOptions) => {
        await this.client.webPubSub.connectionExists(this.hubName, connectionId, {
          ...updatedOptions,
          onResponse,
        });

        if (response!.status === 200) {
          return true;
        } else if (response!.status === 404) {
          return false;
        } else {
          // this is sad - wish this was handled by autorest.
          throw new RestError(response!.bodyAsText!, {
            statusCode: response?.status,
            request: response?.request,
            response: response,
          });
        }
      },
    );
  }

  /**
   * Close a specific connection to this hub
   *
   * @param connectionId - Connection id to close
   * @param options - Additional options
   */
  public async closeConnection(
    connectionId: string,
    options: HubCloseConnectionOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "WebPubSubServiceClient.closeConnection",
      options,
      (updatedOptions) => {
        return this.client.webPubSub.closeConnection(this.hubName, connectionId, updatedOptions);
      },
    );
  }

  /**
   * Close all connections to this hub
   *
   * @param options - Additional options
   */
  public async closeAllConnections(options: HubCloseAllConnectionsOptions = {}): Promise<void> {
    return tracingClient.withSpan(
      "WebPubSubServiceClient.closeAllConnections",
      options,
      (updatedOptions) => {
        return this.client.webPubSub.closeAllConnections(this.hubName, updatedOptions);
      },
    );
  }

  /**
   * Close all connections with the given user id
   *
   * @param user - User id to close
   * @param options - Additional options
   */
  public async closeUserConnections(
    userId: string,
    options: HubCloseUserConnectionsOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "WebPubSubServiceClient.closeUserConnections",
      options,
      (updatedOptions) => {
        return this.client.webPubSub.closeUserConnections(this.hubName, userId, updatedOptions);
      },
    );
  }

  /**
   * Remove a specific user from all groups they are joined to
   * @param userId - The user id to remove from all groups
   * @param options - Additional options
   */
  public async removeUserFromAllGroups(
    userId: string,
    options: HubCloseConnectionOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "WebPubSubServiceClient.removeUserFromAllGroups",
      options,
      (updatedOptions) => {
        return this.client.webPubSub.removeUserFromAllGroups(this.hubName, userId, updatedOptions);
      },
    );
  }

  /**
   * Remove a specific connection from all groups they are joined to
   * @param connectionId - The connection id to remove from all groups
   * @param options - Additional options
   */
  public async removeConnectionFromAllGroups(
    connectionId: string,
    options: HubCloseConnectionOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "WebPubSubServiceClient.removeConnectionFromAllGroups",
      options,
      (updatedOptions) => {
        return this.client.webPubSub.removeConnectionFromAllGroups(
          this.hubName,
          connectionId,
          updatedOptions,
        );
      },
    );
  }

  /**
   * Add filtered connections to multiple groups
   * @param groups - A list of groups which target connections will be added into
   * @param filter - An OData filter which target connections satisfy
   * @param options - Additional options
   */
  public async addConnectionsToGroups(
    groups: string[],
    filter: string,
    options: GroupAddConnectionOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "WebPubSubServiceClient.addConnectionsToGroups",
      options,
      (updatedOptions) => {
        return this.client.webPubSub.addConnectionsToGroups(
          this.hubName,
          {
            groups: groups,
            filter: filter,
          } as AddToGroupsRequest,
          updatedOptions,
        );
      },
    );
  }

  /**
   * Remove filtered connections from multiple groups
   * @param groups - A list of groups which target connections will be removed from
   * @param filter - An OData filter which target connections satisfy
   * @param options - Additional options
   */
  public async removeConnectionsFromGroups(
    groups: string[],
    filter: string,
    options: GroupRemoveConnectionOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "WebPubSubServiceClient.removeConnectionsFromGroups",
      options,
      (updatedOptions) => {
        return this.client.webPubSub.removeConnectionsFromGroups(
          this.hubName,
          {
            groups: groups,
            filter: filter,
          } as RemoveFromGroupsRequest,
          updatedOptions,
        );
      },
    );
  }

  /**
   * Check if a particular group exists (i.e. has active connections).
   *
   * @param groupName - The group name to check for
   * @param options - Additional options
   */
  public async groupExists(groupName: string, options: HubHasGroupOptions = {}): Promise<boolean> {
    let response: FullOperationResponse | undefined;
    function onResponse(rawResponse: FullOperationResponse, flatResponse: unknown): void {
      response = rawResponse;
      if (options.onResponse) {
        options.onResponse(rawResponse, flatResponse);
      }
    }

    return tracingClient.withSpan(
      "WebPubSubServiceClient.groupExists",
      options,
      async (updatedOptions) => {
        await this.client.webPubSub.groupExists(this.hubName, groupName, {
          ...updatedOptions,
          onResponse,
        });

        if (response!.status === 200) {
          return true;
        } else if (response!.status === 404) {
          return false;
        } else {
          throw new RestError(response!.bodyAsText!, {
            statusCode: response?.status,
            request: response?.request,
            response: response,
          });
        }
      },
    );
  }

  /**
   * Check if a particular user is connected to this hub.
   *
   * @param username - The user name to check for
   * @param options - Additional options
   */
  public async userExists(username: string, options: HubHasUserOptions = {}): Promise<boolean> {
    let response: FullOperationResponse | undefined;
    function onResponse(rawResponse: FullOperationResponse, flatResponse: unknown): void {
      response = rawResponse;
      if (options.onResponse) {
        options.onResponse(rawResponse, flatResponse);
      }
    }

    return tracingClient.withSpan(
      "WebPubSubServiceClient.userExists",
      options,
      async (updatedOptions) => {
        await this.client.webPubSub.userExists(this.hubName, username, {
          ...updatedOptions,
          onResponse,
        });

        if (response!.status === 200) {
          return true;
        } else if (response!.status === 404) {
          return false;
        } else {
          // this is sad - wish this was handled by autorest.
          throw new RestError(response!.bodyAsText!, {
            statusCode: response?.status,
            request: response?.request,
            response: response,
          });
        }
      },
    );
  }

  /**
   * Grant permissions to a connection
   *
   * @param connectionId - The connection id to grant permissions to
   * @param Permission - The permission to grant
   * @param options - Additional options
   */
  public async grantPermission(
    connectionId: string,
    permission: Permission,
    options: HubGrantPermissionOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "WebPubSubServiceClient.grantPermission",
      options,
      (updatedOptions) => {
        return this.client.webPubSub.grantPermission(
          this.hubName,
          permission,
          connectionId,
          updatedOptions,
        );
      },
    );
  }

  /**
   * Revoke permissions from a connection
   *
   * @param connectionId - The connection id to revoke permissions from
   * @param Permission - The permission to revoke
   * @param options - Additional options
   */
  public async revokePermission(
    connectionId: string,
    permission: Permission,
    options: HubRevokePermissionOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "WebPubSubServiceClient.revokePermission",
      options,
      (updatedOptions) => {
        return this.client.webPubSub.revokePermission(
          this.hubName,
          permission,
          connectionId,
          updatedOptions,
        );
      },
    );
  }

  /**
   * Check if the connection has the specified permission
   *
   * @param connectionId - The connection id to check permission
   * @param Permission - The permission to check
   * @param options - Additional options
   */
  public async hasPermission(
    connectionId: string,
    permission: Permission,
    options: HubHasPermissionOptions = {},
  ): Promise<boolean> {
    let response: FullOperationResponse | undefined;
    function onResponse(rawResponse: FullOperationResponse, flatResponse: unknown): void {
      response = rawResponse;
      if (options.onResponse) {
        options.onResponse(rawResponse, flatResponse);
      }
    }

    return tracingClient.withSpan(
      "WebPubSubServiceClient.hasPermission",
      options,
      async (updatedOptions) => {
        await this.client.webPubSub.checkPermission(this.hubName, permission, connectionId, {
          ...updatedOptions,
          onResponse,
        });

        if (response!.status === 200) {
          return true;
        } else if (response!.status === 404) {
          return false;
        } else {
          // this is sad - wish this was handled by autorest.
          throw new RestError(response!.bodyAsText!, {
            statusCode: response?.status,
            request: response?.request,
            response: response,
          });
        }
      },
    );
  }

  /**
   * Generate a token for a client to connect to the Azure Web PubSub service.
   *
   * @param options - Additional options
   */
  public async getClientAccessToken(
    options: GenerateClientTokenOptions = {},
  ): Promise<ClientTokenResponse> {
    return tracingClient.withSpan(
      "WebPubSubServiceClient.getClientAccessToken",
      options,
      async (updatedOptions) => {
        const endpoint = this.endpoint.endsWith("/") ? this.endpoint : this.endpoint + "/";
        const clientEndpoint = endpoint.replace(/(http)(s?:\/\/)/gi, "ws$2");
        const clientProtocol = updatedOptions.clientProtocol;
        let clientPath = `client/hubs/${this.hubName}`;
        switch (clientProtocol) {
          case "mqtt":
            clientPath = `clients/mqtt/hubs/${this.hubName}`;
            break;
          case "socketio":
            clientPath = `clients/socketio/hubs/${this.hubName}`;
        }
        const baseUrl = clientEndpoint + clientPath;

        let token: string;
        if (isTokenCredential(this.credential)) {
          const response = await this.client.webPubSub.generateClientToken(this.hubName, {
            ...updatedOptions,
            clientType: clientProtocol,
          });
          token = response.token!;
        } else {
          const key = this.credential.key;
          const audience = endpoint + clientPath;
          const payload = {
            role: updatedOptions?.roles,
            "webpubsub.group": updatedOptions?.groups,
          };
          const signOptions: jwt.SignOptions = {
            audience: audience,
            expiresIn:
              updatedOptions?.expirationTimeInMinutes === undefined
                ? "1h"
                : `${updatedOptions.expirationTimeInMinutes}m`,
            algorithm: "HS256",
          };
          if (updatedOptions?.userId) {
            signOptions.subject = updatedOptions?.userId;
          }
          token = jwt.sign(payload, key, signOptions);
        }

        return {
          token,
          baseUrl,
          url: `${baseUrl}?access_token=${token}`,
        };
      },
    );
  }
}
