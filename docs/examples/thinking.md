# Extended Thinking

Learn how to use Claude Opus 4's extended thinking capabilities for complex reasoning tasks.

## Basic Extended Thinking

Enable reasoning for complex problems:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text, reasoning } = await generateText({
  model: claudeCode('opus', {
    maxThinkingTokens: 2000,
  }),
  prompt: 'Solve this logic puzzle: Three people are standing in a line...',
});

console.log('Reasoning:', reasoning);
console.log('\nAnswer:', text);
```

## Different Thinking Levels

### Light Thinking (500-1000 tokens)

For moderately complex tasks:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text, reasoning } = await generateText({
  model: claudeCode('opus', {
    maxThinkingTokens: 500,
  }),
  prompt: 'Design a simple REST API for a todo app',
});

console.log('Reasoning:', reasoning);
console.log('Design:', text);
```

### Medium Thinking (1000-1500 tokens)

For complex problems:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text, reasoning } = await generateText({
  model: claudeCode('opus', {
    maxThinkingTokens: 1000,
  }),
  prompt: 'Explain the trade-offs between microservices and monolithic architecture',
});

console.log('Reasoning:', reasoning);
console.log('Explanation:', text);
```

### Deep Thinking (1500-2000 tokens)

For very complex reasoning:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text, reasoning } = await generateText({
  model: claudeCode('opus', {
    maxThinkingTokens: 2000,
  }),
  prompt: 'Design a distributed consensus algorithm for a blockchain network',
});

console.log('Reasoning:', reasoning);
console.log('Design:', text);
```

## Code Architecture

Use extended thinking for code design:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text, reasoning } = await generateText({
  model: claudeCode('opus', {
    maxThinkingTokens: 1500,
  }),
  prompt: `
    Review this code and suggest improvements:

    \`\`\`typescript
    class UserManager {
      private users: any[] = [];

      addUser(user: any) {
        this.users.push(user);
      }

      getUser(id: number) {
        return this.users.find(u => u.id === id);
      }
    }
    \`\`\`
  `,
});

console.log('Reasoning Process:', reasoning);
console.log('\nSuggestions:', text);
```

## Problem Solving

Use thinking for complex problem-solving:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text, reasoning } = await generateText({
  model: claudeCode('opus', {
    maxThinkingTokens: 2000,
  }),
  prompt: `
    You have a 3-gallon jug and a 5-gallon jug.
    How can you measure exactly 4 gallons of water?
  `,
});

console.log('How Claude Thought About It:');
console.log(reasoning);
console.log('\nSolution:');
console.log(text);
```

## Math and Logic

Use thinking for mathematical reasoning:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text, reasoning } = await generateText({
  model: claudeCode('opus', {
    maxThinkingTokens: 1500,
  }),
  prompt: `
    Prove that the sum of the first n odd numbers equals n².
    Provide a mathematical proof.
  `,
});

console.log('Reasoning:', reasoning);
console.log('\nProof:', text);
```

## System Design

Use thinking for architecture decisions:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text, reasoning } = await generateText({
  model: claudeCode('opus', {
    maxThinkingTokens: 2000,
  }),
  prompt: `
    Design a scalable real-time chat system that can handle:
    - 1 million concurrent users
    - Message delivery guarantees
    - Presence indicators
    - Message history

    Consider trade-offs and explain your choices.
  `,
});

console.log('Design Reasoning:', reasoning);
console.log('\nArchitecture:', text);
```

## Debugging Complex Issues

Use thinking to debug:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text, reasoning } = await generateText({
  model: claudeCode('opus', {
    maxThinkingTokens: 1500,
  }),
  prompt: `
    This React component sometimes shows stale data after an update.
    Analyze why this might happen and suggest fixes.

    \`\`\`typescript
    function UserProfile({ userId }) {
      const [user, setUser] = useState(null);

      useEffect(() => {
        fetchUser(userId).then(setUser);
      }, []);

      return <div>{user?.name}</div>;
    }
    \`\`\`
  `,
});

