# AGENTs

## Project Portal

Project Portal is a Nuxt.js project management portal with UnoCSS styling.

## Architecture

- **Framework**: Nuxt 4.x
- **Styling**: UnoCSS
- **UI Components**: Vue 3 + TypeScript
- **State Management**: VueUse
- **Icons**: Nuxt Icon

## Directory Structure

```
app/              # Application source
├── components/   # Vue components
├── composables/  # Composable functions
├── layouts/      # Page layouts
├── middleware/   # Route middleware
├── pages/        # Application pages
├── plugins/      # Nuxt plugins
└── utils/        # Utility functions

server/           # Server-side code
├── api/          # API routes
├── plugins/      # Server plugins
├── routes/       # Server routes
└── utils/        # Server utilities

content/          # Content layer
shared/           # Shared types and utilities
```

## Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build
```
