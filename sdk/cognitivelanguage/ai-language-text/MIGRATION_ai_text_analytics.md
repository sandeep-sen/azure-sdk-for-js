<!-- dev-tool snippets ignore -->

# Migrating to `@azure/ai-language-text`

**Note ⚠️**: `@azure/ai-language-text` is currently a beta package. Certain aspects of the package's API surface and implementation may change during the course of its development, and this document is a work-in-progress and may change to reflect updates to the package. We value your feedback, and it is especially useful during the beta development cycle. Please [create an issue](https://github.com/Azure/azure-sdk-for-js/issues/new/choose) to suggest any improvements or report any problems with this guide or with the package itself.

`@azure/ai-language-text` introduces the Azure Text Analysis client library that provides features of the Azure Cognitive Language Service API (version "2022-04-01-preview" and newer) and it is different from `@azure/ai-text-analytics` as follows:

- `@azure/ai-text-analytics` _only_ supports Text Analytics service API version 3.0 and 3.1, and will not support the new Azure Cognitive Language Service.
- `@azure/ai-language-text` supports Azure Cognitive Language Service API version "2022-04-01-preview", and future releases will support newer service API versions as well.

This document provides instructions for updating your application code to use `@azure/ai-language-text`. In this document, the examples provided use TypeScript to provide type information, but all runtime behavior changes naturally apply to plain JavaScript as well.

## Partial Migration (Side-by-Side)

To avoid migrating an application all at once, `@azure/ai-language-text` may be installed alongside `@azure/ai-text-analytics` and the two packages may be used side-by-side, and an application may be migrated partially or over time:

```javascript
import { TextAnalyticsClient } from "@azure/ai-text-analytics";
import { TextAnalysisClient } from "@azure/ai-language-text";
```

## Understanding Types

The types in `@azure/ai-language-text` are different from the ones in `@azure/ai-text-analytics` as described in this section.

### Terminology

Some terminology has changed to reflect the enhanced capabilities of the newest Azure Cognitive Language Service APIs. For starters, the service changed its name from Azure Text Analytics to Azure Cognitive Language Service and added advanced capabilities for answering questions and analyzing conversations. However, `@azure/ai-language-text` will only support the text analysis capabilities that are provided by the Azure Cognitive Language Service. As a result, we've made the following broad changes to the terminology used throughout the client:

- Operations are now referred to as actions in all contexts and not only when batching them.
- The actions are renamed from verb phrases to nouns, and rather than calling the corresponding individual method, a single action can be performed by passing its name as a string literal to the one method that is capable of performing single actions. For example, in `@azure/ai-text-analytics`, an entity recognition action is performed when calling the `recognizeEntities` method. In `@azure/ai-language-text`, this call is done by passing the `"EntityRecognition"` literal to the method that performs single actions.
- The plural word "Actions" has been replaced with the word "Batch" to indicate a batch of actions.

### Comparing Types

The following table explores several type names from `@azure/ai-text-analytics` and shows their nearest `@azure/ai-language-text` equivalent. The names differences illustrate several of the above-mentioned changes in terminology. The breaking changes between each of the pairs of types are also listed. This table provides an overview, and more detail and code samples are provided in the following sections.

