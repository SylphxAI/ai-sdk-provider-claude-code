/**
 * Tool calling example
 */

import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';
import { z } from 'zod';

async function main() {
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
          // Simulate weather API call
          console.log(`Fetching weather for ${city}...`);

          return {
            city,
            temperature: Math.round(Math.random() * 30 + 50),
            condition: ['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)],
          };
        },
      },
    },
  });

  console.log('\nTool calls:', JSON.stringify(toolCalls, null, 2));
  console.log('\nResponse:', text);
}

main().catch(console.error);
