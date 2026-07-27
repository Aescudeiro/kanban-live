import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Auto-cleanup the rendered DOM between tests. Testing Library only registers
// this automatically when Vitest globals are enabled, which we keep off.
afterEach(() => {
  cleanup();
});