<!-- prettier-ignore -->
| Old Type Name | Nearest New Type | Symbol Type | Change description |
| ------------------------- | ------------------------- | ----------- | ----------------------------- |
| `TextAnalyticsClient` | `TextAnalysisClient` | Class | This class replaces the former and has no methods in common with it. See the section on `TextAnalysisClient` below. |
| `AnalysisPollOperationState`, `AnalyzeActionsOperationState` | `AnalyzeBatchOperationState` | Interface | This interface replaces both of the former ones |
| `OperationMetadata` and `AnalyzeActionsOperationMetadata` | `AnalyzeBatchOperationMetadata` | Interface | This interface replaces both of the former ones but still uses the same field names. However, all fields specific to the analyze batch operation are now read-only |
| `AnalyzeActionsPollerLike` | `AnalyzeBatchPoller` | Interface | This interface replaces the former one. See the entries for `AnalyzeBatchOperationState` and `PagedAnalyzeBatchResult` for more details |
| `AnalyzeActionsResult` | `AnalyzeBatchResult` | Interface | The old one contained a field for each kind of action and those fields contained arrays of results. On the other hand, the new interface is a union of a set of interfaces where each one represents the result of a particular action with `kind` as a  common field to act as a discriminator between different results |
| `AnalyzeHealthcareEntitiesErrorResult` | `HealthcareErrorResult` | Interface |  |
| `AnalyzeHealthcareEntitiesResult` | `HealthcareResult` | Interface |  |
| `AnalyzeHealthcareEntitiesSuccessResult` | `HealthcareSuccessResult` | Interface |  |
| `AnalyzeSentimentAction` and `AnalyzeSentimentOptions` | `SentimentAnalysisAction` | Interface |  |
| `AnalyzeSentimentErrorResult` | `SentimentAnalysisErrorResult` | Interface |  |
| `AnalyzeSentimentActionErrorResult`, `ExtractKeyPhrasesActionErrorResult`, `ExtractSummaryActionErrorResult`, `MultiCategoryClassifyActionErrorResult`, `RecognizeCategorizedEntitiesActionErrorResult`, `RecognizeLinkedEntitiesActionErrorResult`, `RecognizePiiEntitiesActionErrorResult`, `RecongizeCustomEntitiesActionErrorResult`, and `SingleCategoryClassifyActionErrorResult` | `BatchActionErrorResult` | Interface | The old types were structurally similar and the new type replaces them all |
| `AnalyzeSentimentActionResult` | `SentimentAnalysisBatchResult` | Interface | The new interface is part of the union of `AnalyzeBatchResult` |
| `AnalyzeSentimentActionSuccessResult`, `ExtractKeyPhrasesActionSuccessResult`, `ExtractSummaryActionSuccessResult`, `MultiCategoryClassifyActionSuccessResult`, `RecognizeCategorizedEntitiesActionSuccessResult`, `RecognizeLinkedEntitiesActionSuccessResult`, `RecognizePiiEntitiesActionSuccessResult`, `RecongizeCustomEntitiesActionSuccessResult`, and `SingleCategoryClassifyActionSuccessResult` | `BatchActionSuccessResult` | Interface | The old types were structurally similar and the new type replaces them all. Furthermore, the `results` field is now read-only |
| `AnalyzeSentimentResult` | `SentimentAnalysisResult` | Interface |  |
| `AnalyzeSentimentResultArray`, `DetectLanguageResultArray`, `ExtractKeyPhrasesResultArray`, `ExtractSummaryResultArray`, `RecognizeCategorizedEntitiesResultArray`, `RecognizeLinkedEntitiesResultArray`, and `RecognizePiiEntitiesResultArray` | `SentimentAnalysisResult[]`, `LanguageDetectionResult[]`, `KeyPhraseExtractionResult[]`, `ExtractiveSummarizationResult[]`, `EntityRecognitionResult[]`, `EntityLinkingResult[]`, and `PiiEntityRecognitionResult[]` | Interface | The old types used to have `statistics` and `modelVersion` fields attached but the type has been deleted in the new client |
| `SingleCategoryClassifyResultArray`, `MultiCategoryClassifyResultArray`, and `RecognizeCustomEntitiesResultArray` | `CustomSingleLabelClassificationResult`, `CustomMultiLabelClassificationResult[]`, and `CustomEntityRecognitionResult[]` | The old types used to have `statistics`, `projectName`, and `deploymentName` fields attached but the type has been deleted in the new client |
| `AnalyzeSentimentSuccessResult` | `SentimentAnalysisSuccessResult` | Interface | All fields are now marked as read-only |
| `BeginAnalyzeActionsOptions` | `BeginAnalyzeBatchOptions` | Interface | `resumeFrom` has been deleted in the new interface |
| `CustomTextAnalyticsAction` | `ActionCustom` | Interface | `disableServiceLogs` has been added in the new interface and `actionName` has been moved to `AnalyzeBatchActionCommon` |
| `DetectLanguageErrorResult` | `LanguageDetectionErrorResult` | Interface | |
| `DetectLanguageInput` | `LanguageDetectionInput` | Interface | |
| `DetectLanguageOptions` | `LanguageDetectionAction` | Interface | |
| `DetectLanguageResult` | `LanguageDetectionResult` | Interface | |
| `DetectLanguageSuccessResult` | `LanguageDetectionSuccessResult` | Interface | |
| `EntityAssertion` | `LanguageDetectionSuccessResult` | Interface | |
| `ExtractKeyPhrasesAction` and `ExtractKeyPhrasesOptions` | `KeyPhraseExtractionAction` | Interface | |
| `ExtractKeyPhrasesActionResult` | `KeyPhraseExtractionBatchResult` | Interface | |
| `ExtractKeyPhrasesErrorResult` | `KeyPhraseExtractionErrorResult` | Interface | |
| `ExtractKeyPhrasesResult` | `KeyPhraseExtractionResult` | Interface | |
| `ExtractKeyPhrasesSuccessResult` | `KeyPhraseExtractionSuccessResult` | Interface | `keyPhrases` is now read-only |
| `ExtractSummaryAction` | `ExtractiveSummarizationAction` | Interface | |
| `ExtractSummaryActionResult` | `ExtractiveSummarizationBatchResult` | Interface | |
| `ExtractSummaryResult` | `SummarizationExtractionResult` | Interface | |
| `ExtractSummarySuccessResult` | `SummarizationExtractionSuccessResult` | Interface | `sentences` is now read-only |
| `HealthcareEntityRelation` | `HealthcareEntityRelation` | Interface | all fields are now read-only |
| `HealthcareEntityRelationRole` | `HealthcareEntityRelationRole` | Interface | all fields are now read-only |
| `KnownSummarySentencesOrderBy` | `ExtractiveSummarizationOrderingCriteria` | Interface | |
| `MultiCategoryClassifyAction` | `CustomMultiLabelClassificationAction` | Interface | |
| `MultiCategoryClassifyActionResult` | `CustomMultiLabelClassificationBatchResult` | Interface | |
| `MultiCategoryClassifyErrorResult` | `CustomMultiLabelClassificationErrorResult` | Interface | |
| `MultiCategoryClassifyResult` | `CustomMultiLabelClassificationResult` | Interface | |
| `MultiCategoryClassifySuccessResult` | `CustomMultiLabelClassificationSuccessResult` | Interface | `classifications` is now read-only |
| `Opinion` | `Opinion` | Interface | all fields are now read-only |
| `PagedAnalyzeActionsResult` | `PagedAnalyzeBatchResult` | Interface | all fields are now read-only |
| `PagedAsyncIterableAnalyzeActionsResult` | `PagedAsyncIterableIterator<AnalyzeBatchResult>` | Interface | The type of a page of results is now an array of `AnalyzeBatchResult` |
| `PiiEntity` | `Entity` | Interface | |
| `RecognizeCategorizedEntitiesAction` and `RecognizeCategorizedEntitiesOptions` | `EntityRecognitionAction` | Interface | |
| `RecognizeCategorizedEntitiesActionResult` | `EntityRecognitionBatchResult` | Interface | |
| `RecognizeCategorizedEntitiesErrorResult` | `EntityRecognitionErrorResult` | Interface | |
| `RecognizeCategorizedEntitiesResult` | `EntityRecognitionResult` | Interface | |
| `RecognizeCategorizedEntitiesSuccessResult` | `EntityRecognitionSuccessResult` | Interface | `entities` is now read-only |
| `RecognizeCustomEntitiesAction` | `CustomEntityRecognitionAction` | Interface | |
| `RecognizeCustomEntitiesActionResult` | `CustomEntityRecognitionBatchResult` | Interface | |
| `RecognizeCustomEntitiesErrorResult` | `CustomEntityRecognitionErrorResult` | Interface | |
| `RecognizeCustomEntitiesResult` | `CustomEntityRecognitionResult` | Interface | |
| `RecognizeCustomEntitiesSuccessResult` | `CustomEntityRecognitionSuccessResult` | Interface | `entities` is now read-only |
| `RecognizeLinkedEntitiesAction` and `RecognizeLinkedEntitiesOptions` | `EntityLinkingAction` | Interface | |
| `RecognizeLinkedEntitiesActionResult` | `EntityLinkingBatchResult` | Interface | |
| `RecognizeLinkedEntitiesErrorResult` | `EntityLinkingErrorResult` | Interface | |
| `RecognizeLinkedEntitiesResult` | `EntityLinkingResult` | Interface | |
| `RecognizeLinkedEntitiesSuccessResult` | `EntityLinkingSuccessResult` | Interface | |
| `RecognizePiiEntitiesAction` and `RecognizePiiEntitiesOptions` | `PiiEntityRecognitionAction` | Interface | |
| `RecognizePiiEntitiesActionResult` | `PiiEntityRecognitionBatchResult` | Interface | |
| `RecognizePiiEntitiesErrorResult` | `PiiEntityRecognitionErrorResult` | Interface | |
| `RecognizePiiEntitiesResult` | `PiiEntityRecognitionResult` | Interface | |
| `RecognizePiiEntitiesSuccessResult` | `PiiEntityRecognitionSuccessResult` | Interface | `redactedText` is now read-only |
| `SentenceSentiment` | `SentenceSentiment` | Interface | all fields are now read-only |
| `SingleCategoryClassifyAction` | `CustomSingleLabelClassificationAction` | Interface | |
| `SingleCategoryClassifyActionResult` | `CustomSingleLabelClassificationBatchResult` | Interface | |
| `SingleCategoryClassifyActionSuccessResult` | `CustomSingleLabelClassificationSuccessResult` | Interface | `classification` has been renamed to `classifications` and is now an array |
| `StringIndexType` | `StringIndexType` | Type Alias | It was a union and has been updated to be a string |
| `TargetConfidenceScoreLabel` | `TargetConfidenceScores` | Type Alias | |
| `TargetSentiment` | `TargetSentiment` | Interface | All fields are now read-only |
| `TextAnalyticsAction` | `ActionPrebuilt & AnalyzeBatchActionCommon` | Interface | |
| `TextAnalyticsActionErrorResult` | `BatchActionErrorResult` | Interface | |
| `TextAnalyticsActions` | `AnalyzeBatchAction[]` | Interface | The old one contained a field for each kind of action and those fields contained arrays of actions. On the other hand, the new interface is a union of a set of interfaces where each one represents a particular action with `kind` as a common field to act as a discriminator between different ones |
| `TextAnalyticsActionState` | `BatchActionState` | Interface | The new interface adds `kind` and `statistics` and all fields are marked as read-only |
| `TextAnalyticsActionSuccessState` | `BatchActionSuccessResult` | Interface | The new interface adds a read-only `results` field |
| `TextAnalyticsClientOptions` | `TextAnalysisClientOptions` | Interface | The new interface adds a new `apiVersion` field |
| `TextAnalyticsError` | `TextAnalysisError` | Interface | |
| `TextAnalyticsErrorResult` | `TextAnalysisErrorResult` | Interface | |
| `TextAnalyticsOperationOptions` | `ActionPrebuilt & TextAnalysisOperationOptions` | Interface | |
| `TextAnalyticsOperationStatus` | `OperationStatus` | Type Alias | |
| `TextAnalyticsSuccessResult` | `TextAnalysisSuccessResult` | Interface | |
| `TokenSentimentValue` | `TokenSentimentLabel` | Type Alias | |

