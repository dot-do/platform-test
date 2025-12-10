import { abs } from './math';

describe('abs', () => {
  it('should return the absolute value of a positive number', () => {
    expect(abs(5)).toBe(5);
  });

  it('should return the absolute value of a negative number', () => {
    expect(abs(-5)).toBe(5);
  });

  it('should return 0 for 0', () => {
    expect(abs(0)).toBe(0);
  });
});
