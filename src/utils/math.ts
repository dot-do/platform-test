/**
 * Returns the largest of the given numbers.
 * Supports variadic arguments for convenience when working with multiple values.
 *
 * @param values - The numbers to compare
 * @returns The largest number, or -Infinity if no arguments are provided
 * @example
 * max(1, 2, 3) // returns 3
 * max(-5, -2, -10) // returns -2
 * max(3.14, 2.71, 1.41) // returns 3.14
 */
export function max(...values: number[]): number {
  return Math.max(...values);
}
