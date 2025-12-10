# Testing Guide

This document describes how to run tests for the math utilities library.

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests in watch mode

```bash
npm run test:watch
```

### Run tests with coverage

```bash
npm run test:coverage
```

### Run specific test file

```bash
npm test -- math.test.ts
```

## Test Coverage

The test suite includes comprehensive coverage for:

- **abs() function**: Basic functionality, negative numbers, zero, positive numbers
- **clamp() function**:
  - Basic clamping behavior
  - Edge cases (boundaries, NaN, Infinity)
  - Error conditions (invalid min/max range)
  - Scientific notation
  - 37 total test cases

## Test Structure

Tests are organized by function, with describe blocks for each function and nested describe blocks for different scenarios:

```typescript
describe('abs', () => {
  it('should return absolute value of negative number', () => {
    expect(abs(-5)).toBe(5);
  });
});

describe('clamp', () => {
  describe('basic functionality', () => {
    it('should clamp value within range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
    });
  });

  describe('error conditions', () => {
    it('should throw error when min > max', () => {
      expect(() => clamp(5, 10, 0)).toThrow(
        'Invalid clamp range: min (10) must be less than or equal to max (0)'
      );
    });
  });
});
```

## Continuous Integration

Tests run automatically on:
- Every push to main branch
- Every pull request
- Pre-commit hooks (if configured)

## Debugging Failed Tests

If tests fail:

1. Check the error message for specific test case that failed
2. Run the specific test file in isolation
3. Use `console.log()` or debugger statements if needed
4. Verify that all dependencies are installed (`npm install`)

## Adding New Tests

When adding new functions:

1. Create test cases for happy path
2. Add edge case tests (boundary values, NaN, Infinity)
3. Add error condition tests
4. Ensure test coverage remains above 90%
