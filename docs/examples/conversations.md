# Multi-Turn Conversations

Learn how to build conversational applications with the Claude Code provider.

## Basic Conversation

Maintain conversation history:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const conversation = [
  { role: 'user', content: 'Hello! My name is Alex.' },
  { role: 'assistant', content: 'Hello Alex! Nice to meet you. How can I help you today?' },
  { role: 'user', content: 'What is my name?' },
];

const { text } = await generateText({
  model: claudeCode('sonnet'),
  messages: conversation,
});

console.log(text); // "Your name is Alex."
```

## Building a Chat Loop

Create an interactive conversation:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const conversation: any[] = [];

async function chat() {
  rl.question('You: ', async (userMessage) => {
    if (userMessage.toLowerCase() === 'exit') {
      console.log('Goodbye!');
      rl.close();
      return;
    }

    // Add user message
    conversation.push({
      role: 'user',
      content: userMessage,
    });

    // Get AI response
    const { text } = await generateText({
      model: claudeCode('sonnet'),
      messages: conversation,
    });

    // Add assistant response
    conversation.push({
      role: 'assistant',
      content: text,
    });

    console.log('Assistant:', text);
    chat(); // Continue conversation
  });
}

console.log('Chat started! Type "exit" to quit.\n');
chat();
```

## With System Prompts

Set the assistant's personality:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const conversation = [
  {
    role: 'system',
    content: 'You are a helpful coding assistant specialized in TypeScript. Be concise and practical.',
  },
  {
    role: 'user',
    content: 'How do I use async/await?',
  },
];

const { text } = await generateText({
  model: claudeCode('sonnet'),
  messages: conversation,
});

console.log(text);

// Continue conversation
conversation.push(
  { role: 'assistant', content: text },
  { role: 'user', content: 'Show me an example' }
);

const { text: followUp } = await generateText({
  model: claudeCode('sonnet'),
  messages: conversation,
});

