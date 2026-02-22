export default defineEventHandler(async () => {
  // Mock file structure - ในอนาจจะอ่านจาก file system จริง
  const files = [
    {
      name: 'src',
      type: 'directory',
      path: '/src',
      children: [
        { name: 'components', type: 'directory', path: '/src/components' },
        { name: 'pages', type: 'directory', path: '/src/pages' },
        { name: 'layouts', type: 'directory', path: '/src/layouts' },
        { name: 'utils', type: 'directory', path: '/src/utils' }
      ],
      size: null,
      modified: '2024-12-22T10:30:00Z'
    },
    {
      name: 'README.md',
      type: 'file',
      path: '/README.md',
      content: `# Project Portal

A modern project management interface built with Nuxt 4 and UnoCSS.

## Features

- GitHub-like interface
- Tab navigation
- Modern UI/UX design
- Responsive layout
- Real-time API integration

## Getting Started

1. Install dependencies: \`bun install\`
2. Run development server: \`bun run dev\`
3. Open browser to localhost:3000

## Project Structure

- \`app/\` - Main application code
- \`server/\` - API endpoints
- \`components/\` - Reusable components
- \`pages/\` - Route components

## Technologies

- Nuxt 4
- Vue 3
- UnoCSS
- TypeScript
- Biome
- Oxlint`,
      size: 1024,
      modified: '2024-12-22T09:15:00Z'
    },
    {
      name: 'package.json',
      type: 'file',
      path: '/package.json',
      content: JSON.stringify(
        {
          name: 'project-portal',
          version: '1.0.0',
          private: true,
          scripts: {
            build: 'nuxt build',
            dev: 'nuxt dev',
            generate: 'nuxt generate',
            preview: 'nuxt preview',
            postinstall: 'nuxt prepare',
            lint: 'biome lint --write && oxlint --fix --type-aware && tsc --noEmit'
          },
          dependencies: {
            nuxt: '^3.8.0',
            vue: '^3.3.8',
            'vue-router': '^4.2.5'
          },
          devDependencies: {
            '@biomejs/biome': '^2.4.4',
            '@nuxt/devtools': 'latest',
            '@nuxt/icon': '^2.2.1',
            '@types/node': '^25.3.0',
            '@unocss/nuxt': '^66.6.0',
            oxlint: '^1.49.0',
            typescript: '^5.9.3',
            unocss: '^66.6.0'
          }
        },
        null,
        2
      ),
      size: 856,
      modified: '2024-12-22T11:45:00Z'
    },
    {
      name: 'nuxt.config.ts',
      type: 'file',
      path: '/nuxt.config.ts',
      content: `export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@unocss/nuxt'],
  css: ['@unocss/reset/tailwind.css'],
  runtimeConfig: {
    public: {
      apiBase: '/api'
    }
  }
})`,
      size: 256,
      modified: '2024-12-22T12:00:00Z'
    }
  ];

  return {
    files,
    stats: {
      total: files.length,
      directories: files.filter((f) => f.type === 'directory').length,
      files: files.filter((f) => f.type === 'file').length
    }
  };
});
