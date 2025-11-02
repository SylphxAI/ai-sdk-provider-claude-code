# Examples

This directory contains example usage of the Claude Code provider.

## Setup

```bash
# Install dependencies
npm install

# Make sure you're authenticated with Claude Code CLI
claude
```

## Running Examples

### Basic Text Generation

```bash
npx tsx basic.ts
```

### Streaming Text

```bash
npx tsx streaming.ts
```

### Tool Calling

```bash
npx tsx tools.ts
```

### Extended Thinking (Opus 4)

```bash
npx tsx thinking.ts
```

## Notes

- All examples require an active Claude Pro/Max subscription
- Make sure Claude Code CLI is authenticated before running
- Examples use TypeScript - install `tsx` to run them directly:
  ```bash
  npm install -g tsx
  ```
