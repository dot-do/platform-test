# platform-test

Test repository for validating Claude Code automation features.

## Purpose

This repository exists to test and validate Claude Code automation without cluttering the main platform repository with test issues.

## What We Test

1. **Sticky Reviewer Behavior** - Ensures same agent responds to multiple `@claude` mentions on same issue
2. **PAT Selection Logic** - Validates priority order: named → sticky → assignee → random
3. **Progressive Status Updates** - Real-time GitHub comment updates during long-running operations
4. **Concurrent Execution** - Multiple agents working simultaneously on different issues
5. **Override Mechanisms** - Named mentions and assignments override sticky reviewer

## Test Workflows

The repository includes minimal GitHub Actions workflows copied from the main platform repo:

- `.github/workflows/claude.yml` - Handles `@claude` mentions on issues
- Organization secrets (PATs) are shared from the dot-do organization

## Running Tests

See `TEST_SUITE.md` for comprehensive test scenarios and expected results.

## Cleanup

Test issues can be closed or deleted after validation. This repo is for testing only.
