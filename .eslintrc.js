module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true }],
    semi: [2, 'always'],
    indent: ['error', 2],
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never' },
    ],
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
      },
    ],
    'max-len': ['error', { code: 180 }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
  },
};
