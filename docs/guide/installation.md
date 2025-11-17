# Installation

This guide will walk you through installing and setting up the Claude Code provider for Vercel AI SDK.

## Prerequisites

Before installing the provider, you'll need:

1. **Node.js** - Version 18.0.0 or higher
2. **Claude Pro or Claude Max** - Subscription required for API access
3. **Claude Code CLI** - Command-line interface for Claude

## Step 1: Install Claude Code CLI

First, install the Claude Code CLI globally:

```bash
npm install -g @anthropic-ai/claude-agent-sdk
```

## Step 2: Authenticate

Authenticate with Claude Code (this will open a browser window for OAuth):

```bash
claude
```

Follow the authentication flow in your browser to complete the setup.

## Step 3: Install the Provider

Install the Claude Code provider and the Vercel AI SDK:

```bash
npm install @sylphx/ai-sdk-provider-claude-code ai
```

### Package Details

- `@sylphx/ai-sdk-provider-claude-code` - The Claude Code provider
- `ai` - Vercel AI SDK (required peer dependency)

## Step 4: Verify Installation

Create a simple test file to verify everything is working:

```typescript
// test.ts
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text } = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'Say hello!',
});

console.log(text);
```

Run it:

```bash
npx tsx test.ts
# or
node --loader tsx test.ts
```

If you see a response from Claude, you're all set!

## TypeScript Setup

If you're using TypeScript, make sure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

## Project Structure

For a typical project, your structure might look like:

```
my-ai-app/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts
│   └── tools/
│       └── weather.ts
└── node_modules/
```

## Additional Dependencies

Depending on your use case, you might want to install:

### For Tool Parameters

```bash
npm install zod
```

Zod is used for defining and validating tool parameters:

```typescript
import { z } from 'zod';

const weatherTool = {
  description: 'Get weather',
  parameters: z.object({
    city: z.string(),
  }),
  execute: async ({ city }) => { /* ... */ }
};
```

### For Advanced Features

```bash
npm install @ai-sdk/provider
```

The provider package includes additional type definitions and utilities for building custom providers.

## Troubleshooting

### CLI Not Found

If `claude` command is not found after installation:

```bash
# Reinstall globally
npm install -g @anthropic-ai/claude-agent-sdk

# Check if it's in your PATH
which claude
```

### Authentication Issues

If authentication fails:

1. Make sure you have an active Claude Pro or Claude Max subscription
2. Try clearing your authentication and re-authenticating:

```bash
# Clear auth (location varies by OS)
rm -rf ~/.config/claude-code/auth

# Re-authenticate
claude
```

### Module Resolution Errors

If you get module resolution errors:

1. Ensure you're using Node.js 18+
2. Check that your `package.json` has `"type": "module"`
3. Verify TypeScript configuration matches the example above

### API Errors

If you get API errors during usage:

1. Verify your Claude subscription is active
2. Check that you're authenticated with `claude`
3. Ensure the CLI can connect to Claude's servers

## Next Steps

Now that you've installed the provider, learn how to use it:

- [Usage Guide](./usage) - Common usage patterns
- [Models](./models) - Available models
- [Examples](/examples/) - Example code
