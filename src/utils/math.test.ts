import { describe, it, expect } from 'vitest';
import { max } from './math';

describe('max', () => {
  describe('normal cases', () => {
    it('should return the maximum of positive integers', () => {
      expect(max(1, 2, 3)).toBe(3);
      expect(max(5, 10, 3)).toBe(10);
    });

    it('should return the maximum of negative integers', () => {
      expect(max(-1, -2, -3)).toBe(-1);
      expect(max(-5, -10, -3)).toBe(-3);
    });

    it('should return the maximum of mixed positive and negative numbers', () => {
      expect(max(-5, 0, 5)).toBe(5);
      expect(max(-10, -5, 0)).toBe(0);
    });

    it('should return the maximum of decimal numbers', () => {
      expect(max(1.5, 2.7, 1.2)).toBe(2.7);
      expect(max(3.14, 2.71, 1.41)).toBe(3.14);
    });

    it('should return zero when zero is the maximum', () => {
      expect(max(-1, 0, -5)).toBe(0);
      expect(max(0, -2, -3)).toBe(0);
    });
  });

  describe('edge cases', () => {
    it('should handle equal values', () => {
      expect(max(5, 5, 5)).toBe(5);
      expect(max(0, 0)).toBe(0);
    });

    it('should handle a single value', () => {
      expect(max(42)).toBe(42);
      expect(max(-10)).toBe(-10);
      expect(max(0)).toBe(0);
    });

    it('should return -Infinity when called with no arguments', () => {
      expect(max()).toBe(-Infinity);
    });

    it('should handle Infinity values', () => {
      expect(max(1, Infinity, 3)).toBe(Infinity);
      expect(max(-Infinity, 0, 10)).toBe(10);
      expect(max(-Infinity, Infinity)).toBe(Infinity);
    });

    it('should handle safe integer limits', () => {
      expect(max(Number.MAX_SAFE_INTEGER, 100)).toBe(Number.MAX_SAFE_INTEGER);
      expect(max(Number.MIN_SAFE_INTEGER, -100)).toBe(-100);
    });

    it('should handle very large numbers', () => {
      expect(max(Number.MAX_VALUE, 1000)).toBe(Number.MAX_VALUE);
    });

    it('should handle very small numbers', () => {
      expect(max(-Number.MAX_VALUE, -1000)).toBe(-1000);
    });
  });

  describe('special cases', () => {
    it('should return NaN when any argument is NaN', () => {
      expect(max(1, NaN, 3)).toBeNaN();
      expect(max(NaN, NaN)).toBeNaN();
      expect(max(NaN)).toBeNaN();
    });

    it('should handle many arguments', () => {
      expect(max(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)).toBe(10);
      expect(max(...Array.from({ length: 100 }, (_, i) => i))).toBe(99);
    });
  });
});
