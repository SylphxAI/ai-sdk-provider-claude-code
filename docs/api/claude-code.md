# claudeCode()

Creates a Claude Code model instance for use with the Vercel AI SDK.

## Signature

```typescript
function claudeCode(
  modelId?: ClaudeCodeModelId,
  options?: ClaudeCodeProviderOptions
): LanguageModelV2
```

## Parameters

### `modelId` (optional)

The model to use. Available values:

- `'opus'` - Claude 4.1 Opus (most capable, extended thinking)
- `'sonnet'` - Claude 4.5 Sonnet (balanced, default)
- `'haiku'` - Claude 4.5 Haiku (fastest, cost-effective)

**Default:** `'sonnet'`

### `options` (optional)

Provider-specific options.

```typescript
interface ClaudeCodeProviderOptions {
  maxThinkingTokens?: number; // Enable extended thinking (Opus only)
}
```

- `maxThinkingTokens` - Number of tokens to allocate for reasoning (Opus only)
  - **Default:** `undefined` (no extended thinking)
  - **Range:** 1-2000 (recommended)
  - **Note:** Only works with Opus model

## Returns

Returns a `LanguageModelV2` instance that can be used with all Vercel AI SDK functions.

## Examples

### Basic Usage

```typescript
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

// Default (Sonnet)
const model = claudeCode();

// Specific model
const opus = claudeCode('opus');
const sonnet = claudeCode('sonnet');
const haiku = claudeCode('haiku');
```

### With Extended Thinking

```typescript
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const model = claudeCode('opus', {
  maxThinkingTokens: 2000
});
```

### With AI SDK

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text } = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'Explain quantum computing',
});
```

### With Streaming

```typescript
import { streamText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { textStream } = await streamText({
  model: claudeCode('haiku'),
  prompt: 'Write a story',
});

for await (const chunk of textStream) {
  process.stdout.write(chunk);
}
```

### With Tools

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';
import { z } from 'zod';

const { text, toolCalls } = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'What is the weather?',
  tools: {
    getWeather: {
      description: 'Get weather',
      parameters: z.object({
        city: z.string(),
      }),
      execute: async ({ city }) => ({
        city,
        temperature: 72,
        condition: 'sunny',
      }),
    },
  },
});
```

## Model Details

### Opus

```typescript
claudeCode('opus', { maxThinkingTokens: 2000 })
```

**Features:**
- Extended thinking support
- Highest capability
- Best for complex reasoning

**Use cases:**
- Complex problem solving
- Deep analysis
- Multi-step reasoning

### Sonnet

```typescript
claudeCode('sonnet')
```

**Features:**
- Balanced performance
- General purpose
- Production-ready

**Use cases:**
- Production applications
- Tool orchestration
- General Q&A

### Haiku

```typescript
claudeCode('haiku')
```

**Features:**
- Fastest responses
- Cost-effective
- Good capability

**Use cases:**
- Simple tasks
- High volume
- Cost optimization

## Options

### maxThinkingTokens

Enable extended thinking (Opus only):

```typescript
claudeCode('opus', {
  maxThinkingTokens: 1500
})
```

**Guidelines:**
- Only works with Opus model
- Range: 1-2000 tokens (recommended)
- Higher values = more reasoning, slower response
- Access reasoning via `reasoning` field in response

**Example:**

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text, reasoning } = await generateText({
  model: claudeCode('opus', {
    maxThinkingTokens: 2000
  }),
  prompt: 'Solve this puzzle...',
});

console.log('Reasoning:', reasoning);
console.log('Answer:', text);
```

## Type Safety

The function is fully typed:

```typescript
import type { ClaudeCodeModelId } from '@sylphx/ai-sdk-provider-claude-code';

// Type-safe model ID
const modelId: ClaudeCodeModelId = 'sonnet';
const model = claudeCode(modelId);

// Options are typed
const opusModel = claudeCode('opus', {
  maxThinkingTokens: 1000, // Type-checked
});
```

## Error Handling

The function validates inputs and throws errors for invalid configurations:

```typescript
// These will throw errors
claudeCode('invalid-model');        // Invalid model ID
claudeCode('haiku', {
  maxThinkingTokens: 1000           // Thinking only works with Opus
});
```

## Provider Options (Alternative)

You can also pass options via `providerOptions`:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text } = await generateText({
  model: claudeCode('opus'),
  prompt: 'Your prompt',
  providerOptions: {
    'claude-code': {
      maxThinkingTokens: 1000,
    },
  },
});
```

Both approaches are equivalent.

## See Also

- [Provider Options](./provider-options) - Detailed option reference
- [Type Definitions](./types) - TypeScript types
- [Models Guide](/guide/models) - Model comparison and selection
- [Usage Guide](/guide/usage) - Common usage patterns