## Migrating from `TextAnalyticsClient` to `TextAnalysisClient`

`@azure/ai-language-text`'s client can be constructed by instantiating the `TextAnalysisClient` class as opposed to the `TextAnalyticsClient` in `@azure/ai-text-analytics`. The constructor signature is the same, but one new option has been introduced to the client constructor, `apiVersion`, which allows the application to specify the version of the Azure Cognitive Language Service API to use (the default is the most recent version at the time of the library release, e.g. `2022-04-01-preview` for `@azure/ai-text-analytics@1.0.0-beta.1`).

`TextAnalyticsClient` and `TextAnalysisClient` have no methods in common. The latter provides three methods in total. They are:

- `analyze`, which replaces all of the following:
  - `recognizeEntities`
  - `recognizePiiEntities`
  - `extractKeyPhrases`
  - `detectLanguage`
  - `analyzeSentiment`
  - `recognizeLinkedEntities`
- `beginAnalyzeBatch`, which replaces `beginAnalyzeActions` and `beginAnalyzeHealthcareEntities`.
- `restoreAnalyzeBatchPoller`, which is new, and provides customers with the ability to restore a poller for a batch analysis operation from a serialized poller state.

All of these methods can produce `AnalyzeResult`, `AnalyzeBatchResult[]`, and `AnalyzeBatchPoller` types respectively. Please see the section above about these types for more information.

