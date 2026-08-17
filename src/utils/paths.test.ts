import { describe, expect, it } from 'vitest';

import { withBase } from './paths';

describe('withBase', () => {
  it('joins the configured base and relative path with one slash', () => {
    expect(withBase('projects/example/')).toMatch(/\/projects\/example\/$/);
    expect(withBase('/projects/example/')).toMatch(/\/projects\/example\/$/);
  });

  it('preserves a trailing slash for the base root', () => {
    expect(withBase('/')).toMatch(/\/$/);
  });
});