console.log('Analysis:', reasoning);
console.log('\nSolution:', text);
```

## Streaming with Thinking

Stream both thinking and response:

```typescript
import { streamText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { fullStream } = await streamText({
  model: claudeCode('opus', {
    maxThinkingTokens: 1500,
  }),
  prompt: 'Design a caching strategy for a high-traffic API',
});

let reasoning = '';
let response = '';

for await (const event of fullStream) {
  switch (event.type) {
    case 'reasoning-delta':
      reasoning += event.delta;
      console.log('Thinking:', event.delta);
      break;

    case 'text-delta':
      response += event.delta;
      process.stdout.write(event.delta);
      break;

    case 'finish':
      console.log('\n\nComplete reasoning:', reasoning);
      break;
  }
}
```

## Thinking with Tools

Combine extended thinking with tools:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';
import { z } from 'zod';

const { text, reasoning, toolCalls } = await generateText({
  model: claudeCode('opus', {
    maxThinkingTokens: 1500,
  }),
  prompt: 'Research and design a recommendation system for an e-commerce site',
  tools: {
    search: {
      description: 'Search for information',
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

console.log('Research Process:', reasoning);
console.log('\nTool Calls:', toolCalls);
console.log('\nDesign:', text);
```

## Comparative Analysis

Use thinking for comparisons:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const { text, reasoning } = await generateText({
  model: claudeCode('opus', {
    maxThinkingTokens: 2000,
  }),
  prompt: `
    Compare PostgreSQL, MongoDB, and Cassandra for a social media application.
    Consider: scalability, consistency, query patterns, and operational complexity.
  `,
});

console.log('Analysis Process:', reasoning);
console.log('\nComparison:', text);
```

## Complete Example: AI Consultant

Build an AI consultant with extended thinking:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';
import { z } from 'zod';

async function consultAI(problem: string) {
  console.log('Problem:', problem);
  console.log('\nThinking...\n');

  const { text, reasoning, toolCalls } = await generateText({
    model: claudeCode('opus', {
      maxThinkingTokens: 2000,
    }),
    prompt: problem,
    tools: {
      search: {
        description: 'Search for technical information',
        parameters: z.object({
          query: z.string(),
        }),
        execute: async ({ query }) => {
          console.log('🔍 Researching:', query);
          // Your search implementation
          return { results: ['...'] };
        },
      },
      analyze: {
        description: 'Analyze code or architecture',
        parameters: z.object({
          subject: z.string(),
        }),
        execute: async ({ subject }) => {
          console.log('🔬 Analyzing:', subject);
          // Your analysis implementation
          return { insights: ['...'] };
        },
      },
    },
  });

  console.log('\n--- Reasoning Process ---');
  console.log(reasoning);

  if (toolCalls.length > 0) {
    console.log('\n--- Research Performed ---');
    console.log(`Used ${toolCalls.length} tools`);
  }

  console.log('\n--- Recommendation ---');
  console.log(text);

  return { text, reasoning, toolCalls };
}

// Usage
await consultAI(
  'I need to build a real-time analytics dashboard for IoT devices. ' +
  'Suggest the best tech stack and architecture.'
);
```

## Best Practices

### 1. Use for Complex Tasks

```typescript
// Good: Complex problem
const complex = await generateText({
  model: claudeCode('opus', { maxThinkingTokens: 2000 }),
  prompt: 'Design a distributed transaction system',
});

// Bad: Simple question
const simple = await generateText({
  model: claudeCode('opus', { maxThinkingTokens: 2000 }),
  prompt: 'What is 2 + 2?',
});
```

### 2. Adjust Thinking Tokens

```typescript
// Simple analysis: 500 tokens
// Medium complexity: 1000 tokens
// Deep reasoning: 2000 tokens

const model = claudeCode('opus', {
  maxThinkingTokens: 1000, // Balanced
});
```

### 3. Review the Reasoning

```typescript
const { text, reasoning } = await generateText({
  model: claudeCode('opus', { maxThinkingTokens: 1500 }),
  prompt: 'Your complex problem',
});

// Always check the reasoning
if (reasoning) {
  console.log('How it arrived at the answer:', reasoning);
}
```

### 4. Combine with Tools

```typescript
// Use thinking + tools for research-based tasks
const result = await generateText({
  model: claudeCode('opus', { maxThinkingTokens: 1500 }),
  prompt: 'Research and recommend',
  tools: { search, analyze },
});
```

## When to Use Extended Thinking

**Use it for:**
- Complex problem-solving
- System architecture design
- Code review and optimization
- Mathematical proofs
- Research and analysis
- Debugging complex issues

**Don't use it for:**
- Simple questions
- Quick responses
- High-volume tasks
- Real-time chat
- Cost-sensitive operations

## Next Steps

- [Multi-Turn Conversations](./conversations) - Use thinking in conversations
- [Tool Calling](./tools) - Combine thinking with tools
- [Models Guide](/guide/models) - Learn more about Opus
