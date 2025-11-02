/**
 * Extended thinking example (Opus 4)
 */

import { generateText } from 'ai';
import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';

async function main() {
  const { text, reasoning } = await generateText({
    model: claudeCode('opus', {
      maxThinkingTokens: 2000,
    }),
    prompt: `Solve this logic puzzle:

      Three people - Alice, Bob, and Carol - each have a different pet (cat, dog, bird).
      1. Alice doesn't have a cat.
      2. Bob doesn't have a dog.
      3. Carol doesn't have a bird.

      Who has which pet?`,
  });

  console.log('Reasoning process:');
  console.log(reasoning);
  console.log('\nAnswer:');
  console.log(text);
}

main().catch(console.error);