### Action specification

In `@azure/ai-text-analytics`, there is one method per action for actions that are not long-running operations. For example, the `recognizeEntities` method performs entity recognition. In `@azure/ai-language-text`, there is only one method, `analyze`, that can perform one such action at a time. Compare the following samples using `recognizeEntities` and `analyze`:

Previous (`@azure/ai-text-analytics@5.1.0`):

```typescript
const client = new TextAnalyticsClient(...);
const documents = [...];

// Previously, there was one method per action for most actions
const result = await client.recognizeEntities(documents);
```

Current (`@azure/ai-language-text@1.0.0-beta.1`):

```typescript
const client = new TextAnalysisClient(...);
const documents = [...];

// Now, an action can be performed by passing its name
const result = await client.analyze("EntityRecognition", documents);
```

On the other hand, the way to consume the results of such actions didn't change. Furthermore, in `@azure/ai-text-analytics`, long-running operations actions can be batched and performed using the `beginAnalyzeActions` method. In `@azure/ai-language-text`, the same can be done using the `beginAnalyzeBatch` method but with the following two major differences:

- Healthcare analysis is now supported. In `@azure/ai-text-analytics`, healthcare analysis is performed exclusively using the `beginAnalyzeHealthcareEntities` method. In `@azure/ai-language-text`, it is supported exclusively as an action in `beginAnalyzeBatch`.
- Each action and their result is identified by a `kind` field in a list. In `@azure/ai-text-analytics`, specifying an action list of entity recognition and entity linking is done as `{ recognizeEntities: [ { ... } ], recognizeLinkedEntities: [ { ... } ] }`. In `@azure/ai-language-text`, the same is done as `[ { kind: "EntityRecognition", ... }, { kind: "EntityLinking", ... } ]`.

