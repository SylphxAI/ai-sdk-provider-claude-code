# API Reference

This section provides detailed documentation for the Claude Code provider API.

## Overview

The Claude Code provider implements the `LanguageModelV2` interface from the Vercel AI SDK, providing full compatibility with all AI SDK features.

## Exports

```typescript
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';
```

### Main Export

- [`claudeCode()`](./claude-code) - Create a Claude Code model instance

## Type Definitions

The provider includes comprehensive TypeScript types:

```typescript
import type {
  ClaudeCodeModelId,
  ClaudeCodeProviderOptions,
} from '@sylphx/ai-sdk-provider-claude-code';
```

See [Type Definitions](./types) for detailed type information.

## Quick Reference

### Create a Model

```typescript
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

// Default (Sonnet)
const model = claudeCode();

// Specific model
const opus = claudeCode('opus');
const sonnet = claudeCode('sonnet');
const haiku = claudeCode('haiku');

// With options
const opusWithThinking = claudeCode('opus', {
  maxThinkingTokens: 2000
});
```

### Use with AI SDK

```typescript
import { generateText, streamText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

// Generate text
const { text } = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'Hello!',
});

// Stream text
const { textStream } = await streamText({
  model: claudeCode('sonnet'),
  prompt: 'Hello!',
});
```

### Provider Options

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

## Supported Features

| Feature | Support | Notes |
|---------|---------|-------|
| **Text Generation** | ✅ Full | Complete support |
| **Streaming** | ✅ Full | Custom XML parser |
| **Tool Calling** | ✅ Full | Universal tool support |
| **Multi-turn** | ✅ Full | Conversation history |
| **System Prompts** | ✅ Full | Custom system messages |
| **Extended Thinking** | ✅ Full | Opus only |
| **Image Input** | ⚠️ Untested | Should work, needs validation |
| **Abort Signals** | ❌ Planned | On roadmap |
| **Tool Callbacks** | ❌ Planned | On roadmap |

## AI SDK Compatibility

The provider implements `LanguageModelV2` and is compatible with:

- ✅ `generateText()` - Text generation
- ✅ `streamText()` - Streaming text
- ✅ `generateObject()` - Structured output
- ✅ `streamObject()` - Streaming objects
- ✅ Tool calling - Universal tool support
- ✅ Multi-modal inputs - Messages with images
- ⚠️ `embed()` - Not applicable (Claude Code doesn't support embeddings)

## Error Handling

The provider throws standard AI SDK errors:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

try {
  const { text } = await generateText({
    model: claudeCode('sonnet'),
    prompt: 'Hello!',
  });
} catch (error) {
  if (error instanceof Error) {
    console.error('Error:', error.message);
  }
}
```

Common errors:
- Authentication errors
- Model not found
- Tool execution errors
- Stream parsing errors

## Next Steps

- [`claudeCode()`](./claude-code) - Detailed function reference
- [Provider Options](./provider-options) - Configuration options
- [Type Definitions](./types) - TypeScript types
- [Examples](/examples/) - Usage examples
