/**
 * Basic text generation example
 */

import { generateText } from 'ai';
import { claudeCode } from '@sylpx/ai-sdk-provider-claude-code';

async function main() {
  const { text } = await generateText({
    model: claudeCode('sonnet'),
    prompt: 'Explain quantum computing in simple terms',
  });

  console.log(text);
}

main().catch(console.error);
