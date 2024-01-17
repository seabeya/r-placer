import { describe, test, expect } from 'vitest';

import { buildWorkspaceUrl } from './utils.ts';

import CONSTS from '@global/consts.ts';

describe('buildWorkspaceUrl', () => {
  test('should build the workspace URL correctly', () => {
    const url = 'https://example.com';
    const x = '10';
    const y = '20';

    const expectedUrl = `${CONSTS.workspacePageUrl}?url=https%3A%2F%2Fexample.com&x=10&y=20`;

    const result = buildWorkspaceUrl(url, x, y);

    expect(result).toBe(expectedUrl);
  });
});
