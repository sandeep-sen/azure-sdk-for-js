/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { PrivateEndpointConnections } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { KeyVaultManagementClient } from "../keyVaultManagementClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  PrivateEndpointConnection,
  PrivateEndpointConnectionsListByResourceNextOptionalParams,
  PrivateEndpointConnectionsListByResourceOptionalParams,
  PrivateEndpointConnectionsListByResourceResponse,
  PrivateEndpointConnectionsGetOptionalParams,
  PrivateEndpointConnectionsGetResponse,
  PrivateEndpointConnectionsPutOptionalParams,
  PrivateEndpointConnectionsPutResponse,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsDeleteResponse,
  PrivateEndpointConnectionsListByResourceNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing PrivateEndpointConnections operations. */
export class PrivateEndpointConnectionsImpl
  implements PrivateEndpointConnections
{
  private readonly client: KeyVaultManagementClient;

  /**
   * Initialize a new instance of the class PrivateEndpointConnections class.
   * @param client Reference to the service client
   */
  constructor(client: KeyVaultManagementClient) {
    this.client = client;
  }

  /**
   * The List operation gets information about the private endpoint connections associated with the
   * vault.
   * @param resourceGroupName Name of the resource group that contains the key vault.
   * @param vaultName The name of the key vault.
   * @param options The options parameters.
   */
  public listByResource(
    resourceGroupName: string,
    vaultName: string,
    options?: PrivateEndpointConnectionsListByResourceOptionalParams,
  ): PagedAsyncIterableIterator<PrivateEndpointConnection> {
    const iter = this.listByResourcePagingAll(
      resourceGroupName,
      vaultName,
      options,
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listByResourcePagingPage(
          resourceGroupName,
          vaultName,
          options,
          settings,
        );
      },
    };
  }

  private async *listByResourcePagingPage(
    resourceGroupName: string,
    vaultName: string,
    options?: PrivateEndpointConnectionsListByResourceOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<PrivateEndpointConnection[]> {
    let result: PrivateEndpointConnectionsListByResourceResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByResource(
        resourceGroupName,
        vaultName,
        options,
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByResourceNext(
        resourceGroupName,
        vaultName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByResourcePagingAll(
    resourceGroupName: string,
    vaultName: string,
    options?: PrivateEndpointConnectionsListByResourceOptionalParams,
  ): AsyncIterableIterator<PrivateEndpointConnection> {
    for await (const page of this.listByResourcePagingPage(
      resourceGroupName,
      vaultName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Gets the specified private endpoint connection associated with the key vault.
   * @param resourceGroupName Name of the resource group that contains the key vault.
   * @param vaultName The name of the key vault.
   * @param privateEndpointConnectionName Name of the private endpoint connection associated with the key
   *                                      vault.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    vaultName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ): Promise<PrivateEndpointConnectionsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, vaultName, privateEndpointConnectionName, options },
      getOperationSpec,
    );
  }

  /**
   * Updates the specified private endpoint connection associated with the key vault.
   * @param resourceGroupName Name of the resource group that contains the key vault.
   * @param vaultName The name of the key vault.
   * @param privateEndpointConnectionName Name of the private endpoint connection associated with the key
   *                                      vault.
   * @param properties The intended state of private endpoint connection.
   * @param options The options parameters.
   */
  put(
    resourceGroupName: string,
    vaultName: string,
    privateEndpointConnectionName: string,
    properties: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsPutOptionalParams,
  ): Promise<PrivateEndpointConnectionsPutResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        vaultName,
        privateEndpointConnectionName,
        properties,
        options,
      },
      putOperationSpec,
    );
  }

  /**
   * Deletes the specified private endpoint connection associated with the key vault.
   * @param resourceGroupName Name of the resource group that contains the key vault.
   * @param vaultName The name of the key vault.
   * @param privateEndpointConnectionName Name of the private endpoint connection associated with the key
   *                                      vault.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    vaultName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<PrivateEndpointConnectionsDeleteResponse>,
      PrivateEndpointConnectionsDeleteResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<PrivateEndpointConnectionsDeleteResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: {
        resourceGroupName,
        vaultName,
        privateEndpointConnectionName,
        options,
      },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<
      PrivateEndpointConnectionsDeleteResponse,
      OperationState<PrivateEndpointConnectionsDeleteResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Deletes the specified private endpoint connection associated with the key vault.
   * @param resourceGroupName Name of the resource group that contains the key vault.
   * @param vaultName The name of the key vault.
   * @param privateEndpointConnectionName Name of the private endpoint connection associated with the key
   *                                      vault.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    vaultName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ): Promise<PrivateEndpointConnectionsDeleteResponse> {
    const poller = await this.beginDelete(
      resourceGroupName,
      vaultName,
      privateEndpointConnectionName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * The List operation gets information about the private endpoint connections associated with the
   * vault.
   * @param resourceGroupName Name of the resource group that contains the key vault.
   * @param vaultName The name of the key vault.
   * @param options The options parameters.
   */
  private _listByResource(
    resourceGroupName: string,
    vaultName: string,
    options?: PrivateEndpointConnectionsListByResourceOptionalParams,
  ): Promise<PrivateEndpointConnectionsListByResourceResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, vaultName, options },
      listByResourceOperationSpec,
    );
  }

  /**
   * ListByResourceNext
   * @param resourceGroupName Name of the resource group that contains the key vault.
   * @param vaultName The name of the key vault.
   * @param nextLink The nextLink from the previous successful call to the ListByResource method.
   * @param options The options parameters.
   */
  private _listByResourceNext(
    resourceGroupName: string,
    vaultName: string,
    nextLink: string,
    options?: PrivateEndpointConnectionsListByResourceNextOptionalParams,
  ): Promise<PrivateEndpointConnectionsListByResourceNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, vaultName, nextLink, options },
      listByResourceNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/vaults/{vaultName}/privateEndpointConnections/{privateEndpointConnectionName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateEndpointConnection,
    },
    204: {},
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.vaultName,
    Parameters.privateEndpointConnectionName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const putOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/vaults/{vaultName}/privateEndpointConnections/{privateEndpointConnectionName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateEndpointConnection,
      headersMapper: Mappers.PrivateEndpointConnectionsPutHeaders,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  requestBody: Parameters.properties,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.vaultName,
    Parameters.privateEndpointConnectionName,
  ],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/vaults/{vaultName}/privateEndpointConnections/{privateEndpointConnectionName}",
  httpMethod: "DELETE",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateEndpointConnection,
    },
    201: {
      bodyMapper: Mappers.PrivateEndpointConnection,
    },
    202: {
      bodyMapper: Mappers.PrivateEndpointConnection,
    },
    204: {
      bodyMapper: Mappers.PrivateEndpointConnection,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.vaultName,
    Parameters.privateEndpointConnectionName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByResourceOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/vaults/{vaultName}/privateEndpointConnections",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateEndpointConnectionListResult,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.vaultName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByResourceNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateEndpointConnectionListResult,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.vaultName,
    Parameters.nextLink,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
