import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';
import path from 'node:path';

export default defineConfig((configEnv) =>
  mergeConfig(
    viteConfig,
    defineConfig({
      test: {
        environment: "jsdom",
        coverage: {
          provider: 'v8',
          reporter: ['text', 'json-summary', 'json'],
          reportOnFailure: true,
        }, 
        setupFiles: ['./src/setupTests.ts'],      
        exclude: ['packages/template/*', '**/node_modules/**', '**/dist/**'],
      },
      define: { CONFIGURATION_TEST: true }
    })
  )
);
