# @sylphx/ai-sdk-provider-claude-code

Claude Code provider for [Vercel AI SDK](https://sdk.vercel.ai/docs) with **universal tool support** - works with ANY standard Vercel AI SDK tool without MCP servers.

[![npm version](https://badge.fury.io/js/@sylphx%2Fai-sdk-provider-claude-code.svg)](https://www.npmjs.com/package/@sylphx/ai-sdk-provider-claude-code)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Key Features

- 🔧 **Universal Tool Support** - Use ANY Vercel AI SDK tool via XML-based schema translation
- 🚀 **Battle-Tested Streaming** - Custom XML parser with event queue for robust streaming
- 🎯 **Zero MCP Configuration** - Tools executed by Vercel framework, not Claude Code CLI
- 🧠 **Extended Thinking** - Full support for Claude Opus 4's reasoning capabilities
- 📦 **Type-Safe** - Built with strict TypeScript and comprehensive type guards
- ⚡ **AI SDK v5 Ready** - Full `LanguageModelV2` implementation

## 🆚 Why This Provider?

| Feature | @sylphx/ai-sdk-provider-claude-code | Other Providers |
|---------|-----------------------------------|-----------------|
| **Tool Support** | ✅ ANY Vercel AI SDK tool | ❌ MCP servers only |
| **Setup Complexity** | ✅ Zero config | ⚠️ Requires MCP setup |
| **Tool Execution** | ✅ Vercel framework | ⚠️ Separate MCP process |
| **Streaming** | ✅ Custom parser, debugged | ✅ Standard |
| **Type Safety** | ✅ Strict with guards | ✅ Standard TypeScript |

> **The key difference**: While other providers lock you into MCP servers, our provider seamlessly translates standard Vercel AI SDK tools into Claude Code's format, giving you access to the vast AI SDK ecosystem without additional setup.

## 📦 Installation

```bash
npm install @sylphx/ai-sdk-provider-claude-code ai
```

## 🔑 Prerequisites

1. **Claude Code CLI** - Install and authenticate:
   ```bash
   # Install Claude Code CLI
   npm install -g @anthropic-ai/claude-agent-sdk

   # Authenticate (opens browser for OAuth)
   claude
   ```

2. **Claude Pro/Max Subscription** - Required for API access via Claude Code

## 🚀 Quick Start

### Basic Text Generation

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text } = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'Explain quantum computing in simple terms',
});

console.log(text);
```

### Streaming Text

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

### Using Tools (The Magic! ✨)

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

### Extended Thinking (Opus 4)

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

### Streaming with Tools

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
        return { results: [...] };
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

## 🎨 Available Models

```typescript
claudeCode('opus')   // Claude 4.1 Opus - Most capable, extended thinking
claudeCode('sonnet') // Claude 4.5 Sonnet - Balanced performance (default)
claudeCode('haiku')  // Claude 4.5 Haiku - Fastest, most cost-effective
```

## 🔧 Advanced Usage

### Provider Options

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

### Custom System Prompts

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
```

### Multi-Turn Conversations

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
```

## 🏗️ Architecture

### How It Works

1. **Tool Schema Translation** - Converts Vercel AI SDK tool schemas to XML format
2. **XML Parsing** - Custom streaming XML parser handles tool calls in text
3. **Event Queue** - Ensures proper event ordering during streaming
4. **Framework Delegation** - Tool execution handled by Vercel framework
5. **Result Integration** - Tool results formatted and fed back to Claude

### Components

- **`ClaudeCodeLanguageModel`** - Main `LanguageModelV2` implementation
- **`StreamingXMLParser`** - Custom parser for XML-based tool calls
- **`text-based-tools`** - Tool schema → XML translation utilities

### Why XML?

Claude Code CLI uses XML for tool calls. By translating standard JSON schemas to XML, we enable universal tool support without requiring MCP servers.

## 🧪 Examples

Check out the [examples directory](./examples) for more:

- 📝 Simple chat
- 🔧 Tool calling
- 🌊 Streaming
- 🧠 Extended thinking
- 💬 Multi-turn conversations
- 🖼️ Image analysis (coming soon)

## ⚠️ Current Limitations

- 📷 **Image support** - Not yet tested (AI SDK supports it, needs validation)
- 🧪 **Test coverage** - Test suite in development
- ⚙️ **Advanced callbacks** - No `canUseTool` or abort signals yet
- 🚨 **Tool errors** - Basic error handling (no specialized tool-error events)

## 🗺️ Roadmap

- [ ] Add comprehensive test suite
- [ ] Validate and document image support
- [ ] Add tool execution callbacks
- [ ] Implement AbortSignal support
- [ ] Add specialized error events
- [ ] Performance benchmarks
- [ ] More examples

## 🤝 Contributing

Contributions welcome! Please read our [contributing guidelines](./CONTRIBUTING.md) first.

## 📄 License

MIT © 2025 Sylph X Ltd

## 🙏 Acknowledgments

- Built with [Vercel AI SDK](https://sdk.vercel.ai)
- Powered by [Claude Code CLI](https://www.anthropic.com/claude/code)
- Inspired by the AI SDK community

## 📚 Related

- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs)
- [Claude Code CLI](https://www.anthropic.com/claude/code)
- [AI SDK Providers](https://sdk.vercel.ai/providers)

## 🆘 Support

- 📖 [Documentation](https://github.com/SylphxAI/ai-sdk-provider-claude-code#readme)
- 🐛 [Issue Tracker](https://github.com/SylphxAI/ai-sdk-provider-claude-code/issues)
- 💬 [Discussions](https://github.com/SylphxAI/ai-sdk-provider-claude-code/discussions)

---

**Made with ❤️ by [Sylph X Ltd](https://github.com/SylphxAI)**

If you find this provider helpful, please consider giving it a ⭐ on GitHub!
