import { describe, test, expect } from 'vitest';

import { getInputsFromURL } from './utils.ts';

describe('getInputsFromURL', () => {
  // Positive:
  test('should return the correct values when queryString is provided', () => {
    const queryString = 'url=https://example.com&x=10&y=20';
    const result = getInputsFromURL(queryString);
    expect(result).toEqual({ url: 'https://example.com', x: '10', y: '20' });
  });

  test('should return the correct values when queryString contains extra parameters', () => {
    const queryString = 'url=https://example.com&z=30&x=10&y=20';
    const result = getInputsFromURL(queryString);
    expect(result).toEqual({ url: 'https://example.com', x: '10', y: '20' });
  });

  // Negative:
  test('should return empty values when queryString is empty', () => {
    const queryString = '';
    const result = getInputsFromURL(queryString);
    expect(result).toEqual({ url: '', x: '', y: '' });
  });
  test('should return empty values when some parameters are missing', () => {
    const queryString = 'url=https://example.com&y=30';
    const result = getInputsFromURL(queryString);
    expect(result).toEqual({ url: 'https://example.com', x: '', y: '30' });
  });

  test('should return empty values when some parameters are empty', () => {
    const queryString = 'url=https://example.com&x=&y=20';
    const result = getInputsFromURL(queryString);
    expect(result).toEqual({ url: 'https://example.com', x: '', y: '20' });
  });
});
