---
layout: home

hero:
  name: "Claude Code Provider"
  text: "Universal Tool Support"
  tagline: Vercel AI SDK provider for Claude Code - ANY tool without MCP servers
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: View on GitHub
      link: https://github.com/SylphxAI/ai-sdk-provider-claude-code
    - theme: alt
      text: Examples
      link: /examples/

features:
  - icon: 🔧
    title: Universal Tool Support
    details: Use ANY Vercel AI SDK tool without requiring MCP servers. Automatic JSON to XML schema translation for seamless integration.

  - icon: ⚡
    title: Zero Configuration
    details: No MCP server setup needed. Simple npm install and you're ready to go with the entire Vercel AI SDK ecosystem.

  - icon: 🚀
    title: Battle-Tested Streaming
    details: Custom XML parser with event queue ensures robust streaming and proper tool call handling.

  - icon: 🧠
    title: Extended Thinking
    details: Full Claude Opus 4 reasoning support with configurable thinking tokens for complex problem-solving.

  - icon: 📦
    title: Type-Safe
    details: Strict TypeScript with comprehensive type guards. Full LanguageModelV2 implementation for AI SDK v5.

  - icon: 🎯
    title: Framework Integration
    details: Tools are executed by the Vercel framework, not the CLI. Seamless integration with your existing workflow.
---

## Quick Example

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';
import { z } from 'zod';

const { text, toolCalls } = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'What is the weather in San Francisco?',
  tools: {
    getWeather: {
      description: 'Get the weather for a location',
      parameters: z.object({
        city: z.string().describe('The city name'),
      }),
      execute: async ({ city }) => {
        return {
          city,
          temperature: 72,
          condition: 'sunny',
        };
      },
    },
  },
});
```

**No MCP server needed!** The tool is automatically converted and integrated.

## Why This Provider?

| Feature | This Provider | Other Providers |
|---------|---------------|-----------------|
| **Tool Ecosystem** | ✅ ANY Vercel AI SDK tool | ❌ MCP servers only |
| **Setup** | ✅ Zero config | ⚠️ MCP server setup |
| **Tool Execution** | ✅ Vercel framework | ⚠️ Separate MCP process |
| **Schema Format** | ✅ Auto XML translation | ⚠️ Manual MCP schemas |
| **Streaming** | ✅ Custom debugged parser | ✅ Standard |
| **Type Safety** | ✅ Strict + guards | ✅ Standard TS |

## Installation

```bash
npm install @sylphx/ai-sdk-provider-claude-code ai
```

## Prerequisites

### Claude Code CLI

```bash
# Install Claude Code CLI
npm install -g @anthropic-ai/claude-agent-sdk

# Authenticate (opens browser for OAuth)
claude
```

### Subscription

- **Claude Pro** or **Claude Max** subscription required for API access

## Get Started

Ready to build with Claude Code? Check out the [Getting Started Guide](/guide/) or explore [Examples](/examples/).
