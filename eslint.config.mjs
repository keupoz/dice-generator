import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  react: true,
  isInEditor: false,
  rules: {
    'antfu/curly': ['off'],
    'antfu/if-newline': ['off'],

    'curly': ['error', 'multi-line', 'consistent'],
    'style/brace-style': ['error', '1tbs'],

    'style/jsx-one-expression-per-line': ['error', { allow: 'non-jsx' }],
  },
})
