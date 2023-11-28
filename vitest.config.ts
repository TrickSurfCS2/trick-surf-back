import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '#': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./node_modules', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx'],
  },

  test: {
    cache: {
      dir: '.vitestcache',
    },
    globals: true,
    coverage: {
      all: true,
      provider: 'istanbul',
      include: ['components', 'utils'],
    },
    environment: 'happy-dom',
  },
})
