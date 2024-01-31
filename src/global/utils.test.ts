// @vitest-environment jsdom

import { describe, expect, it, vi, beforeEach } from 'vitest';
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
  const event = {} as Event;
  let img: HTMLImageElement;

  const savedCreateElement = document.createElement;

  beforeEach(() => {
    document.createElement = vi.fn((type) => {
      if (type === 'img') {
        img = {} as HTMLImageElement;
        return img;
      }

      return savedCreateElement.call(document, type);
    });
  });

  it('should resolve if the image has valid dimensions', async () => {
    expect.assertions(1);

    const promise = checkImage('foo');
    img.width = 1000;
    img.height = 500;
    img.onload?.(event);

    await expect(promise).resolves.toBeUndefined();
  });

  it('should reject with an error message if the image is too big', async () => {
    expect.assertions(1);

    const promise = checkImage('foo');
    img.width = 1000;
    img.height = 501;
    img.onload?.(event);

    await expect(promise).rejects.toThrowError(
      `Image is too big (${img.width * img.height} pixels). Please, use image with less than 500 000 pixels`,
    );
  });

  it('should reject with an error message if the image is not found', async () => {
    expect.assertions(1);

    const promise = checkImage('foo');
    img.onerror?.(event);

    await expect(promise).rejects.toThrowError('Image not found');
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
