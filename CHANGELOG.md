# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-11

### Added

- `abs(n)` function that returns the absolute value of a number
  - Uses native `Math.abs()` for optimal performance
  - Handles all edge cases following JavaScript standards (NaN, Infinity, etc.)
  - Comprehensive test suite covering positive, negative, zero, and special values

### Technical Details

- TypeScript implementation with proper type annotations
- ESM module support
- Jest test suite with 100% coverage
- No runtime validation overhead - relies on TypeScript compile-time type checking
