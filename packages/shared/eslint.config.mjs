// @ts-check
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { base } from '../../eslint.config.base.mjs';

export default tseslint.config(...base, {
  files: ['**/*.ts'],
  languageOptions: {
    globals: globals.node,
  },
});