To look at those changes more closely, compare the following samples:

Healthcare analysis:

Previous (`@azure/ai-text-analytics@5.1.0`):

```typescript
const client = new TextAnalyticsClient(...);
const documents = [...];

// Previously, healthcare analysis is done by calling the following method
const poller = await client.beginAnalyzeHealthcareEntities(documents);
```

Current (`@azure/ai-language-text@1.0.0-beta.1`):

```typescript
const client = new TextAnalysisClient(...);
const documents = [...];

// Now, it can be performed by passing it as a batch action
const poller = await client.beginAnalyzeBatch([{ kind: "Healthcare" }], documents);
```

Specifying input actions:

Previous (`@azure/ai-text-analytics@5.1.0`):

```typescript
const client = new TextAnalyticsClient(...);
const documents = [...];

// Previously, batching actions we done in a deep object
const poller = await client.beginAnalyzeActions(documents, { recognizeEntities: [ {} ], recognizeLinkedEntities: [ {} ] });
```

Current (`@azure/ai-language-text@1.0.0-beta.1`):

```typescript
const client = new TextAnalysisClient(...);
const documents = [...];

// Now, it can be done in a flat list
const poller = await client.beginAnalyzeBatch([{ kind: "EntityRecognition" }, { kind: "EntityLinking" }], documents);
```

Consuming action results:

