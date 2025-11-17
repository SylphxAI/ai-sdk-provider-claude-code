# Type Definitions

TypeScript type definitions for the Claude Code provider.

## Overview

The provider is built with TypeScript strict mode and exports comprehensive type definitions for type-safe usage.

## Exports

```typescript
import type {
  ClaudeCodeModelId,
  ClaudeCodeProviderOptions,
} from '@sylphx/ai-sdk-provider-claude-code';
```

## Types

### ClaudeCodeModelId

Available Claude Code model identifiers.

```typescript
type ClaudeCodeModelId = 'opus' | 'sonnet' | 'haiku';
```

**Values:**
- `'opus'` - Claude 4.1 Opus
- `'sonnet'` - Claude 4.5 Sonnet (default)
- `'haiku'` - Claude 4.5 Haiku

**Example:**

```typescript
import type { ClaudeCodeModelId } from '@sylphx/ai-sdk-provider-claude-code';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const modelId: ClaudeCodeModelId = 'sonnet';
const model = claudeCode(modelId);
```

### ClaudeCodeProviderOptions

Configuration options for the provider.

```typescript
interface ClaudeCodeProviderOptions {
  maxThinkingTokens?: number;
}
```

**Properties:**

- `maxThinkingTokens` (optional) - Number of tokens for extended thinking (Opus only)
  - Type: `number | undefined`
  - Default: `undefined`
  - Range: 1-2000 (recommended)

**Example:**

```typescript
import type { ClaudeCodeProviderOptions } from '@sylphx/ai-sdk-provider-claude-code';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const options: ClaudeCodeProviderOptions = {
  maxThinkingTokens: 1500,
};

const model = claudeCode('opus', options);
```

## AI SDK Types

The provider implements standard AI SDK interfaces:

### LanguageModelV2

```typescript
import type { LanguageModelV2 } from '@ai-sdk/provider';

const model: LanguageModelV2 = claudeCode('sonnet');
```

The model instance is fully compatible with all AI SDK functions.

### Tool Definition

```typescript
import type { CoreTool } from 'ai';
import { z } from 'zod';

const weatherTool: CoreTool = {
  description: 'Get weather for a location',
  parameters: z.object({
    city: z.string(),
  }),
  execute: async ({ city }) => ({
    city,
    temperature: 72,
    condition: 'sunny',
  }),
};
```

## Response Types

### Text Generation Response

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const response = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'Hello!',
});

// Response type
type Response = {
  text: string;
  finishReason: 'stop' | 'length' | 'content-filter' | 'tool-calls' | 'error' | 'other';
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  // ... other AI SDK fields
};
```

### Streaming Response

```typescript
import { streamText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const response = await streamText({
  model: claudeCode('sonnet'),
  prompt: 'Hello!',
});

// Response type
type StreamResponse = {
  textStream: AsyncIterable<string>;
  fullStream: AsyncIterable<any>;
  // ... other AI SDK fields
};
```

### Extended Thinking Response

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const response = await generateText({
  model: claudeCode('opus', { maxThinkingTokens: 2000 }),
  prompt: 'Solve this puzzle...',
});

// Response includes reasoning
type ThinkingResponse = {
  text: string;
  reasoning?: string; // Available when using extended thinking
  // ... other fields
};
```

## Type Guards

The provider uses comprehensive type guards internally:

```typescript
// Example internal type guard
function isToolCall(value: unknown): value is ToolCall {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    typeof value.name === 'string'
  );
}
```

## Generic Types

### Tool Parameters

```typescript
import { z } from 'zod';

type ToolParameters<T extends z.ZodType> = z.infer<T>;

const schema = z.object({
  city: z.string(),
  units: z.enum(['celsius', 'fahrenheit']),
});

type Params = ToolParameters<typeof schema>;
// { city: string; units: 'celsius' | 'fahrenheit' }
```

### Tool Execute Function

```typescript
import type { CoreTool } from 'ai';
import { z } from 'zod';

type ExecuteFunction<T extends z.ZodType> = (
  params: z.infer<T>
) => Promise<any>;

const schema = z.object({
  city: z.string(),
});

const execute: ExecuteFunction<typeof schema> = async ({ city }) => {
  // city is typed as string
  return { temperature: 72 };
};
```

## Utility Types

### Model Creation Helper

```typescript
import type { ClaudeCodeModelId, ClaudeCodeProviderOptions } from '@sylphx/ai-sdk-provider-claude-code';
import type { LanguageModelV2 } from '@ai-sdk/provider';

type CreateModel = (
  modelId?: ClaudeCodeModelId,
  options?: ClaudeCodeProviderOptions
) => LanguageModelV2;
```

### Provider Options Union

```typescript
import type { ClaudeCodeProviderOptions } from '@sylphx/ai-sdk-provider-claude-code';

type ProviderOptionsMap = {
  'claude-code': ClaudeCodeProviderOptions;
};

// Usage in AI SDK calls
const response = await generateText({
  model: claudeCode('opus'),
  prompt: 'Hello',
  providerOptions: {
    'claude-code': {
      maxThinkingTokens: 1000,
    },
  } satisfies Partial<ProviderOptionsMap>,
});
```

## Examples

### Type-Safe Model Creation

```typescript
import type { ClaudeCodeModelId } from '@sylphx/ai-sdk-provider-claude-code';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

function createModelSafely(modelId: ClaudeCodeModelId) {
  return claudeCode(modelId);
}

const model = createModelSafely('sonnet'); // Type-safe
```

### Type-Safe Options

```typescript
import type { ClaudeCodeProviderOptions } from '@sylphx/ai-sdk-provider-claude-code';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

function createModelWithOptions(
  options: ClaudeCodeProviderOptions
) {
  return claudeCode('opus', options);
}

const model = createModelWithOptions({
  maxThinkingTokens: 1500, // Type-checked
});
```

### Type-Safe Tool Definition

```typescript
import type { CoreTool } from 'ai';
import { z } from 'zod';

const weatherSchema = z.object({
  city: z.string(),
  units: z.enum(['celsius', 'fahrenheit']),
});

const weatherTool: CoreTool<typeof weatherSchema> = {
  description: 'Get weather',
  parameters: weatherSchema,
  execute: async (params) => {
    // params is fully typed
    const { city, units } = params;
    return { temperature: 72 };
  },
};
```

### Type-Safe Response Handling

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

async function getResponse(prompt: string): Promise<string> {
  const { text } = await generateText({
    model: claudeCode('sonnet'),
    prompt,
  });

  return text; // Type-safe return
}
```

## See Also

- [claudeCode()](./claude-code) - Main function reference
- [Provider Options](./provider-options) - Configuration options
- [AI SDK Types](https://sdk.vercel.ai/docs/reference/ai-sdk-core) - Vercel AI SDK type reference
