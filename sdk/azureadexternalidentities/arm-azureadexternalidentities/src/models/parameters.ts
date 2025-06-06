/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  OperationParameter,
  OperationURLParameter,
  OperationQueryParameter
} from "@azure/core-client";
import {
  CheckNameAvailabilityRequestBody as CheckNameAvailabilityRequestBodyMapper,
  CreateTenantRequestBody as CreateTenantRequestBodyMapper,
  B2CTenantUpdateRequest as B2CTenantUpdateRequestMapper,
  GuestUsagesResource as GuestUsagesResourceMapper,
  GuestUsagesResourcePatch as GuestUsagesResourcePatchMapper
} from "../models/mappers.js";

export const contentType: OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String"
    }
  }
};

export const checkNameAvailabilityRequestBody: OperationParameter = {
  parameterPath: ["options", "checkNameAvailabilityRequestBody"],
  mapper: CheckNameAvailabilityRequestBodyMapper
};

export const accept: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String"
    }
  }
};

export const $host: OperationURLParameter = {
  parameterPath: "$host",
  mapper: {
    serializedName: "$host",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const subscriptionId: OperationURLParameter = {
  parameterPath: "subscriptionId",
  mapper: {
    serializedName: "subscriptionId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const apiVersion: OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "2021-04-01",
    isConstant: true,
    serializedName: "api-version",
    type: {
      name: "String"
    }
  }
};

export const resourceGroupName: OperationURLParameter = {
  parameterPath: "resourceGroupName",
  mapper: {
    serializedName: "resourceGroupName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const resourceName: OperationURLParameter = {
  parameterPath: "resourceName",
  mapper: {
    serializedName: "resourceName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const createTenantRequestBody: OperationParameter = {
  parameterPath: ["options", "createTenantRequestBody"],
  mapper: CreateTenantRequestBodyMapper
};

export const updateTenantRequestBody: OperationParameter = {
  parameterPath: ["options", "updateTenantRequestBody"],
  mapper: B2CTenantUpdateRequestMapper
};

export const resource: OperationParameter = {
  parameterPath: ["options", "resource"],
  mapper: GuestUsagesResourceMapper
};

export const resourcePatch: OperationParameter = {
  parameterPath: ["options", "resourcePatch"],
  mapper: GuestUsagesResourcePatchMapper
};
