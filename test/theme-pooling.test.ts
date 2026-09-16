import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { themes } from '../src/themes/index.js';

const baselinePath = join(
  dirname(fileURLToPath(import.meta.url)),
  'fixtures',
  'themes-baseline.json',
);
const baseline = JSON.parse(readFileSync(baselinePath, 'utf-8')) as Record<string, unknown>;

describe('theme resource pooling — values unchanged', () => {
  it('baseline has the same theme keys as the registry', () => {
    expect(Object.keys(themes).sort()).toEqual(Object.keys(baseline).sort());
  });

  it('every theme deep-equals the pre-refactor baseline', () => {
    for (const [name, theme] of Object.entries(themes)) {
      expect(theme).toEqual(baseline[name]);
    }
  });
});
