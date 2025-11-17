# Architecture

This guide explains how the Claude Code provider works internally and why it's different from other providers.

## Overview

The Claude Code provider bridges the gap between the Vercel AI SDK's JSON-based tool system and Claude Code CLI's XML-based tool format. This enables universal tool support without requiring MCP servers.

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

## Core Components

### ClaudeCodeLanguageModel

The main `LanguageModelV2` implementation that provides:

- Model configuration and initialization
- Request/response handling
- Integration with AI SDK interfaces
- Tool schema management

### StreamingXMLParser

Custom parser for handling Claude Code's XML-based streaming format:

- Real-time XML parsing
- Event queue management
- Tool call extraction
- Error handling

### text-based-tools

Utilities for translating tool schemas:

- JSON Schema to XML conversion
- Parameter validation
- Type mapping
- Description formatting

### Event Queue

Ensures proper ordering of streaming events:

- Text chunks
- Tool calls
- Thinking tokens
- Error messages

## Why XML?

Claude Code CLI uses XML for tool calls instead of JSON. This is a design choice by Anthropic for the CLI interface.

**Traditional approach:**
```
Tool → MCP Server → MCP Protocol → Claude Code CLI
```

**Our approach:**
```
Tool → XML Translation → Claude Code CLI
(No MCP server needed!)
```

By automatically translating JSON schemas to XML, we enable universal tool support without additional infrastructure.

## Schema Translation

### Input: Vercel AI SDK Tool

```typescript
{
  description: 'Get the weather for a location',
  parameters: z.object({
    city: z.string().describe('The city name'),
    units: z.enum(['celsius', 'fahrenheit']),
  }),
  execute: async ({ city, units }) => { /* ... */ }
}
```

### Output: XML Format

```xml
<tool name="getWeather">
  <description>Get the weather for a location</description>
  <parameters>
    <parameter name="city" type="string" required="true">
      <description>The city name</description>
    </parameter>
    <parameter name="units" type="string" required="true">
      <description>Temperature units (celsius or fahrenheit)</description>
    </parameter>
  </parameters>
</tool>
```

## Streaming Implementation

### Challenge

Claude Code CLI streams responses in XML format with:
- Text content
- Tool calls
- Thinking tokens
- Metadata

All interleaved in a single stream.

### Solution

Custom XML parser with:
1. **Chunk-by-chunk parsing** - Process XML as it arrives
2. **Event queue** - Maintain proper event ordering
3. **State management** - Track parsing context
4. **Error recovery** - Handle malformed XML gracefully

### Event Flow

```
Stream → Parser → Event Queue → AI SDK Consumer

Events:
- text-delta
- tool-call
- tool-call-delta
- finish
- error
```

## Tool Execution Flow

### 1. Tool Call Received

Claude decides to use a tool and emits XML:

```xml
<tool_use>
  <tool_name>getWeather</tool_name>
  <parameters>
    <city>San Francisco</city>
    <units>celsius</units>
  </parameters>
</tool_use>
```

### 2. Parser Extracts Tool Call

The XML parser extracts:
- Tool name
- Parameters
- Call ID

### 3. Framework Executes Tool

Vercel AI SDK framework calls the tool's `execute` function:

```typescript
const result = await tools.getWeather.execute({
  city: 'San Francisco',
  units: 'celsius'
});
```

### 4. Result Formatted

Result is formatted for Claude:

```xml
<tool_result>
  <tool_name>getWeather</tool_name>
  <result>
    {"city": "San Francisco", "temperature": 18, "condition": "sunny"}
  </result>
</tool_result>
```

### 5. Claude Processes Result

Claude receives the result and continues generating a response.

## Type Safety

The provider uses TypeScript strict mode with comprehensive type guards:

### Input Validation

```typescript
function validateToolCall(call: unknown): ToolCall {
  if (!isObject(call)) {
    throw new Error('Invalid tool call');
  }
  if (typeof call.name !== 'string') {
    throw new Error('Tool call missing name');
  }
  // ... more validation
  return call as ToolCall;
}
```

### Type Inference

```typescript
type ToolParameters<T extends z.ZodType> = z.infer<T>;

const weatherTool = {
  parameters: z.object({
    city: z.string(),
  }),
  execute: async (params: ToolParameters<typeof weatherTool.parameters>) => {
    // params.city is typed as string
  }
};
```

## Extended Thinking

For Claude Opus 4, the provider supports extended thinking:

### Configuration

```typescript
claudeCode('opus', {
  maxThinkingTokens: 2000
})
```

### Streaming Thinking Tokens

```xml
<thinking>
  Let me analyze this problem step by step...
</thinking>
```

### Result

```typescript
{
  text: 'The answer is...',
  reasoning: 'Let me analyze this problem step by step...'
}
```

## Performance Considerations

### Streaming

Streaming is more efficient for:
- Long responses
- User-facing applications
- Real-time feedback

### Batching

Non-streaming is better for:
- Batch processing
- When you need the complete response
- Background tasks

### Memory

The provider maintains:
- Minimal state per request
- Event queue for ordering
- No persistent connections

## Limitations

Current limitations of the architecture:

1. **Image support** - Not yet tested (AI SDK supports it)
2. **Abort signals** - Not implemented
3. **Tool callbacks** - No `canUseTool` support yet
4. **Error specialization** - Basic error handling

See the [roadmap](https://github.com/SylphxAI/ai-sdk-provider-claude-code#-roadmap) for planned improvements.

## Comparison with MCP Approach

### MCP Approach

```
Pros:
- Standardized protocol
- Server-side tool management
- Tool reusability across apps

Cons:
- Requires MCP server setup
- Additional process management
- Limited to MCP ecosystem
- More complex architecture
```

### This Provider

```
Pros:
- Zero server setup
- Direct AI SDK integration
- Access to entire AI SDK ecosystem
- Simpler architecture

Cons:
- Tools must be defined in app
- No server-side tool management
- Requires schema translation
```

## Tech Stack

| Component | Technology |
|-----------|------------|
| **Language** | TypeScript (strict mode) |
| **AI SDK** | Vercel AI SDK v5 |
| **Runtime** | Node.js / Bun |
| **Schema Validation** | Zod |
| **Claude Integration** | Claude Code CLI |
| **Type Safety** | Comprehensive type guards |

## Next Steps

- [API Reference](/api/) - Detailed API documentation
- [Examples](/examples/) - See the architecture in action
- [Contributing](https://github.com/SylphxAI/ai-sdk-provider-claude-code#-contributing) - Help improve the provider
