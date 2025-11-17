# Models

This guide covers the available Claude models and how to choose the right one for your use case.

## Available Models

```typescript
claudeCode('opus')   // Claude 4.1 Opus - Most capable, extended thinking
claudeCode('sonnet') // Claude 4.5 Sonnet - Balanced performance (default)
claudeCode('haiku')  // Claude 4.5 Haiku - Fastest, most cost-effective
```

## Model Comparison

| Model | Capability | Speed | Use Cases |
|-------|-----------|-------|-----------|
| **Opus** | Highest | Slower | Complex reasoning, extended thinking |
| **Sonnet** | Balanced | Medium | General purpose, production apps |
| **Haiku** | Good | Fastest | Simple tasks, cost optimization |

## Claude Opus

### Overview

Claude 4.1 Opus is the most capable model with extended thinking support.

### When to Use

- Complex reasoning tasks
- Multi-step problem solving
- Tasks requiring deep analysis
- When you need to see the thinking process

### Example

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text, reasoning } = await generateText({
  model: claudeCode('opus', {
    maxThinkingTokens: 2000,
  }),
  prompt: 'Solve this complex logic puzzle: ...',
});

console.log('Reasoning:', reasoning);
console.log('Answer:', text);
```

### Extended Thinking

Opus supports extended thinking with configurable thinking tokens:

```typescript
claudeCode('opus', {
  maxThinkingTokens: 2000 // Up to 2000 tokens for reasoning
})
```

The thinking process is available in the `reasoning` field of the response.

## Claude Sonnet

### Overview

Claude 4.5 Sonnet offers balanced performance and is the recommended choice for most applications.

### When to Use

- General purpose applications
- Production deployments
- When you need a balance of capability and speed
- Most tool-calling scenarios

### Example

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text } = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'Explain how TypeScript generics work',
});

console.log(text);
```

### Default Model

If you don't specify a model, Sonnet is used by default:

```typescript
// These are equivalent
claudeCode()
claudeCode('sonnet')
```

## Claude Haiku

### Overview

Claude 4.5 Haiku is the fastest and most cost-effective model.

### When to Use

- Simple, straightforward tasks
- High-volume applications
- Cost optimization
- Quick responses needed

### Example

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text } = await generateText({
  model: claudeCode('haiku'),
  prompt: 'What is 2 + 2?',
});

console.log(text);
```

### Use Cases

- Classification tasks
- Simple Q&A
- Data extraction
- Formatting and transformation

## Model Selection Guide

### By Task Complexity

**Simple tasks** (Haiku)
- Math calculations
- Text formatting
- Simple classifications
- Quick lookups

**Medium complexity** (Sonnet)
- Code generation
- Content writing
- Tool orchestration
- General Q&A

**Complex tasks** (Opus)
- Research and analysis
- Complex problem solving
- Multi-step reasoning
- Deep code refactoring

### By Performance Requirements

**Lowest latency** → Haiku
**Balanced** → Sonnet
**Best quality** → Opus

### By Cost Optimization

**Most cost-effective** → Haiku
**Balanced** → Sonnet
**Premium quality** → Opus

## Model Options

### Max Thinking Tokens (Opus only)

Enable extended reasoning:

```typescript
claudeCode('opus', {
  maxThinkingTokens: 1000 // 1000-2000 recommended
})
```

**Guidelines:**
- Default: No extended thinking
- Recommended: 1000-2000 tokens
- Maximum: Depends on Claude limits
- Higher values = more reasoning, slower response

### Provider Options

Configure via `providerOptions`:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text } = await generateText({
  model: claudeCode('opus'),
  prompt: 'Your prompt',
  providerOptions: {
    'claude-code': {
      maxThinkingTokens: 1500,
    },
  },
});
```

## Best Practices

### Start with Sonnet

For new projects, start with Sonnet:

```typescript
const model = claudeCode('sonnet');
```

Then optimize:
- Switch to Haiku for simple tasks
- Upgrade to Opus for complex reasoning

### Use the Right Model for the Job

Don't use Opus for everything:

```typescript
// Good: Use Haiku for simple tasks
const simpleTask = await generateText({
  model: claudeCode('haiku'),
  prompt: 'Extract the email from: john@example.com',
});

// Good: Use Opus for complex reasoning
const complexTask = await generateText({
  model: claudeCode('opus', { maxThinkingTokens: 1500 }),
  prompt: 'Design a distributed system architecture for...',
});

// Bad: Using Opus for simple tasks
const wasteful = await generateText({
  model: claudeCode('opus', { maxThinkingTokens: 2000 }),
  prompt: 'What is 2 + 2?',
});
```

### Monitor and Optimize

Track your usage:

1. Monitor response times
2. Track costs per model
3. A/B test model choices
4. Optimize based on metrics

## Examples by Model

### Opus Example: Complex Analysis

```typescript
const { text, reasoning } = await generateText({
  model: claudeCode('opus', { maxThinkingTokens: 2000 }),
  prompt: `
    Analyze this code and suggest architectural improvements:
    [large code block]
  `,
});

console.log('Analysis:', text);
console.log('Reasoning:', reasoning);
```

### Sonnet Example: Production App

```typescript
const { text, toolCalls } = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'Find and summarize recent AI news',
  tools: {
    search: searchTool,
    summarize: summarizeTool,
  },
});
```

### Haiku Example: High Volume

```typescript
const results = await Promise.all(
  items.map(item =>
    generateText({
      model: claudeCode('haiku'),
      prompt: `Classify this: ${item}`,
    })
  )
);
```

## Next Steps

- [Usage Guide](./usage) - Learn common patterns
- [API Reference](/api/) - Detailed API documentation
- [Examples](/examples/) - See models in action
