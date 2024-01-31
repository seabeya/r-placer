// @vitest-environment jsdom

import { describe, expect, it, vi, beforeEach, afterEach, MockInstance } from 'vitest';
import { checkInputs, checkImage, buildWorkspaceUrl } from './utils.ts';

import CONSTS from './consts.ts';

describe('fn checkInputs', () => {
  const url = 'https://example.com';

  it('should return {status: true, message: ...} if all inputs are valid', () => {
    const status = true;
    const message = 'Inputs are valid';

    expect(checkInputs(url, '10', '20')).toEqual({ status, message });
    expect(checkInputs(url, '0', '0')).toEqual({ status, message });
    expect(checkInputs(url, '-10', '-20')).toEqual({ status, message });
  });

  describe('should return {status: false, message: ...} -', () => {
    const status = false;

    it('-if any input is empty', () => {
      const message = 'Inputs cannot be empty';

      expect(checkInputs('', '10', '20')).toEqual({ status, message });
      expect(checkInputs(url, '', '20')).toEqual({ status, message });
      expect(checkInputs(url, '10', '')).toEqual({ status, message });
    });

    it('-if X or Y is not a number', () => {
      const message = 'X and Y must be numbers';

      expect(checkInputs(url, 'abc', '20')).toEqual({ status, message });
      expect(checkInputs(url, '10', 'xyz')).toEqual({ status, message });
    });

    it('-if X or Y is not an integer', () => {
      const message = 'X and Y must be integers';

      expect(checkInputs(url, '10.5', '20')).toEqual({ status, message });
      expect(checkInputs(url, '10', '20.5')).toEqual({ status, message });
      expect(checkInputs(url, '10.5', '20.5')).toEqual({ status, message });
    });

    it('-if X or Y is out of range', () => {
      const message = 'X and Y must be within the range of -/+1,000,000,000';
      const upLimit = (1_000_000_000 + 1).toString();
      const downLimit = (-1_000_000_000 - 1).toString();

      expect(checkInputs(url, upLimit, '20')).toEqual({ status, message });
      expect(checkInputs(url, '10', upLimit)).toEqual({ status, message });
      expect(checkInputs(url, downLimit, '20')).toEqual({ status, message });
      expect(checkInputs(url, '10', downLimit)).toEqual({ status, message });
    });
  });
});

describe('fn checkImage', () => {
  let img: HTMLImageElement;
  let imageMock: MockInstance;

  beforeEach(() => {
    img = new Image();
    imageMock = vi.spyOn(window, 'Image').mockImplementation(() => img);
  });

  afterEach(() => {
    imageMock.mockRestore();
  });

  it('should resolve if the image has valid dimensions', async () => {
    img.width = 1000;
    img.height = 500;

    setImmediate(() => img.onload?.(new Event('load')));

    await expect(checkImage('')).resolves.toBeUndefined();
  });

  it('should reject with a message if the image is too big', async () => {
    img.width = 1000;
    img.height = 501;

    setImmediate(() => img.onload?.(new Event('load')));

    await expect(checkImage('')).rejects.toEqual(
      'Image is too big (501000 pixels). Please, use image with less than 500 000 pixels',
    );
  });

  it('should reject with a message  if the image is not found', async () => {
    setImmediate(() => img.onerror?.(new Event('error')));

    await expect(checkImage('')).rejects.toEqual('Image not found');
  });
});

describe('fn buildWorkspaceUrl', () => {
  it('should build a valid workspace url', () => {
    const url = 'https://example.com';
    const x = '10';
    const y = '20';

    const expected = `${CONSTS.workspace_page_url}?url=${encodeURIComponent(url)}&x=${x}&y=${y}`;
    const actual = buildWorkspaceUrl(url, x, y);

    expect(actual).toBe(expected);
  });

  it('should build a workspace url with empty values if the worst case: input values are empty', () => {
    const url = '';
    const x = '';
    const y = '';

    const expected = `${CONSTS.workspace_page_url}?url=&x=&y=`;
    const actual = buildWorkspaceUrl(url, x, y);

    expect(actual).toBe(expected);
  });
});
