// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi, afterEach } from "vitest";
import { getCachedDefaultHttpsClient } from "../../src/client/clientHelpers.js";
import { getClient } from "../../src/client/getClient.js";
import type {
  HttpClient,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "../../src/interfaces.js";
import { createEmptyPipeline, type PipelinePolicy } from "../../src/pipeline.js";
import { createHttpHeaders } from "../../src/httpHeaders.js";
import { isNodeLike } from "../../src/util/checkEnvironment.js";

describe("getClient", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("#apiVersionPolicy", () => {
    it("should add apiVersion to requests if apiVersion is absent", async () => {
      const defaultHttpClient = getCachedDefaultHttpsClient();
      vi.spyOn(defaultHttpClient, "sendRequest").mockImplementation(async (req) => {
        return { headers: createHttpHeaders(), status: 200, request: req } as PipelineResponse;
      });

      const apiVersion = "2021-11-18";
      const client = getClient("https://example.org", { apiVersion });
      const validationPolicy: PipelinePolicy = {
        name: "validationPolicy",
        sendRequest: (req, next) => {
          assert.include(req.url, `api-version=${apiVersion}`);
          return next(req);
        },
      };

      client.pipeline.addPolicy(validationPolicy, { afterPhase: "Serialize" });
      await client.pathUnchecked("/foo").get();
    });

    it("should use operation-level apiVersion even if we config the client one", async () => {
      const defaultHttpClient = getCachedDefaultHttpsClient();
      vi.spyOn(defaultHttpClient, "sendRequest").mockImplementation(async (req) => {
        return { headers: createHttpHeaders(), status: 200, request: req } as PipelineResponse;
      });

      const clientApiVersion = "2021-11-18",
        operationApiVersion = "2022-01-01";
      const client = getClient("https://example.org", { apiVersion: clientApiVersion });
      const validationPolicy: PipelinePolicy = {
        name: "validationPolicy",
        sendRequest: (req, next) => {
          assert.include(req.url, `api-version=${operationApiVersion}`);
          assert.notInclude(req.url, `api-version=${clientApiVersion}`);
          return next(req);
        },
      };

      client.pipeline.addPolicy(validationPolicy, { afterPhase: "Serialize" });

      // Define the apiVersion at operation-level
      await client.pathUnchecked("/foo").get({
        queryParameters: {
          "api-version": operationApiVersion,
        },
      });
    });

    it("should use apiVersion in url directly even if we config the client one", async () => {
      const defaultHttpClient = getCachedDefaultHttpsClient();
      vi.spyOn(defaultHttpClient, "sendRequest").mockImplementation(async (req) => {
        return { headers: createHttpHeaders(), status: 200, request: req } as PipelineResponse;
      });

      const clientApiVersion = "2021-11-18",
        operationApiVersion = "2022-01-01";
      const client = getClient("https://example.org", { apiVersion: clientApiVersion });
      const validationPolicy: PipelinePolicy = {
        name: "validationPolicy",
        sendRequest: (req, next) => {
          assert.include(req.url, `api-version=${operationApiVersion}`);
          assert.notInclude(req.url, `api-version=${clientApiVersion}`);
          return next(req);
        },
      };

      client.pipeline.addPolicy(validationPolicy, { afterPhase: "Serialize" });

      // Define the apiVersion in url
      await client.pathUnchecked(`/foo?api-version=${operationApiVersion}`).get();
    });

    it("should not encode url when skip query parameter encoding and api version parameter exists", async () => {
      const defaultHttpClient = getCachedDefaultHttpsClient();
      vi.spyOn(defaultHttpClient, "sendRequest").mockImplementation(async (req) => {
        return {
          headers: createHttpHeaders(),
          status: 200,
          request: req,
        } as PipelineResponse;
      });

      const apiVersion = "2021-11-18";
      const client = getClient("https://example.org", { apiVersion });
      const validationPolicy: PipelinePolicy = {
        name: "validationPolicy",
        sendRequest: (req, next) => {
          assert.include(req.url, `colors=blue,red,green&api-version=${apiVersion}`);
          return next(req);
        },
      };

      client.pipeline.addPolicy(validationPolicy, { afterPhase: "Serialize" });
      await client.pathUnchecked("/foo").get({
        queryParameters: {
          colors: ["blue", "red", "green"],
        },
        skipUrlEncoding: true,
      });
    });

    it("should encode url when not skip query parameter encoding and api version parameter exists", async () => {
      const defaultHttpClient = getCachedDefaultHttpsClient();
      vi.spyOn(defaultHttpClient, "sendRequest").mockImplementation(async (req) => {
        return {
          headers: createHttpHeaders(),
          status: 200,
          request: req,
        } as PipelineResponse;
      });

      const apiVersion = "2021-11-18";
      const client = getClient("https://example.org", { apiVersion });
      const validationPolicy: PipelinePolicy = {
        name: "validationPolicy",
        sendRequest: (req, next) => {
          assert.include(req.url, `colors=blue,red,green&api-version=${apiVersion}`);
          return next(req);
        },
      };

      client.pipeline.addPolicy(validationPolicy, { afterPhase: "Serialize" });
      await client.pathUnchecked("/foo").get({
        queryParameters: {
          colors: ["blue", "red", "green"],
        },
      });
    });
  });

  it("should append api version correctly", async () => {
    const defaultHttpClient = getCachedDefaultHttpsClient();
    vi.spyOn(defaultHttpClient, "sendRequest").mockImplementation(async (req) => {
      return {
        headers: createHttpHeaders(),
        status: 200,
        request: req,
      } as PipelineResponse;
    });

    const apiVersion = "2021-11-18";
    const client = getClient("https://example.org", { apiVersion });
    const validationPolicy: PipelinePolicy = {
      name: "validationPolicy",
      sendRequest: (req, next) => {
        assert.equal(req.url, `https://example.org/foo?api-version=${apiVersion}`);
        return next(req);
      },
    };

    client.pipeline.addPolicy(validationPolicy, { afterPhase: "Serialize" });
    await client.pathUnchecked("/foo").get();
  });

  it("should insert policies in the correct pipeline position", async function () {
    const sendRequest = (request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> =>
      next(request);
    const retryPolicy: PipelinePolicy = {
      name: "retry",
      sendRequest,
    };
    const policy1: PipelinePolicy = {
      name: "policy1",
      sendRequest,
    };
    const policy2: PipelinePolicy = {
      name: "policy2",
      sendRequest,
    };

    const client = getClient("https://example.org?api-version=1233321", {
      additionalPolicies: [
        { policy: policy1, position: "perRetry" },
        { policy: policy2, position: "perCall" },
      ],
    });
    client.pipeline.addPolicy(retryPolicy, { phase: "Retry" });
    assert(client);
    const policies = client.pipeline.getOrderedPolicies();
    assert.isTrue(policies.indexOf(policy2) < policies.indexOf(retryPolicy));
    assert.isTrue(policies.indexOf(retryPolicy) < policies.indexOf(policy1));
  });

  it("should use the client setting for `allowInsecureConnection` when the request setting is undefined", async () => {
    const fakeHttpClient: HttpClient = {
      sendRequest: async (request) => {
        assert.isTrue(request.allowInsecureConnection);
        return { headers: createHttpHeaders(), status: 200, request };
      },
    };

    const client = getClient("https://example.org", {
      allowInsecureConnection: true,
      httpClient: fakeHttpClient,
    });

    await client.pathUnchecked("/foo").get({
      allowInsecureConnection: undefined,
    });
  });

  it("should not use the client setting for `allowInsecureConnection` when the request setting is false", async () => {
    const fakeHttpClient: HttpClient = {
      sendRequest: async (request) => {
        assert.isFalse(request.allowInsecureConnection);
        return { headers: createHttpHeaders(), status: 200, request };
      },
    };

    const client = getClient("https://example.org", {
      allowInsecureConnection: true,
      httpClient: fakeHttpClient,
    });

    await client.pathUnchecked("/foo").get({
      allowInsecureConnection: false,
    });
  });

  it("stream methods should call onResponse", async () => {
    let called = false;
    const fakeHttpClient: HttpClient = {
      sendRequest: async (request) => {
        return { headers: createHttpHeaders(), status: 200, request };
      },
    };

    const client = getClient("https://example.org", {
      httpClient: fakeHttpClient,
    });
    const res = client.pathUnchecked("/foo").get({
      onResponse: () => {
        called = true;
      },
    });

    if (isNodeLike) {
      await res.asNodeStream();
    } else {
      await res.asBrowserStream();
    }
    assert.isTrue(called);
  });

  it("should support query parameter with explode set to true", async () => {
    const defaultHttpClient = getCachedDefaultHttpsClient();
    vi.spyOn(defaultHttpClient, "sendRequest").mockImplementation(async (req) => {
      return {
        headers: createHttpHeaders(),
        status: 200,
        request: req,
      } as PipelineResponse;
    });

    const client = getClient("https://example.org");
    const validationPolicy: PipelinePolicy = {
      name: "validationPolicy",
      sendRequest: (req, next) => {
        assert.include(req.url, `colors=blue&colors=red&colors=green`);
        return next(req);
      },
    };

    client.pipeline.addPolicy(validationPolicy, { afterPhase: "Serialize" });
    await client.pathUnchecked("/foo").get({
      queryParameters: {
        colors: {
          value: ["blue", "red", "green"],
          explode: true,
        },
      },
    });
  });

  it("should support path parameter with allowReserved set to true", async () => {
    const defaultHttpClient = getCachedDefaultHttpsClient();
    vi.spyOn(defaultHttpClient, "sendRequest").mockImplementation(async (req) => {
      return {
        headers: createHttpHeaders(),
        status: 200,
        request: req,
      } as PipelineResponse;
    });

    const client = getClient("https://example.org");
    const validationPolicy: PipelinePolicy = {
      name: "validationPolicy",
      sendRequest: (req, next) => {
        assert.equal(req.url, `https://example.org/test/test!@#$%^/blah`);
        return next(req);
      },
    };

    client.pipeline.addPolicy(validationPolicy, { afterPhase: "Serialize" });
    await client
      .pathUnchecked("/{foo}/blah", { value: "test/test!@#$%^", allowReserved: true })
      .get();
  });

  it("setting pipeline property should override the default pipeline", async () => {
    const pipeline = createEmptyPipeline();
    const client = getClient("https://example.org", { pipeline });
    assert.equal(client.pipeline, pipeline);
    assert.isEmpty(client.pipeline.getOrderedPolicies());
  });
});
