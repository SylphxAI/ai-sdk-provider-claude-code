# Usage

This guide covers common usage patterns for the Claude Code provider.

## Basic Text Generation

The simplest way to use the provider is for text generation:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text } = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'Explain quantum computing in simple terms',
});

console.log(text);
```

## Streaming Text

For real-time responses, use streaming:

```typescript
import { streamText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { textStream } = await streamText({
  model: claudeCode('sonnet'),
  prompt: 'Write a story about a robot learning to paint',
});

for await (const chunk of textStream) {
  process.stdout.write(chunk);
}
```

## Tool Calling

The provider's key feature is universal tool support without MCP servers:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';
import { z } from 'zod';

const { text, toolCalls } = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'What is the weather in San Francisco and Tokyo?',
  tools: {
    getWeather: {
      description: 'Get the weather for a location',
      parameters: z.object({
        city: z.string().describe('The city name'),
      }),
      execute: async ({ city }) => {
        // Your weather API call here
        return {
          city,
          temperature: 72,
          condition: 'sunny',
        };
      },
    },
  },
});

console.log('Tool calls:', toolCalls);
console.log('Response:', text);
```

**No MCP server needed!** The tool is automatically converted to XML format and results are seamlessly integrated.

## Streaming with Tools

Combine streaming with tool support:

```typescript
import { streamText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';
import { z } from 'zod';

const { textStream, toolCallStreams } = await streamText({
  model: claudeCode('sonnet'),
  prompt: 'Search for the latest AI news and summarize',
  tools: {
    search: {
      description: 'Search the web',
      parameters: z.object({
        query: z.string(),
      }),
      execute: async ({ query }) => {
        // Your search implementation
        return { results: ['...'] };
      },
    },
  },
});

// Stream text
for await (const chunk of textStream) {
  process.stdout.write(chunk);
}

// Handle tool calls
for await (const toolCall of toolCallStreams) {
  console.log('Tool called:', toolCall);
}
```

## Extended Thinking

Enable extended reasoning with Claude Opus 4:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text, reasoning } = await generateText({
  model: claudeCode('opus', {
    maxThinkingTokens: 2000, // Enable extended reasoning
  }),
  prompt: 'Solve this complex logic puzzle: ...',
});

console.log('Reasoning:', reasoning);
console.log('Answer:', text);
```

## Multi-Turn Conversations

Build conversational applications:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const conversation = [
  { role: 'user', content: 'Hello!' },
  { role: 'assistant', content: 'Hi! How can I help you today?' },
  { role: 'user', content: 'Tell me about TypeScript.' },
];

const { text } = await generateText({
  model: claudeCode('sonnet'),
  messages: conversation,
});

console.log(text);
```

## Custom System Prompts

Set a custom system prompt to guide the model's behavior:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text } = await generateText({
  model: claudeCode('sonnet'),
  messages: [
    {
      role: 'system',
      content: 'You are a helpful AI assistant specialized in TypeScript.',
    },
    {
      role: 'user',
      content: 'How do I use generics?',
    },
  ],
});

console.log(text);
```

## Provider Options

Configure provider-specific options:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text } = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'Your prompt',
  providerOptions: {
    'claude-code': {
      maxThinkingTokens: 1000, // Enable extended reasoning
    },
  },
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
  }
}
```

## Best Practices

### Choose the Right Model

- **Opus** - Complex reasoning, extended thinking
- **Sonnet** - General purpose, production apps (default)
- **Haiku** - Simple tasks, cost optimization

See the [Models Guide](./models) for more details.

### Tool Design

When designing tools:

1. **Clear descriptions** - Help Claude understand when to use the tool
2. **Specific parameters** - Use Zod for validation and descriptions
3. **Meaningful results** - Return structured data the model can use

```typescript
{
  description: 'Get current weather for a city',
  parameters: z.object({
    city: z.string().describe('The city name (e.g., "San Francisco")'),
    units: z.enum(['celsius', 'fahrenheit']).describe('Temperature units'),
  }),
  execute: async ({ city, units }) => ({
    city,
    temperature: 72,
    condition: 'sunny',
    units,
  })
}
```

### Streaming vs Non-Streaming

- **Use streaming** for user-facing applications where you want to show progress
- **Use non-streaming** for batch processing or when you need the complete response

### Memory Management

For long conversations, consider:

1. Summarizing old messages
2. Keeping only recent context
3. Using a database to store conversation history

## Next Steps

- [Models Guide](./models) - Learn about available models
- [Architecture](./architecture) - Understand how it works
- [API Reference](/api/) - Detailed API documentation
- [Examples](/examples/) - More example code
