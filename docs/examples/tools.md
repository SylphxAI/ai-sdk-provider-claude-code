# Tool Calling

Learn how to use tools with the Claude Code provider - the key feature that sets it apart.

## Universal Tool Support

The Claude Code provider's magic: use ANY Vercel AI SDK tool without MCP servers!

## Simple Tool

Define and use a basic tool:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';
import { z } from 'zod';

const { text, toolCalls } = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'What is the weather in San Francisco?',
  tools: {
    getWeather: {
      description: 'Get the current weather for a location',
      parameters: z.object({
        city: z.string().describe('The city name'),
      }),
      execute: async ({ city }) => {
        // Your weather API call here
        return {
          city,
          temperature: 72,
          condition: 'sunny',
          humidity: 65,
        };
      },
    },
  },
});

console.log('Tool calls:', toolCalls);
console.log('Response:', text);
```

**No MCP server needed!** The tool is automatically converted to XML and integrated.

## Multiple Tools

Use multiple tools together:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';
import { z } from 'zod';

const { text, toolCalls } = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'Get the weather in Tokyo and convert 25°C to Fahrenheit',
  tools: {
    getWeather: {
      description: 'Get weather for a city',
      parameters: z.object({
        city: z.string(),
      }),
      execute: async ({ city }) => ({
        city,
        temperature: 25,
        condition: 'cloudy',
      }),
    },
    convertTemperature: {
      description: 'Convert temperature between units',
      parameters: z.object({
        value: z.number(),
        from: z.enum(['celsius', 'fahrenheit']),
        to: z.enum(['celsius', 'fahrenheit']),
      }),
      execute: async ({ value, from, to }) => {
        if (from === 'celsius' && to === 'fahrenheit') {
          return { result: (value * 9/5) + 32 };
        }
        if (from === 'fahrenheit' && to === 'celsius') {
          return { result: (value - 32) * 5/9 };
        }
        return { result: value };
      },
    },
  },
});

console.log('Tool calls:', toolCalls);
console.log('Response:', text);
```

## Complex Tool Parameters

Use complex parameter schemas:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';
import { z } from 'zod';

const { text } = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'Search for TypeScript articles published this week',
  tools: {
    search: {
      description: 'Search for articles',
      parameters: z.object({
        query: z.string().describe('Search query'),
        filters: z.object({
          dateRange: z.object({
            start: z.string().describe('Start date (ISO 8601)'),
            end: z.string().describe('End date (ISO 8601)'),
          }).optional(),
          tags: z.array(z.string()).optional(),
          author: z.string().optional(),
        }).optional(),
        limit: z.number().min(1).max(100).default(10),
      }),
      execute: async ({ query, filters, limit }) => {
        // Your search implementation
        return {
          results: [
            { title: 'TypeScript 5.0 Released', url: '...' },
            { title: 'Advanced TypeScript Patterns', url: '...' },
          ],
          count: 2,
        };
      },
    },
  },
});
```

## Streaming with Tools

Combine streaming with tool calls:

```typescript
import { streamText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';
import { z } from 'zod';

const { textStream, toolCallStreams } = await streamText({
  model: claudeCode('sonnet'),
  prompt: 'Search for AI news and summarize the top result',
  tools: {
    search: {
      description: 'Search for news articles',
      parameters: z.object({
        query: z.string(),
      }),
      execute: async ({ query }) => ({
        results: [
          { title: 'AI Breakthrough', content: '...' },
        ],
      }),
    },
  },
});

// Handle tool calls
for await (const toolCall of toolCallStreams) {
  console.log('Tool called:', toolCall);
}

// Stream text response
for await (const chunk of textStream) {
  process.stdout.write(chunk);
}
```

## Real-World Tool: Web Search

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';
import { z } from 'zod';

const { text } = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'What are the latest developments in quantum computing?',
  tools: {
    webSearch: {
      description: 'Search the web for information',
      parameters: z.object({
        query: z.string().describe('Search query'),
        numResults: z.number().optional().describe('Number of results (1-10)'),
      }),
      execute: async ({ query, numResults = 5 }) => {
        // Use your favorite search API
        // e.g., Google Custom Search, Bing, etc.
        const results = await fetch(
          `https://api.search.example/search?q=${encodeURIComponent(query)}&n=${numResults}`
        ).then(r => r.json());

        return {
          query,
          results: results.items.map((item: any) => ({
            title: item.title,
            snippet: item.snippet,
            url: item.url,
          })),
        };
      },
    },
  },
});

