module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.3' } },
  rules: {
    // React
    'react/prop-types':     'off',   // using JSDoc or TypeScript in future
    'react/display-name':   'off',

    // Hooks
    'react-hooks/rules-of-hooks':  'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Accessibility
    'jsx-a11y/anchor-is-valid':         'warn',
    'jsx-a11y/alt-text':                'error',
    'jsx-a11y/aria-role':               'error',
    'jsx-a11y/no-noninteractive-element-interactions': 'warn',

    // General
    'no-unused-vars':   ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'no-console':       ['warn', { allow: ['warn', 'error'] }],
    'prefer-const':     'error',
    'no-var':           'error',
  },
};