Previous (`@azure/ai-text-analytics@5.1.0`):

```typescript
const actionResults = await poller.pollUntilDone();

for await (const actionResultsPage of actionResults) {
  for (const entityRecognitionActionResult of actionResultsPage.recognizeEntitiesResults) {
    if (entityRecognitionActionResult.error) {
      // handle errors
    }
    for (const doc of entityRecognitionActionResult.results) {
      // do something
    }
  }

  for (const entityLinkingActionResult of actionResultsPage.recognizeLinkedEntitiesResults) {
    if (entityLinkingActionResult.error) {
      // handle errors
    }
    for (const doc of entityLinkingActionResult.results) {
      // do something
    }
  }
}
```

Current (`@azure/ai-language-text@1.0.0-beta.1`):

```typescript
const actionResults = await poller.pollUntilDone();
for await (const actionResult of actionResults) {
  if (actionResult.error) {
    throw new Error(`Unexpected error`);
  }
  switch (actionResult.kind) {
    case "EntityLinking": {
      for (const doc of actionResult.results) {
        // do something
      }
      break;
    }
    case "PiiEntityRecognition": {
      for (const doc of actionResult.results) {
        // do something
      }
      break;
    }
  }
}
```

### Accessing statistics and model information for `analyze` results

In `@azure/ai-text-analytics`, statistics about an action were returned as part of the results in a `statistics` property attached to the array of results. In `@azure/ai-language-text`, `statistics` is no longer attached and can be accessed instead in the http response:

Previous (`@azure/ai-text-analytics@5.1.0`):

```typescript
const client = new TextAnalyticsClient(...);
const documents = [...];

// Previously, `statistics` is part of the results array
const results = await client.analyze("EntityLinking", documents, "en", { includeStatistics: true });
const stats = results.statistics;
console.log(`- Documents count: ${stats.documentCount}`);
console.log(`- Valid documents count: ${stats.validDocumentCount}`);
console.log(`- Erroneous documents count: ${stats.erroneousDocumentCount}`);
console.log(`- Transactions count: ${stats.transactionCount}`);
```

Current (`@azure/ai-language-text@1.0.0-beta.1`):

```typescript
const client = new TextAnalysisClient(...);
const documents = [...];

// Now, it can be accessed from the http response
const results = await client.analyze("EntityLinking", documents, "en", {
  includeStatistics: true,
  /**
   * Access general statistics information about the action from the HTTP
   * response.
   */
   onResponse: (_rawResponse, flatResponse) => {
    const stats = (flatResponse as any).results.statistics as TextDocumentBatchStatistics;
    console.log(`- Documents count: ${stats.documentCount}`);
    console.log(`- Valid documents count: ${stats.validDocumentCount}`);
    console.log(`- Erroneous documents count: ${stats.erroneousDocumentCount}`);
    console.log(`- Transactions count: ${stats.transactionCount}`);
  },
});
```

Furthermore, in `@azure/ai-text-analytics`, model information about an action were returned as part of the results in a `modelVersion` property attached to the array of results. In `@azure/ai-language-text`, the same information can be accessed instead from the http response:

Previous (`@azure/ai-text-analytics@5.1.0`):

```typescript
const client = new TextAnalyticsClient(...);
const documents = [...];

// Previously, `statistics` is part of the results array
const results = await client.analyze("EntityLinking", documents, "en", { includeStatistics: true });
console.log(`The result of the sentiment analysis was computed using model version: ${results.modelVersion}`);
```

Current (`@azure/ai-language-text@1.0.0-beta.1`):

```typescript
const client = new TextAnalysisClient(...);
const documents = [...];

// Now, it can be accessed from the http response
const results = await client.analyze("EntityLinking", documents, "en", {
  modelVersion: "latest",
  /**
   * Access general model information about the action from the HTTP
   * response.
   */
  onResponse: (_rawResponse, flatResponse) => {
    const modelVersion = (flatResponse as any).results.modelVersion;
    console.log(
      `The result of the entity linking was computed using model version: ${modelVersion}`
    );
  },
});
```
