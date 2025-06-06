/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  DiagnosticContract,
  DiagnosticListByServiceOptionalParams,
  DiagnosticGetEntityTagOptionalParams,
  DiagnosticGetEntityTagResponse,
  DiagnosticGetOptionalParams,
  DiagnosticGetResponse,
  DiagnosticCreateOrUpdateOptionalParams,
  DiagnosticCreateOrUpdateResponse,
  DiagnosticUpdateOptionalParams,
  DiagnosticUpdateResponse,
  DiagnosticDeleteOptionalParams,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Diagnostic. */
export interface Diagnostic {
  /**
   * Lists all diagnostics of the API Management service instance.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param options The options parameters.
   */
  listByService(
    resourceGroupName: string,
    serviceName: string,
    options?: DiagnosticListByServiceOptionalParams,
  ): PagedAsyncIterableIterator<DiagnosticContract>;
  /**
   * Gets the entity state (Etag) version of the Diagnostic specified by its identifier.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param diagnosticId Diagnostic identifier. Must be unique in the current API Management service
   *                     instance.
   * @param options The options parameters.
   */
  getEntityTag(
    resourceGroupName: string,
    serviceName: string,
    diagnosticId: string,
    options?: DiagnosticGetEntityTagOptionalParams,
  ): Promise<DiagnosticGetEntityTagResponse>;
  /**
   * Gets the details of the Diagnostic specified by its identifier.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param diagnosticId Diagnostic identifier. Must be unique in the current API Management service
   *                     instance.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serviceName: string,
    diagnosticId: string,
    options?: DiagnosticGetOptionalParams,
  ): Promise<DiagnosticGetResponse>;
  /**
   * Creates a new Diagnostic or updates an existing one.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param diagnosticId Diagnostic identifier. Must be unique in the current API Management service
   *                     instance.
   * @param parameters Create parameters.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    serviceName: string,
    diagnosticId: string,
    parameters: DiagnosticContract,
    options?: DiagnosticCreateOrUpdateOptionalParams,
  ): Promise<DiagnosticCreateOrUpdateResponse>;
  /**
   * Updates the details of the Diagnostic specified by its identifier.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param diagnosticId Diagnostic identifier. Must be unique in the current API Management service
   *                     instance.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   *                response of the GET request or it should be * for unconditional update.
   * @param parameters Diagnostic Update parameters.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    serviceName: string,
    diagnosticId: string,
    ifMatch: string,
    parameters: DiagnosticContract,
    options?: DiagnosticUpdateOptionalParams,
  ): Promise<DiagnosticUpdateResponse>;
  /**
   * Deletes the specified Diagnostic.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param diagnosticId Diagnostic identifier. Must be unique in the current API Management service
   *                     instance.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   *                response of the GET request or it should be * for unconditional update.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    serviceName: string,
    diagnosticId: string,
    ifMatch: string,
    options?: DiagnosticDeleteOptionalParams,
  ): Promise<void>;
}
