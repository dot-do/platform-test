import { abs } from './math.js';

describe('abs', () => {
  it('should return positive number unchanged', () => {
    expect(abs(5)).toBe(5);
    expect(abs(0.5)).toBe(0.5);
    expect(abs(100)).toBe(100);
  });

  it('should convert negative number to positive', () => {
    expect(abs(-5)).toBe(5);
    expect(abs(-0.5)).toBe(0.5);
    expect(abs(-100)).toBe(100);
  });

  it('should handle zero', () => {
    expect(abs(0)).toBe(0);
    expect(abs(-0)).toBe(0);
  });

  it('should handle special values following JavaScript Math.abs behavior', () => {
    // NaN returns NaN (as per JavaScript standard)
    expect(abs(NaN)).toBe(NaN);

    // Infinity handling
    expect(abs(Infinity)).toBe(Infinity);
    expect(abs(-Infinity)).toBe(Infinity);
  });

  it('should handle very large numbers', () => {
    expect(abs(Number.MAX_VALUE)).toBe(Number.MAX_VALUE);
    expect(abs(-Number.MAX_VALUE)).toBe(Number.MAX_VALUE);
  });

  it('should handle very small numbers', () => {
    expect(abs(Number.MIN_VALUE)).toBe(Number.MIN_VALUE);
    expect(abs(-Number.MIN_VALUE)).toBe(Number.MIN_VALUE);
  });
});
