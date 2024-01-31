import { describe, expect, it } from 'vitest';
import { throwFalsey } from './helpers.ts';

describe('fn throwFalsey', () => {
  it('should throw an error with the given message if status is false', () => {
    const props = {
      status: false,
      message: 'Test message',
    };

    expect(() => throwFalsey(props)).toThrowError(props.message);
  });

  it('should not throw an error if status is true', () => {
    const props = {
      status: true,
      message: 'Status is true',
    };

    expect(() => throwFalsey(props)).not.toThrowError();
  });
});
