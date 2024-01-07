import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    include: ['**/**/*.spec.ts'],
    coverage: {
      include: ['src/**/**/*.ts'],
      reporter: ['text', 'html-spa'],
      exclude: ['**/types/**'],
      provider: 'v8',
    },
  },
  resolve: {
    alias: {
      '#': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
})
