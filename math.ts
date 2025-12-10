/**
 * Returns the absolute value of a number.
 * @param n - The number to get the absolute value of
 * @returns The absolute value of n
 */
export function abs(n: number): number {
  return Math.abs(n);
}

/**
 * Clamps a number between a minimum and maximum value.
 * @param value - The number to clamp
 * @param min - The minimum allowed value
 * @param max - The maximum allowed value
 * @returns The clamped value
 * @throws {Error} If min is greater than max
 */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new Error(`Invalid clamp range: min (${min}) must be less than or equal to max (${max})`);
  }
  return Math.min(Math.max(value, min), max);
}
