# Streaming

Learn how to stream responses in real-time with the Claude Code provider.

## Basic Streaming

Stream text as it's generated:

```typescript
import { streamText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { textStream } = await streamText({
  model: claudeCode('sonnet'),
  prompt: 'Write a short story about a robot',
});

for await (const chunk of textStream) {
  process.stdout.write(chunk);
}
```

## Full Stream

Access all stream events:

```typescript
import { streamText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { fullStream } = await streamText({
  model: claudeCode('sonnet'),
  prompt: 'Tell me about TypeScript',
});

for await (const event of fullStream) {
  switch (event.type) {
    case 'text-delta':
      process.stdout.write(event.textDelta);
      break;
    case 'finish':
      console.log('\nFinish reason:', event.finishReason);
      break;
  }
}
```

## Streaming to Console

Pretty-print streaming output:

```typescript
import { streamText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

async function streamToConsole(prompt: string) {
  console.log('Question:', prompt);
  console.log('Answer: ');

  const { textStream } = await streamText({
    model: claudeCode('sonnet'),
    prompt,
  });

  for await (const chunk of textStream) {
    process.stdout.write(chunk);
  }

  console.log('\n');
}

await streamToConsole('Explain how async/await works in JavaScript');
```

## Streaming to Web Response

Stream to an HTTP response (e.g., Next.js):

```typescript
import { streamText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = await streamText({
    model: claudeCode('sonnet'),
    prompt,
  });

  return result.toDataStreamResponse();
}
```

## Collecting Full Text

Collect the complete text from a stream:

```typescript
import { streamText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { textStream } = await streamText({
  model: claudeCode('sonnet'),
  prompt: 'Write a poem',
});

let fullText = '';
for await (const chunk of textStream) {
  fullText += chunk;
  process.stdout.write(chunk);
}

console.log('\n\nFull text:', fullText);
```

## Streaming with Progress

Show progress while streaming:

```typescript
import { streamText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

async function streamWithProgress(prompt: string) {
  const { textStream } = await streamText({
    model: claudeCode('sonnet'),
    prompt,
  });

  let chunkCount = 0;
  let totalLength = 0;

  for await (const chunk of textStream) {
    chunkCount++;
    totalLength += chunk.length;
    process.stdout.write(chunk);
  }

  console.log(`\n\nReceived ${chunkCount} chunks (${totalLength} characters)`);
}

await streamWithProgress('Write a detailed explanation of React');
```

## Streaming Events

Handle different event types:

```typescript
import { streamText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { fullStream } = await streamText({
  model: claudeCode('sonnet'),
  prompt: 'Explain quantum computing',
});

for await (const event of fullStream) {
  switch (event.type) {
    case 'text-delta':
      process.stdout.write(event.textDelta);
      break;

    case 'finish':
      console.log('\n\nStream finished:', event.finishReason);
      console.log('Usage:', event.usage);
      break;

    case 'error':
      console.error('Stream error:', event.error);
      break;
  }
}
```

## Abort Streaming

Stop a stream early (when implemented):

```typescript
import { streamText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const abortController = new AbortController();

// Start streaming
const { textStream } = await streamText({
  model: claudeCode('sonnet'),
  prompt: 'Write a very long story',
  abortSignal: abortController.signal,
});

// Stop after 5 seconds
setTimeout(() => {
  abortController.abort();
}, 5000);

try {
  for await (const chunk of textStream) {
    process.stdout.write(chunk);
  }
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('\nStream aborted');
  }
}
```

## Streaming Different Models

### Haiku - Fast Streaming

```typescript
import { streamText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { textStream } = await streamText({
  model: claudeCode('haiku'),
  prompt: 'Quick answer: what is TypeScript?',
});

for await (const chunk of textStream) {
  process.stdout.write(chunk);
}
```

### Sonnet - Balanced Streaming

```typescript
import { streamText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { textStream } = await streamText({
  model: claudeCode('sonnet'),
  prompt: 'Explain how React hooks work',
});

for await (const chunk of textStream) {
  process.stdout.write(chunk);
}
```

### Opus - Quality Streaming

```typescript
import { streamText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { textStream } = await streamText({
  model: claudeCode('opus'),
  prompt: 'Design a scalable architecture for a social media platform',
});

for await (const chunk of textStream) {
  process.stdout.write(chunk);
}
```

## Complete Example

Full streaming implementation:

```typescript
import { streamText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

async function streamResponse(prompt: string) {
  console.log('Prompt:', prompt);
  console.log('Response:\n');

  try {
    const { fullStream } = await streamText({
      model: claudeCode('sonnet'),
      prompt,
    });

    let textContent = '';

    for await (const event of fullStream) {
      switch (event.type) {
        case 'text-delta':
          process.stdout.write(event.textDelta);
          textContent += event.textDelta;
          break;

        case 'finish':
          console.log('\n\n--- Stream Complete ---');
          console.log('Finish reason:', event.finishReason);
          console.log('Total tokens:', event.usage.totalTokens);
          console.log('Text length:', textContent.length);
          break;

        case 'error':
          console.error('\n\nError:', event.error);
          break;
      }
    }

    return textContent;
  } catch (error) {
    console.error('Failed to stream:', error);
    throw error;
  }
}

// Usage
await streamResponse('Write a tutorial on async programming');
```

## Best Practices

### 1. Use Streaming for User Interfaces

```typescript
// Good: Show progress to users
const { textStream } = await streamText({
  model: claudeCode('sonnet'),
  prompt: userQuestion,
});

for await (const chunk of textStream) {
  displayToUser(chunk); // Update UI in real-time
}
```

### 2. Handle Errors Gracefully

```typescript
try {
  const { textStream } = await streamText({
    model: claudeCode('sonnet'),
    prompt,
  });

  for await (const chunk of textStream) {
    process.stdout.write(chunk);
  }
} catch (error) {
  console.error('Stream error:', error);
  // Show error to user
}
```

### 3. Buffer for Performance

```typescript
const { textStream } = await streamText({
  model: claudeCode('sonnet'),
  prompt,
});

let buffer = '';
for await (const chunk of textStream) {
  buffer += chunk;

  // Update UI every 100ms instead of every chunk
  if (buffer.length > 50) {
    updateUI(buffer);
    buffer = '';
  }
}

if (buffer) {
  updateUI(buffer);
}
```

## Next Steps

- [Tool Calling](./tools) - Add tools to streaming
- [Extended Thinking](./thinking) - Stream reasoning
- [Multi-Turn Conversations](./conversations) - Stream conversations
