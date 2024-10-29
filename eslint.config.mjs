import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  react: true,
  isInEditor: false,
  rules: {
    'antfu/curly': ['off'],
    'curly': ['error', 'all'],

    'style/brace-style': ['error', '1tbs'],
  },
})
