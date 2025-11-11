<div align="center">

# Claude Code Provider ⚡

**Vercel AI SDK provider for Claude Code - Universal tool support without MCP servers**

[![npm version](https://img.shields.io/npm/v/@sylphx/ai-sdk-provider-claude-code?style=flat-square)](https://www.npmjs.com/package/@sylphx/ai-sdk-provider-claude-code)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)

**ANY Vercel AI SDK tool** • **Zero MCP setup** • **Robust streaming** • **Extended thinking**

[Quick Start](#-quick-start) • [Examples](#-examples) • [Docs](#-architecture)

</div>

---

## 🚀 Overview

Claude Code provider for [Vercel AI SDK](https://sdk.vercel.ai/docs) - the only provider that works with ANY standard Vercel AI SDK tool without requiring MCP servers.

**The Problem:**
```typescript
// Other providers: Locked into MCP servers
- Must configure MCP servers for each tool ❌
- Separate MCP process management ❌
- Limited to MCP ecosystem ❌
- Complex setup and maintenance ❌
```

**The Solution:**
```typescript
// @sylphx/ai-sdk-provider-claude-code
- Use ANY Vercel AI SDK tool ✅
- Zero MCP configuration ✅
- Tools executed by Vercel framework ✅
- Simple npm install, ready to go ✅
```

**Result: Access the entire Vercel AI SDK ecosystem with zero setup complexity.**

---

## ✨ Key Features

### Universal Tool Support

| Feature | This Provider | Other Providers |
|---------|---------------|-----------------|
| **Tool Ecosystem** | ✅ ANY Vercel AI SDK tool | ❌ MCP servers only |
| **Setup** | ✅ Zero config | ⚠️ MCP server setup |
| **Tool Execution** | ✅ Vercel framework | ⚠️ Separate MCP process |
| **Schema Format** | ✅ Auto XML translation | ⚠️ Manual MCP schemas |
| **Streaming** | ✅ Custom debugged parser | ✅ Standard |
| **Type Safety** | ✅ Strict + guards | ✅ Standard TS |

> **The key difference**: Seamlessly translates standard Vercel AI SDK tools into Claude Code's XML format, giving you access to the vast AI SDK ecosystem without additional setup.

### Technical Highlights

- 🔧 **XML-based Schema Translation** - Automatic conversion from JSON to XML
- 🚀 **Battle-Tested Streaming** - Custom XML parser with event queue
- 🎯 **Framework Integration** - Tools executed by Vercel, not CLI
- 🧠 **Extended Thinking** - Full Claude Opus 4 reasoning support
- 📦 **Type-Safe** - Strict TypeScript with comprehensive guards
- ⚡ **AI SDK v5 Ready** - Full `LanguageModelV2` implementation

---

## 📦 Installation

```bash
npm install @sylphx/ai-sdk-provider-claude-code ai
```

---

## 🔑 Prerequisites

### 1. Claude Code CLI

```bash
# Install Claude Code CLI
npm install -g @anthropic-ai/claude-agent-sdk

# Authenticate (opens browser for OAuth)
claude
```

### 2. Subscription

- **Claude Pro** or **Claude Max** subscription required for API access

---

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

### Universal Tool Support (The Magic! ✨)

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

---

## 🎨 Available Models

```typescript
claudeCode('opus')   // Claude 4.1 Opus - Most capable, extended thinking
claudeCode('sonnet') // Claude 4.5 Sonnet - Balanced performance (default)
claudeCode('haiku')  // Claude 4.5 Haiku - Fastest, most cost-effective
```

**Model Comparison:**

| Model | Capability | Speed | Use Cases |
|-------|-----------|-------|-----------|
| **Opus** | Highest | Slower | Complex reasoning, extended thinking |
| **Sonnet** | Balanced | Medium | General purpose, production apps |
| **Haiku** | Good | Fastest | Simple tasks, cost optimization |

---

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

---

## 🏗️ Architecture

### How It Works

```
┌─────────────────────────────────────────────────────────┐
│ 1. Vercel AI SDK Tool (Standard JSON Schema)           │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│ 2. Schema Translation (JSON → XML)                     │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│ 3. Claude Code CLI (XML-based tool calls)              │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│ 4. Custom XML Parser (Stream processing + Event queue) │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│ 5. Tool Execution (Vercel framework handles)           │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│ 6. Result Integration (Format & feed back to Claude)   │
└─────────────────────────────────────────────────────────┘
```

### Core Components

| Component | Purpose |
|-----------|---------|
| **ClaudeCodeLanguageModel** | Main `LanguageModelV2` implementation |
| **StreamingXMLParser** | Custom parser for XML-based tool calls |
| **text-based-tools** | Tool schema → XML translation utilities |
| **Event Queue** | Ensures proper streaming event ordering |

### Why XML?

Claude Code CLI uses XML for tool calls. By translating standard JSON schemas to XML, we enable universal tool support without requiring MCP servers.

**Traditional approach:**
```
Tool → MCP Server → MCP Protocol → Claude Code CLI
```

**Our approach:**
```
Tool → XML Translation → Claude Code CLI
(No MCP server needed!)
```

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Language** | TypeScript (strict mode) |
| **AI SDK** | Vercel AI SDK v5 |
| **Runtime** | Node.js / Bun |
| **Schema Validation** | Zod |
| **Claude Integration** | Claude Code CLI |
| **Type Safety** | Comprehensive type guards |

---

## 🧪 Examples

Check out the [examples directory](./examples) for more:

- 📝 **Simple chat** - Basic text generation
- 🔧 **Tool calling** - Universal tool support
- 🌊 **Streaming** - Real-time text streaming
- 🧠 **Extended thinking** - Opus 4 reasoning
- 💬 **Multi-turn** - Conversation management
- 🖼️ **Image analysis** - Coming soon

---

## 🎯 Use Cases

### AI Assistant Development
Build powerful AI assistants with tool support:
- **Web search** - Real-time information retrieval
- **File operations** - Read, write, manage files
- **API integration** - Call any REST API
- **Data processing** - JSON, XML, Base64 operations

### Production Applications
Deploy robust AI-powered apps:
- **Customer support bots** - With tool access
- **Code assistants** - With file system tools
- **Research tools** - With web search
- **Data analysis** - With computation tools

### Rapid Prototyping
Quickly build AI features:
- **Mix and match tools** - From Vercel AI SDK ecosystem
- **Zero config** - No MCP setup needed
- **Type-safe** - Catch errors at compile time

---

## ⚠️ Current Limitations

- 📷 **Image support** - Not yet tested (AI SDK supports it, needs validation)
- 🧪 **Test coverage** - Test suite in development
- ⚙️ **Advanced callbacks** - No `canUseTool` or abort signals yet
- 🚨 **Tool errors** - Basic error handling (no specialized tool-error events)

---

## 🗺️ Roadmap

**🚀 Planned**
- [ ] Add comprehensive test suite
- [ ] Validate and document image support
- [ ] Add tool execution callbacks (`canUseTool`)
- [ ] Implement AbortSignal support
- [ ] Add specialized error events
- [ ] Performance benchmarks
- [ ] More examples and tutorials
- [ ] Support for streaming tool results

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch** - `git checkout -b feature/my-feature`
3. **Write tests** - Ensure good coverage
4. **Follow TypeScript strict mode** - Type safety first
5. **Add documentation** - Update README if needed
6. **Submit a pull request**

### Code Style

- Use **TypeScript strict mode**
- Follow **Vercel AI SDK** patterns
- Write **comprehensive type guards**
- Add **JSDoc comments** for public APIs

---

## 🤝 Support

[![npm](https://img.shields.io/npm/v/@sylphx/ai-sdk-provider-claude-code?style=flat-square)](https://www.npmjs.com/package/@sylphx/ai-sdk-provider-claude-code)
[![GitHub Issues](https://img.shields.io/github/issues/SylphxAI/ai-sdk-provider-claude-code?style=flat-square)](https://github.com/SylphxAI/ai-sdk-provider-claude-code/issues)

- 🐛 [Bug Reports](https://github.com/SylphxAI/ai-sdk-provider-claude-code/issues)
- 💬 [Discussions](https://github.com/SylphxAI/ai-sdk-provider-claude-code/discussions)
- 📧 [Email](mailto:hi@sylphx.com)

**Show Your Support:**
⭐ Star • 👀 Watch • 🐛 Report bugs • 💡 Suggest features • 🔀 Contribute

---

## 📄 License

MIT © [Sylphx](https://sylphx.com)

---

## 🙏 Credits

Built with:
- [Vercel AI SDK](https://sdk.vercel.ai) - AI framework
- [Claude Code CLI](https://www.anthropic.com/claude/code) - Claude integration
- [Zod](https://zod.dev) - Schema validation

Special thanks to the AI SDK community ❤️

---

## 📚 Related

- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs)
- [Claude Code CLI](https://www.anthropic.com/claude/code)
- [AI SDK Providers](https://sdk.vercel.ai/providers)
- [Anthropic API Docs](https://docs.anthropic.com)

---

<p align="center">
  <strong>Universal tools. Zero setup. Production-ready.</strong>
  <br>
  <sub>The Claude Code provider that works with ANY Vercel AI SDK tool</sub>
  <br><br>
  <a href="https://sylphx.com">sylphx.com</a> •
  <a href="https://x.com/SylphxAI">@SylphxAI</a> •
  <a href="mailto:hi@sylphx.com">hi@sylphx.com</a>
</p>
