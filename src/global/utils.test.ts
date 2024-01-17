import { describe, test, expect } from 'vitest';

import { checkInputs } from './utils.ts';

describe('areInputsValid', () => {
  const url = 'https://example.com';

  // Positive tests:
  describe('[positive] Should return {status: true, message: ...} if', () => {
    const status = true;
    const message = 'Inputs are valid';

    test('-if all inputs are valid', () => {
      expect(checkInputs(url, '10', '20')).toEqual({ status, message });
      expect(checkInputs(url, '0', '0')).toEqual({ status, message });
    });

    test('-if x or/and y are negative', () => {
      expect(checkInputs(url, '-10', '20')).toEqual({ status, message });
      expect(checkInputs(url, '10', '-20')).toEqual({ status, message });
      expect(checkInputs(url, '-10', '-20')).toEqual({ status, message });
    });
  });

  // Negative tests:
  describe('[negative] Should return {status: false, message: ...} if', () => {
    const status = false;

    test('-if any input is empty', () => {
      const message = 'Inputs cannot be empty';
      expect(checkInputs('', '10', '20')).toEqual({ status, message });
      expect(checkInputs(url, '', '20')).toEqual({ status, message });
      expect(checkInputs(url, '10', '')).toEqual({ status, message });
    });

    test('-if x or y are not numbers', () => {
      const message = 'X and Y must be numbers';
      expect(checkInputs(url, 'abc', '20')).toEqual({ status, message });
      expect(checkInputs(url, '10', 'xyz')).toEqual({ status, message });
    });

    test('-if x or y are not integers', () => {
      const message = 'X and Y must be integers';
      expect(checkInputs(url, '10.5', '20')).toEqual({ status, message });
      expect(checkInputs(url, '10', '20.5')).toEqual({ status, message });
    });

    test('-if x or y are out of range', () => {
      const message = 'X and Y must be within the range of -/+1,000,000,000';
      const abovePositiveLimit = (1_000_000_000 + 1).toString();
      const belowNegativeLimit = (-1_000_000_000 - 1).toString();
      expect(checkInputs(url, abovePositiveLimit, '20')).toEqual({ status, message });
      expect(checkInputs(url, '10', abovePositiveLimit)).toEqual({ status, message });
      expect(checkInputs(url, belowNegativeLimit, '20')).toEqual({ status, message });
      expect(checkInputs(url, '10', belowNegativeLimit)).toEqual({ status, message });
    });
  });
});
