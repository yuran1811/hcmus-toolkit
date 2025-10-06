import antfu from '@antfu/eslint-config';
import html from '@html-eslint/eslint-plugin';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default antfu(
  {
    formatters: {
      html: true,
      css: true,
      markdown: 'prettier',
    },
    stylistic: {
      indent: 2,
      semi: true,
      quotes: 'single',
    },
    javascript: true,
    typescript: true,
    markdown: true,
    json: true,
    jsonc: true,
  },
  {
    ignores: [
      '**/node_modules',
      '**/dist',
      '**/build',
      '**/output',
      '**/public',
      '**/coverage',
      '**/test-results',
      'pnpm-lock.yaml',
    ],
  },
  eslintPluginPrettierRecommended,
  {
    rules: {
      'prettier/prettier': 'error',

      'new-cap': 'off',
      'vars-on-top': 'off',
      'no-console': 'off',
      'no-empty': 'off',
      'no-restricted-globals': 'off',

      'regexp/no-unused-capturing-group': 'off',
      'regexp/no-useless-escape': 'off',
      'eslint-comments/no-unlimited-disable': 'off',
      'node/prefer-global/process': 'off',
      'unused-imports/no-unused-vars': 'warn',

      'antfu/consistent-chaining': 'off',
      'antfu/consistent-list-newline': 'off',
      'antfu/if-newline': 'off',
      'antfu/top-level-function': 'off',

      'style/brace-style': 'off',
      'style/comma-dangle': 'off',
      'style/member-delimiter-style': 'off',
      'style/operator-linebreak': 'off',
      'style/quote-props': 'off',

      'ts/ban-ts-comment': 'off',
      'ts/no-empty-object-type': 'off',
      'ts/no-explicit-any': 'off',
      'ts/no-require-imports': 'off',
      'ts/no-unused-vars': 'off',
      'ts/strict-boolean-expressions': 'off',

      'vue/require-explicit-emits': 'off',
      'vue/singleline-html-element-content-newline': 'off',
    },
  },
  {
    files: ['**/*.md'],
    rules: { 'prettier/prettier': ['warn', { parser: 'markdown' }] },
  },
  {
    ...html.configs.recommended,
    files: ['**/*.html'],
    plugins: { '@html-eslint': html },
    rules: {
      'prettier/prettier': 'off',
      '@html-eslint/no-duplicate-class': 'error',
    },
  },
);
