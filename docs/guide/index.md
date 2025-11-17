# Getting Started

Welcome to the Claude Code provider for Vercel AI SDK! This guide will help you get started with using Claude Code in your AI applications.

## Overview

The Claude Code provider enables you to use Claude models through the Vercel AI SDK with a unique advantage: **universal tool support without MCP servers**.

### The Problem

Traditional Claude integrations require MCP (Model Context Protocol) servers for tool support:

- Must configure MCP servers for each tool ❌
- Separate MCP process management ❌
- Limited to MCP ecosystem ❌
- Complex setup and maintenance ❌

### The Solution

This provider gives you direct access to the Vercel AI SDK ecosystem:

- Use ANY Vercel AI SDK tool ✅
- Zero MCP configuration ✅
- Tools executed by Vercel framework ✅
- Simple npm install, ready to go ✅

## Key Features

### Universal Tool Support

Seamlessly translates standard Vercel AI SDK tools into Claude Code's XML format, giving you access to the vast AI SDK ecosystem without additional setup.

### Battle-Tested Streaming

Custom XML parser with event queue ensures robust streaming and proper handling of tool calls during streaming operations.

### Framework Integration

Tools are executed by the Vercel AI SDK framework, not the CLI. This means you get all the benefits of the AI SDK's tool execution model.

### Extended Thinking

Full support for Claude Opus 4's extended thinking capabilities. Configure thinking tokens to enable complex reasoning.

### Type Safety

Built with TypeScript strict mode and comprehensive type guards. Full `LanguageModelV2` implementation for AI SDK v5 compatibility.

## Installation

Follow the [Installation Guide](./installation) to set up the provider.

## Basic Usage

Here's a simple example to get you started:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text } = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'Explain quantum computing in simple terms',
});

console.log(text);
```

For more examples, see the [Usage Guide](./usage) and [Examples](/examples/).

## How It Works

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

Learn more in the [Architecture Guide](./architecture).

## Next Steps

- [Installation](./installation) - Set up the provider
- [Usage Guide](./usage) - Learn common patterns
- [Models](./models) - Choose the right model
- [Examples](/examples/) - See it in action