console.log(text);
```

## Real-World Tool: File Operations

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';
import { z } from 'zod';
import { readFile, writeFile } from 'fs/promises';

const { text } = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'Read package.json and tell me the version',
  tools: {
    readFile: {
      description: 'Read a file from the filesystem',
      parameters: z.object({
        path: z.string().describe('File path'),
      }),
      execute: async ({ path }) => {
        const content = await readFile(path, 'utf-8');
        return { path, content };
      },
    },
    writeFile: {
      description: 'Write content to a file',
      parameters: z.object({
        path: z.string().describe('File path'),
        content: z.string().describe('File content'),
      }),
      execute: async ({ path, content }) => {
        await writeFile(path, content, 'utf-8');
        return { path, success: true };
      },
    },
  },
});

console.log(text);
```

## Real-World Tool: API Integration

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';
import { z } from 'zod';

const { text } = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'Create a GitHub issue for the bug I described',
  tools: {
    createGitHubIssue: {
      description: 'Create a GitHub issue',
      parameters: z.object({
        repo: z.string().describe('Repository (owner/name)'),
        title: z.string().describe('Issue title'),
        body: z.string().describe('Issue description'),
        labels: z.array(z.string()).optional(),
      }),
      execute: async ({ repo, title, body, labels }) => {
        const [owner, repoName] = repo.split('/');

        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repoName}/issues`,
          {
            method: 'POST',
            headers: {
              'Authorization': `token ${process.env.GITHUB_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, body, labels }),
          }
        );

        const issue = await response.json();
        return {
          url: issue.html_url,
          number: issue.number,
        };
      },
    },
  },
});

console.log(text);
```

## Tool Result Formatting

Format tool results for better AI understanding:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';
import { z } from 'zod';

const { text } = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'Get user info for ID 123',
  tools: {
    getUserInfo: {
      description: 'Get information about a user',
      parameters: z.object({
        userId: z.number(),
      }),
      execute: async ({ userId }) => {
        // Fetch user from database
        const user = await db.users.findById(userId);

        // Return structured, descriptive data
        return {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            lastLogin: user.lastLogin,
          },
          metadata: {
            fetchedAt: new Date().toISOString(),
            source: 'database',
          },
        };
      },
    },
  },
});
```

## Error Handling in Tools

Handle tool execution errors:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';
import { z } from 'zod';

const { text } = await generateText({
  model: claudeCode('sonnet'),
  prompt: 'Fetch data from the API',
  tools: {
    fetchData: {
      description: 'Fetch data from external API',
      parameters: z.object({
        endpoint: z.string(),
      }),
      execute: async ({ endpoint }) => {
        try {
          const response = await fetch(endpoint);

          if (!response.ok) {
            return {
              error: true,
              message: `API returned ${response.status}`,
              status: response.status,
            };
          }

          const data = await response.json();
          return {
            success: true,
            data,
          };
        } catch (error) {
          return {
            error: true,
            message: error instanceof Error ? error.message : 'Unknown error',
          };
        }
      },
    },
  },
});
```

## Complete Example: AI Agent

Build a complete AI agent with multiple tools:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';
import { z } from 'zod';

async function runAgent(task: string) {
  const { text, toolCalls } = await generateText({
    model: claudeCode('sonnet'),
    prompt: task,
    tools: {
      search: {
        description: 'Search the web',
        parameters: z.object({
          query: z.string(),
        }),
        execute: async ({ query }) => {
          console.log('🔍 Searching:', query);
          // Your search implementation
          return { results: ['...'] };
        },
      },
      calculate: {
        description: 'Perform calculations',
        parameters: z.object({
          expression: z.string(),
        }),
        execute: async ({ expression }) => {
          console.log('🧮 Calculating:', expression);
          // Your calculation implementation
          return { result: eval(expression) };
        },
      },
      saveNote: {
        description: 'Save a note',
        parameters: z.object({
          content: z.string(),
        }),
        execute: async ({ content }) => {
          console.log('📝 Saving note:', content.substring(0, 50));
          // Your save implementation
          return { saved: true };
        },
      },
    },
  });

  console.log('\n📊 Tool Calls:', toolCalls.length);
  console.log('💬 Response:', text);

  return { text, toolCalls };
}

// Usage
await runAgent('Search for the current Bitcoin price, calculate 10% of it, and save the result');
```

## Best Practices

### 1. Clear Descriptions

```typescript
{
  description: 'Get current weather for a specific city',
  // Better than: 'weather'
}
```

### 2. Detailed Parameters

```typescript
parameters: z.object({
  city: z.string().describe('City name (e.g., "San Francisco", "Tokyo")'),
  units: z.enum(['celsius', 'fahrenheit']).describe('Temperature units'),
})
```

### 3. Structured Results

```typescript
execute: async ({ city }) => ({
  city,
  temperature: 72,
  condition: 'sunny',
  timestamp: new Date().toISOString(),
})
```

### 4. Error Handling

```typescript
execute: async (params) => {
  try {
    const result = await doSomething(params);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

## Next Steps

- [Extended Thinking](./thinking) - Combine tools with reasoning
- [Multi-Turn Conversations](./conversations) - Tools in conversations
- [Guide: Usage](/guide/usage) - More tool patterns
