/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  IdpsQueryObject,
  FirewallPolicyIdpsSignaturesListOptionalParams,
  FirewallPolicyIdpsSignaturesListResponse,
} from "../models/index.js";

/** Interface representing a FirewallPolicyIdpsSignatures. */
export interface FirewallPolicyIdpsSignatures {
  /**
   * Retrieves the current status of IDPS signatures for the relevant policy. Maximal amount of returned
   * signatures is 1000.
   * @param resourceGroupName The name of the resource group.
   * @param firewallPolicyName The name of the Firewall Policy.
   * @param parameters Will describe the query to run against the IDPS signatures DB
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    firewallPolicyName: string,
    parameters: IdpsQueryObject,
    options?: FirewallPolicyIdpsSignaturesListOptionalParams,
  ): Promise<FirewallPolicyIdpsSignaturesListResponse>;
}
