/**
 * Claude Code Provider for Vercel AI SDK
 *
 * This provider enables Claude Code CLI integration with the Vercel AI SDK,
 * featuring universal tool support through XML-based schema translation.
 *
 * @example
 * ```typescript
 * import { generateText } from 'ai';
 * import { claudeCode } from '@sylphx/ai-sdk-provider-claude-code';
 *
 * const { text } = await generateText({
 *   model: claudeCode('sonnet'),
 *   prompt: 'Hello, Claude!'
 * });
 * ```
 *
 * @packageDocumentation
 */

import type { LanguageModelV2 } from '@ai-sdk/provider';
import { ClaudeCodeLanguageModel } from './claude-code-language-model.js';

export interface ClaudeCodeSettings {
  /**
   * Maximum thinking tokens for extended reasoning (Claude Opus 4)
   * @default undefined (no extended thinking)
   */
  maxThinkingTokens?: number;
}

/**
 * Available Claude Code models
 */
export type ClaudeCodeModelId = 'opus' | 'sonnet' | 'haiku';

/**
 * Create a Claude Code language model instance
 *
 * @param modelId - The model to use: 'opus' (most capable), 'sonnet' (balanced), or 'haiku' (fastest)
 * @param settings - Optional settings for the model
 * @returns A LanguageModelV2 instance compatible with Vercel AI SDK
 *
 * @example
 * ```typescript
 * // Basic usage
 * const model = claudeCode('sonnet');
 *
 * // With extended thinking (Opus 4)
 * const thinkingModel = claudeCode('opus', {
 *   maxThinkingTokens: 2000
 * });
 * ```
 */
export function claudeCode(
  modelId: ClaudeCodeModelId = 'sonnet',
  settings?: ClaudeCodeSettings
): LanguageModelV2 {
  return new ClaudeCodeLanguageModel({
    modelId,
    ...settings,
  });
}

/**
 * Default Claude Code provider instance
 *
 * @example
 * ```typescript
 * import { provider } from '@sylphx/ai-sdk-provider-claude-code';
 *
 * const model = provider('sonnet');
 * ```
 */
export const provider = claudeCode;

// Re-export types for convenience
export type { ClaudeCodeLanguageModelConfig } from './claude-code-language-model.js';
export type { StreamingXMLEvent } from './streaming-xml-parser.js';
export type { ToolDefinition } from './text-based-tools.js';

// Re-export main classes for advanced usage
export { ClaudeCodeLanguageModel } from './claude-code-language-model.js';
export { StreamingXMLParser } from './streaming-xml-parser.js';
export {
  generateToolsSystemPrompt,
  parseContentBlocks,
  formatToolResult,
} from './text-based-tools.js';
