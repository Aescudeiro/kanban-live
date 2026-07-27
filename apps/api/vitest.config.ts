import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.spec.ts'],
    environment: 'node',
    setupFiles: ['reflect-metadata'],
    root: './',
  },
  // SWC compiles decorators and emits the design-type metadata (driven by
  // tsconfig's emitDecoratorMetadata) that NestJS's dependency injection needs.
  // Vitest's default esbuild transform does not emit that metadata.
  plugins: [swc.vite({ module: { type: 'es6' } })],
});
