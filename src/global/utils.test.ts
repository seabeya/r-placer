import { describe, expect, it } from 'vitest';
import { checkInputs } from './utils.ts';

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
