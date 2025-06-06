---
page_type: sample
languages:
  - typescript
products:
  - entra
  - entra-id
urlFragment: identity-typescript
---

# Azure Identity client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Identity in some common scenarios.

| **File Name**                                                                                             | **Description**                                                                                                     |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [azureDeveloperCliCredential.ts][azuredeveloperclicredential]                                             | Authenticates using Azure Developer CLI Credential                                                                  |
| [azurePipelinesCredential/azurePipelinesCredential.ts][azurepipelinescredential_azurepipelinescredential] | Authenticates using AzurePipelinesCredential                                                                        |
| [clientSecretCredential.ts][clientsecretcredential]                                                       | Authenticates with an app registration’s client ID and secret.                                                      |
| [defaultAzureCredential.ts][defaultazurecredential]                                                       | Tries several authentication methods using a single credential, which is the simplest way to use `@azure/identity`. |
| [environmentCredential.ts][environmentcredential]                                                         | Authenticates as an app registration automatically using environment variables.                                     |
| [interactiveBrowserCredential.ts][interactivebrowsercredential]                                           | Authenticates using Interactive Browser Credential                                                                  |
| [tokenProvider.ts][tokenprovider]                                                                         | demonstrates how to get a bearer token.                                                                             |
| [workloadIdentityCredential.ts][workloadidentitycredential]                                               | Authenticates using Workload Identity Credential                                                                    |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Register an app with the Microsoft identity platform][createinstance_registeranappwiththemicrosoftidentityplatform]
- [Set and retrieve a secret from Azure Key Vault][createinstance_setandretrieveasecretfromazurekeyvault]

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/azureDeveloperCliCredential.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env AZURE_TENANT_ID="<azure tenant id>" node dist/azureDeveloperCliCredential.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[azuredeveloperclicredential]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/v4/typescript/src/azureDeveloperCliCredential.ts
[azurepipelinescredential_azurepipelinescredential]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/v4/typescript/src/azurePipelinesCredential/azurePipelinesCredential.ts
[clientsecretcredential]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/v4/typescript/src/clientSecretCredential.ts
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/v4/typescript/src/defaultAzureCredential.ts
[environmentcredential]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/v4/typescript/src/environmentCredential.ts
[interactivebrowsercredential]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/v4/typescript/src/interactiveBrowserCredential.ts
[tokenprovider]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/v4/typescript/src/tokenProvider.ts
[workloadidentitycredential]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/v4/typescript/src/workloadIdentityCredential.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/identity
[freesub]: https://azure.microsoft.com/free/
[createinstance_registeranappwiththemicrosoftidentityplatform]: https://learn.microsoft.com/entra/identity-platform/quickstart-register-app
[createinstance_setandretrieveasecretfromazurekeyvault]: https://learn.microsoft.com/azure/key-vault/secrets/quick-create-portal
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
