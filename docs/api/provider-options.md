# Provider Options

Configuration options for the Claude Code provider.

## Overview

Provider options can be specified in two ways:

1. **Model creation** - Pass options when creating the model
2. **Request-level** - Pass options via `providerOptions`

## ClaudeCodeProviderOptions

```typescript
interface ClaudeCodeProviderOptions {
  maxThinkingTokens?: number;
}
```

## Options

### maxThinkingTokens

Enable extended thinking for Claude Opus.

**Type:** `number | undefined`
**Default:** `undefined` (no extended thinking)
**Range:** 1-2000 (recommended)
**Models:** Opus only

#### Description

Allocates tokens for the model's internal reasoning process. When enabled, Claude will spend time "thinking" before responding, with the reasoning process available in the response.

#### Examples

**Via model creation:**

```typescript
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const model = claudeCode('opus', {
  maxThinkingTokens: 2000
});
```

**Via providerOptions:**

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text, reasoning } = await generateText({
  model: claudeCode('opus'),
  prompt: 'Solve this complex problem...',
  providerOptions: {
    'claude-code': {
      maxThinkingTokens: 2000,
    },
  },
});

console.log('Reasoning:', reasoning);
console.log('Answer:', text);
```

#### Guidelines

**Recommended values:**
- Simple reasoning: 500-1000 tokens
- Complex reasoning: 1000-2000 tokens
- Maximum capability: 2000 tokens

**Trade-offs:**
- More tokens = deeper reasoning
- More tokens = slower responses
- More tokens = higher cost

#### Use Cases

**Good use cases:**
- Complex problem solving
- Multi-step reasoning
- Mathematical proofs
- Code architecture design
- Research and analysis

**Not needed for:**
- Simple questions
- Quick responses
- Straightforward tasks
- High-volume operations

#### Accessing Reasoning

The reasoning process is available in the response:

```typescript
const { text, reasoning } = await generateText({
  model: claudeCode('opus', { maxThinkingTokens: 1500 }),
  prompt: 'Design a distributed system for...',
});

if (reasoning) {
  console.log('How Claude thought about it:');
  console.log(reasoning);
}

console.log('\nFinal answer:');
console.log(text);
```

## Configuration Patterns

### Default Configuration

Create a configured model instance:

```typescript
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

// Default Sonnet
const sonnet = claudeCode();

// Opus with thinking
const opus = claudeCode('opus', {
  maxThinkingTokens: 1500
});

// Fast Haiku
const haiku = claudeCode('haiku');
```

### Per-Request Configuration

Override options for specific requests:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const model = claudeCode('opus');

// Normal request
const simple = await generateText({
  model,
  prompt: 'Simple question',
});

// With extended thinking
const complex = await generateText({
  model,
  prompt: 'Complex question',
  providerOptions: {
    'claude-code': {
      maxThinkingTokens: 2000,
    },
  },
});
```

### Factory Pattern

Create model factories:

```typescript
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';
import type { ClaudeCodeModelId, ClaudeCodeProviderOptions } from '@sylphx/ai-sdk-provider-claude-code';

function createModel(
  modelId: ClaudeCodeModelId,
  options?: ClaudeCodeProviderOptions
) {
  return claudeCode(modelId, {
    // Default options
    ...options,
  });
}

// Usage
const model = createModel('opus', { maxThinkingTokens: 1000 });
```

## Validation

Options are validated at runtime:

```typescript
// Valid
claudeCode('opus', { maxThinkingTokens: 1500 });

// Invalid - will throw or ignore
claudeCode('haiku', { maxThinkingTokens: 1000 }); // Warning: thinking only for Opus
claudeCode('opus', { maxThinkingTokens: -100 });  // Error: invalid value
```

## TypeScript Support

Full TypeScript support with IntelliSense:

```typescript
import type { ClaudeCodeProviderOptions } from '@sylphx/ai-sdk-provider-claude-code';

const options: ClaudeCodeProviderOptions = {
  maxThinkingTokens: 1500, // Type-checked
};
```

## Environment-Based Configuration

Configure based on environment:

```typescript
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const isDevelopment = process.env.NODE_ENV === 'development';

const model = claudeCode('opus', {
  maxThinkingTokens: isDevelopment ? 2000 : 1000,
});
```

## Best Practices

### 1. Use Default for Simple Tasks

```typescript
// Good: No thinking needed for simple tasks
const model = claudeCode('sonnet');
```

### 2. Enable Thinking for Complex Tasks

```typescript
// Good: Enable thinking for complexity
const model = claudeCode('opus', {
  maxThinkingTokens: 2000
});
```

### 3. Don't Over-Configure

```typescript
// Bad: Thinking for simple questions
const model = claudeCode('opus', {
  maxThinkingTokens: 2000
});

await generateText({
  model,
  prompt: 'What is 2 + 2?',
});
```

### 4. Consider Trade-offs

```typescript
// Balance capability vs speed
const balanced = claudeCode('opus', {
  maxThinkingTokens: 1000 // Not too slow, good reasoning
});
```

## Examples

### Simple Configuration

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text } = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'Hello!',
});
```

### Extended Thinking

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text, reasoning } = await generateText({
  model: claudeCode('opus', {
    maxThinkingTokens: 2000
  }),
  prompt: 'Design a scalable microservices architecture',
});

console.log('Reasoning:', reasoning);
console.log('Design:', text);
```

### Dynamic Configuration

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

async function askClaude(
  prompt: string,
  complexity: 'simple' | 'complex'
) {
  const options = complexity === 'complex'
    ? { maxThinkingTokens: 2000 }
    : {};

  return generateText({
    model: claudeCode('opus', options),
    prompt,
  });
}
```

## See Also

- [claudeCode()](./claude-code) - Main function reference
- [Type Definitions](./types) - TypeScript types
- [Models Guide](/guide/models) - Model comparison
- [Examples](/examples/) - Usage examples
