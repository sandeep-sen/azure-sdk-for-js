/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { KqlScriptResource, KqlScriptsGetAllOptionalParams } from "../models/index.js";

/** Interface representing a KqlScripts. */
export interface KqlScripts {
  /**
   * Get all KQL scripts
   * @param options - The options parameters.
   */
  listAll(options?: KqlScriptsGetAllOptionalParams): PagedAsyncIterableIterator<KqlScriptResource>;
}
