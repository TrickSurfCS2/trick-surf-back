module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  globals: {
    NodeJS: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'no-console': 'off',
    'spaced-comment': 'off',
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    'class-methods-use-this': 'off',
    'lines-between-class-members': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    'no-underscore-dangle': 'off',

    'import/order': [
      'error',
      {
        groups: ['type', 'index', 'sibling', 'parent', 'internal', 'external', 'builtin', 'object']
      }
    ],
    'import/extensions': [
      'error',
      {
        ts: 'never',
        model: 'off',
        middleware: 'off',
        service: 'off',
        controller: 'off',
        interface: 'off',
        gateway: 'off'
      }
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        disallowTypeAnnotations: false
      }
    ]
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.ts', '.d.ts', '.tsx']
      }
    }
  },
  ignorePatterns: ['*.d.ts']
};
