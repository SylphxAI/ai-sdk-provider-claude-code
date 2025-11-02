/**
 * Streaming text generation example
 */

import { streamText } from 'ai';
import { claudeCode } from '@sylpx/ai-sdk-provider-claude-code';

async function main() {
  const { textStream } = await streamText({
    model: claudeCode('sonnet'),
    prompt: 'Write a short story about a robot learning to paint',
  });

  for await (const chunk of textStream) {
    process.stdout.write(chunk);
  }

  console.log('\n\nDone!');
}

main().catch(console.error);