console.log(followUp);
```

## Streaming Conversations

Stream responses in a conversation:

```typescript
import { streamText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

async function streamingChat(messages: any[]) {
  const { textStream } = await streamText({
    model: claudeCode('sonnet'),
    messages,
  });

  let fullResponse = '';
  for await (const chunk of textStream) {
    process.stdout.write(chunk);
    fullResponse += chunk;
  }

  return fullResponse;
}

const conversation = [
  { role: 'user', content: 'Tell me a story' },
];

const response = await streamingChat(conversation);

conversation.push(
  { role: 'assistant', content: response },
  { role: 'user', content: 'Make it more exciting' }
);

await streamingChat(conversation);
```

## Conversation with Tools

Use tools in a conversation:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';
import { z } from 'zod';

const conversation = [];
const tools = {
  getWeather: {
    description: 'Get weather for a city',
    parameters: z.object({
      city: z.string(),
    }),
    execute: async ({ city }) => ({
      city,
      temperature: 72,
      condition: 'sunny',
    }),
  },
  setReminder: {
    description: 'Set a reminder',
    parameters: z.object({
      message: z.string(),
      time: z.string(),
    }),
    execute: async ({ message, time }) => ({
      success: true,
      message,
      time,
    }),
  },
};

// Turn 1
conversation.push({
  role: 'user',
  content: 'What is the weather in Tokyo?',
});

const response1 = await generateText({
  model: claudeCode('sonnet'),
  messages: conversation,
  tools,
});

conversation.push({
  role: 'assistant',
  content: response1.text,
});

// Turn 2
conversation.push({
  role: 'user',
  content: 'Great! Remind me to pack an umbrella tomorrow at 9am.',
});

const response2 = await generateText({
  model: claudeCode('sonnet'),
  messages: conversation,
  tools,
});

console.log(response2.text);
```

## Managing Conversation History

Limit conversation length to manage tokens:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

class ConversationManager {
  private messages: Message[] = [];
  private maxMessages = 20; // Keep last 20 messages
  private systemPrompt: string;

  constructor(systemPrompt: string) {
    this.systemPrompt = systemPrompt;
  }

  addMessage(role: 'user' | 'assistant', content: string) {
    this.messages.push({ role, content });

    // Keep only recent messages (except system prompt)
    if (this.messages.length > this.maxMessages) {
      this.messages = this.messages.slice(-this.maxMessages);
    }
  }

  getMessages(): Message[] {
    return [
      { role: 'system', content: this.systemPrompt },
      ...this.messages,
    ];
  }

  async chat(userMessage: string) {
    this.addMessage('user', userMessage);

    const { text } = await generateText({
      model: claudeCode('sonnet'),
      messages: this.getMessages(),
    });

    this.addMessage('assistant', text);
    return text;
  }
}

// Usage
const manager = new ConversationManager(
  'You are a helpful AI assistant.'
);

await manager.chat('Hello!');
await manager.chat('What is TypeScript?');
await manager.chat('Give me an example');
```

## Conversation with Context

Maintain context across turns:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

const conversation = [
  {
    role: 'system',
    content: 'You are helping a user debug their code. Remember previous context.',
  },
  {
    role: 'user',
    content: 'I have a bug in my React component. It shows stale data.',
  },
];

const response1 = await generateText({
  model: claudeCode('sonnet'),
  messages: conversation,
});

conversation.push(
  { role: 'assistant', content: response1.text },
  {
    role: 'user',
    content: 'I already tried that. The useEffect has userId in the deps array.',
  }
);

const response2 = await generateText({
  model: claudeCode('sonnet'),
  messages: conversation,
});

// Claude remembers the previous context
console.log(response2.text);
```

## Conversation Summarization

Summarize old messages to save tokens:

```typescript
import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

async function summarizeConversation(messages: any[]) {
  const { text } = await generateText({
    model: claudeCode('haiku'), // Use fast model for summarization
    prompt: `
      Summarize this conversation in 2-3 sentences:

      ${messages.map(m => `${m.role}: ${m.content}`).join('\n')}
    `,
  });

  return text;
}

class SmartConversationManager {
  private messages: any[] = [];
  private summary: string = '';

  async addTurn(userMessage: string) {
    this.messages.push({ role: 'user', content: userMessage });

    // If too many messages, summarize old ones
    if (this.messages.length > 10) {
      const oldMessages = this.messages.slice(0, -4);
      this.summary = await summarizeConversation(oldMessages);
      this.messages = this.messages.slice(-4);
    }

    const { text } = await generateText({
      model: claudeCode('sonnet'),
      messages: [
        {
          role: 'system',
          content: this.summary
            ? `Previous conversation summary: ${this.summary}`
            : 'You are a helpful assistant.',
        },
        ...this.messages,
      ],
    });

    this.messages.push({ role: 'assistant', content: text });
    return text;
  }
}
```

## Complete Chat Application

Full-featured chat application:

```typescript
import { generateText, streamText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';
import { z } from 'zod';
import * as readline from 'readline';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

class ChatApp {
  private messages: Message[] = [];
  private rl: readline.Interface;
  private tools = {
    search: {
      description: 'Search for information',
      parameters: z.object({
        query: z.string(),
      }),
      execute: async ({ query }: { query: string }) => {
        console.log('\n🔍 Searching:', query);
        // Your search implementation
        return { results: ['...'] };
      },
    },
  };

  constructor(systemPrompt: string) {
    this.messages.push({
      role: 'system',
      content: systemPrompt,
      timestamp: new Date(),
    });

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  async chat() {
    this.rl.question('\nYou: ', async (input) => {
      if (input.toLowerCase() === 'exit') {
        console.log('Goodbye!');
        this.rl.close();
        return;
      }

      if (input.toLowerCase() === 'history') {
        this.showHistory();
        this.chat();
        return;
      }

      // Add user message
      this.messages.push({
        role: 'user',
        content: input,
        timestamp: new Date(),
      });

      // Stream response
      console.log('\nAssistant: ');
      const { textStream, toolCalls } = await streamText({
        model: claudeCode('sonnet'),
        messages: this.messages,
        tools: this.tools,
      });

      let fullResponse = '';
      for await (const chunk of textStream) {
        process.stdout.write(chunk);
        fullResponse += chunk;
      }

      // Add assistant response
      this.messages.push({
        role: 'assistant',
        content: fullResponse,
        timestamp: new Date(),
      });

      console.log('\n');
      this.chat(); // Continue
    });
  }

  showHistory() {
    console.log('\n--- Conversation History ---');
    this.messages
      .filter(m => m.role !== 'system')
      .forEach(m => {
        console.log(`[${m.timestamp?.toLocaleTimeString()}] ${m.role}:`, m.content);
      });
    console.log('----------------------------');
  }

  start() {
    console.log('Chat started! Commands: "exit" to quit, "history" to view history\n');
    this.chat();
  }
}

// Usage
const app = new ChatApp(
  'You are a helpful AI assistant with access to web search. Be concise and helpful.'
);

app.start();
```

## Best Practices

### 1. Manage Conversation Length

```typescript
// Keep only recent messages
const recentMessages = conversation.slice(-20);
```

### 2. Use System Prompts

```typescript
const messages = [
  {
    role: 'system',
    content: 'You are a helpful coding assistant.',
  },
  ...conversation,
];
```

### 3. Save Conversation History

```typescript
// Save to database
await db.conversations.save({
  userId,
  messages: conversation,
  timestamp: new Date(),
});
```

### 4. Handle Long Conversations

```typescript
// Summarize or truncate old messages
if (conversation.length > 50) {
  const summary = await summarize(conversation.slice(0, -10));
  conversation = [
    { role: 'system', content: `Summary: ${summary}` },
    ...conversation.slice(-10),
  ];
}
```

## Next Steps

- [Tool Calling](./tools) - Add tools to conversations
- [Extended Thinking](./thinking) - Use reasoning in chat
- [Streaming](./streaming) - Stream conversation responses
