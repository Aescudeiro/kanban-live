// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

/**
 * Shared ESLint rules for every workspace package. Each app spreads this and
 * layers its own environment-specific config (Node globals, React plugins, ...)
 * on top, so common rules and the Prettier integration live in one place.
 */
export const base = tseslint.config(
  { ignores: ['dist', 'build', 'coverage', 'node_modules'] },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
);
