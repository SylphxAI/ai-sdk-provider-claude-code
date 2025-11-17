# Basic Text Generation

Learn how to generate text using the Claude Code provider.

## Simple Example

The most basic usage:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text } = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'Explain quantum computing in simple terms',
});

console.log(text);
```

## Different Models

### Sonnet (Default)

Balanced performance for general use:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text } = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'Write a haiku about programming',
});

console.log(text);
```

### Haiku (Fast)

Quick responses for simple tasks:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text } = await generateText({
  model: claudeCode('haiku'),
  prompt: 'What is 2 + 2?',
});

console.log(text);
```

### Opus (Capable)

Best quality for complex tasks:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text } = await generateText({
  model: claudeCode('opus'),
  prompt: 'Explain the theory of relativity',
});

console.log(text);
```

## With System Prompts

Guide the model's behavior:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text } = await generateText({
  model: claudeCode('sonnet'),
  messages: [
    {
      role: 'system',
      content: 'You are a helpful coding assistant specialized in TypeScript.',
    },
    {
      role: 'user',
      content: 'How do I use async/await?',
    },
  ],
});

console.log(text);
```

## Accessing Response Metadata

Get additional information from the response:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const response = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'Hello, Claude!',
});

console.log('Text:', response.text);
console.log('Finish Reason:', response.finishReason);
console.log('Usage:', response.usage);
console.log('Tokens:', {
  prompt: response.usage.promptTokens,
  completion: response.usage.completionTokens,
  total: response.usage.totalTokens,
});
```

## Error Handling

Handle errors gracefully:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

try {
  const { text } = await generateText({
    model: claudeCode('sonnet'),
    prompt: 'Your prompt',
  });

  console.log(text);
} catch (error) {
  if (error instanceof Error) {
    console.error('Error:', error.message);
  } else {
    console.error('Unknown error:', error);
  }
}
```

## Complete Example

A full example with error handling and metadata:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

async function askClaude(prompt: string) {
  try {
    console.log('Asking Claude:', prompt);

    const response = await generateText({
      model: claudeCode('sonnet'),
      prompt,
    });

    console.log('\nResponse:', response.text);
    console.log('\nMetadata:');
    console.log('- Finish reason:', response.finishReason);
    console.log('- Tokens used:', response.usage.totalTokens);

    return response.text;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Usage
await askClaude('What is TypeScript?');
```

## Best Practices

### 1. Choose the Right Model

```typescript
// Fast tasks → Haiku
const quick = await generateText({
  model: claudeCode('haiku'),
  prompt: 'Capitalize this: hello',
});

// General tasks → Sonnet
const general = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'Write a function to sort an array',
});

// Complex tasks → Opus
const complex = await generateText({
  model: claudeCode('opus'),
  prompt: 'Design a microservices architecture',
});
```

### 2. Use System Prompts

```typescript
const { text } = await generateText({
  model: claudeCode('sonnet'),
  messages: [
    {
      role: 'system',
      content: 'You are an expert in web development. Provide concise answers.',
    },
    {
      role: 'user',
      content: 'What is React?',
    },
  ],
});
```

### 3. Handle Errors

```typescript
try {
  const { text } = await generateText({
    model: claudeCode('sonnet'),
    prompt: 'Your prompt',
  });
  // Use text
} catch (error) {
  // Handle error
  console.error('Failed to generate text:', error);
}
```

## Next Steps

- [Streaming](./streaming) - Enable real-time responses
- [Tool Calling](./tools) - Add tool support
- [Multi-Turn Conversations](./conversations) - Build chat apps
