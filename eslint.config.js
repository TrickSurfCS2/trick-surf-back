import config from '@antfu/eslint-config'

export default await config({
  gitignore: true,
  typescript: true,
  test: true,
  jsonc: true,
  yaml: true,
  jsx: true,
  markdown: true,
  stylistic: true,
  isInEditor: true,

  ignores: ['**/dist/**', '**/.vitestcache/**'],
})
