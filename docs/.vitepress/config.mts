import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AI SDK Provider - Claude Code",
  description: "Claude Code provider for Vercel AI SDK - Universal tool support without MCP servers",
  base: '/',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'AI SDK Provider - Claude Code' }],
    ['meta', { property: 'og:description', content: 'Claude Code provider for Vercel AI SDK - Universal tool support without MCP servers' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@SylphxAI' }],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'Examples', link: '/examples/' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/' },
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Usage', link: '/guide/usage' },
          { text: 'Architecture', link: '/guide/architecture' },
          { text: 'Models', link: '/guide/models' }
        ]
      },
      {
        text: 'API Reference',
        items: [
          { text: 'Overview', link: '/api/' },
          { text: 'claudeCode()', link: '/api/claude-code' },
          { text: 'Provider Options', link: '/api/provider-options' },
          { text: 'Type Definitions', link: '/api/types' }
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Overview', link: '/examples/' },
          { text: 'Basic Text Generation', link: '/examples/basic-text' },
          { text: 'Streaming', link: '/examples/streaming' },
          { text: 'Tool Calling', link: '/examples/tools' },
          { text: 'Extended Thinking', link: '/examples/thinking' },
          { text: 'Multi-Turn Conversations', link: '/examples/conversations' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/SylphxAI/ai-sdk-provider-claude-code' },
      { icon: 'twitter', link: 'https://x.com/SylphxAI' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Sylphx Limited'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/SylphxAI/ai-sdk-provider-claude-code/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    }
  }
})
