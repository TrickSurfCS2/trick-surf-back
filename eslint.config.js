import config from '@antfu/eslint-config'

export default await config({
  ignores: ['**/dist/**', '**/.vitestcache/**'],
})
