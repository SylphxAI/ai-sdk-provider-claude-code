# Examples

This section provides practical examples of using the Claude Code provider with the Vercel AI SDK.

## Overview

The examples are organized by use case and complexity level. Each example includes complete code and explanations.

## Quick Navigation

- [Basic Text Generation](./basic-text) - Simple text generation
- [Streaming](./streaming) - Real-time text streaming
- [Tool Calling](./tools) - Universal tool support
- [Extended Thinking](./thinking) - Opus 4 reasoning
- [Multi-Turn Conversations](./conversations) - Conversation management

## Example Categories

### Getting Started

Perfect for newcomers:

- **Basic Text Generation** - Your first Claude Code request
- **Streaming** - Enable real-time responses
- **Simple Tools** - Add tool support

### Intermediate

Build production features:

- **Multi-Turn Conversations** - Maintain context
- **Advanced Tools** - Complex tool orchestration
- **Error Handling** - Robust error management

### Advanced

Expert patterns:

- **Extended Thinking** - Complex reasoning with Opus
- **Streaming Tools** - Tools + streaming combined
- **Custom Workflows** - Build AI agents

## Common Patterns

### Text Generation

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text } = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'Your prompt here',
});
```

### Streaming

```typescript
import { streamText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { textStream } = await streamText({
  model: claudeCode('sonnet'),
  prompt: 'Your prompt here',
});

for await (const chunk of textStream) {
  process.stdout.write(chunk);
}
```

### Tool Calling

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';
import { z } from 'zod';

const { text } = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'Use the tool',
  tools: {
    myTool: {
      description: 'Tool description',
      parameters: z.object({
        param: z.string(),
      }),
      execute: async ({ param }) => {
        return { result: 'value' };
      },
    },
  },
});
```

## Running the Examples

All examples assume you have:

1. **Installed dependencies:**
   ```bash
   npm install @sylphx/ai-sdk-provider-claude-code ai zod
   ```

2. **Authenticated with Claude Code:**
   ```bash
   npm install -g @anthropic-ai/claude-agent-sdk
   claude
   ```

3. **Set up TypeScript (optional):**
   ```bash
   npm install -D tsx typescript
   ```

### Run an Example

```bash
# Save example to file
# example.ts

# Run with tsx
npx tsx example.ts

# Or with Node.js
node --loader tsx example.ts
```

## Code Repository

Find complete, runnable examples in the [examples directory](https://github.com/SylphxAI/ai-sdk-provider-claude-code/tree/main/examples) of the repository.

## Need Help?

- Check the [Usage Guide](/guide/usage) for common patterns
- See [API Reference](/api/) for detailed documentation
- Open an issue on [GitHub](https://github.com/SylphxAI/ai-sdk-provider-claude-code/issues)

## Next Steps

Start with [Basic Text Generation](./basic-text) or jump to a specific example:

- [Streaming](./streaming) - Real-time responses
- [Tool Calling](./tools) - Add capabilities
- [Extended Thinking](./thinking) - Complex reasoning
- [Multi-Turn Conversations](./conversations) - Build chat apps
