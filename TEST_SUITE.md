# Claude Code Automation Test Suite

Comprehensive test scenarios for validating PAT selection, sticky reviewer behavior, and progressive status updates.

## Test Categories

### 1. PAT Selection Priority

Tests the priority order: **Named mention → Sticky reviewer → Assignee → Random**

#### Test 1.1: Fresh Issue → Random Selection
**Setup**: New issue with no prior comments
**Action**: `@claude please respond`
**Expected**: Random selection from available PATs (AMY, TOM, CODY, PRIYA, QUINN)
**Validation**: Check which agent responds

#### Test 1.2: Named Mention → Override Everything
**Setup**: Issue with existing bot comments
**Action**: `@quinn-qa please review`
**Expected**: QUINN_GH_PAT selected (overrides sticky reviewer)
**Validation**: Confirm quinn-qa responds

#### Test 1.3: Assignment → Specific PAT
**Setup**: Fresh issue
**Action**: Assign to `amy-doyle`
**Expected**: AMY_GH_PAT selected
**Validation**: Confirm amy-doyle responds

---

### 2. Sticky Reviewer Behavior

Tests that the same agent handles all @claude mentions on an issue.

#### Test 2.1: Multiple @claude Mentions (Same Issue)
**Setup**: Fresh issue
**Actions**:
1. `@claude please respond and tell me your name`
2. Wait for response (note agent, e.g., tom-dolen)
3. `@claude can you confirm you're the same agent?`
4. `@claude one more test`
**Expected**: All 3 responses from same agent (sticky!)
**Validation**: All comments from same bot account

#### Test 2.2: Sticky Reviewer Survives Across Days
**Setup**: Issue with existing bot comment from 24h ago
**Action**: `@claude please respond`
**Expected**: Same agent as 24h ago (sticky persists)
**Validation**: Same bot account responds

#### Test 2.3: Sticky Reviewer Works on Issues (Not Just PRs)
**Setup**: Regular issue (not PR) with existing bot comments
**Action**: `@claude please respond`
**Expected**: Same agent as previous comments
**Validation**: Confirm sticky behavior on issues

---

### 3. Override Mechanisms

Tests that named mentions and assignments can override sticky reviewer.

#### Test 3.1: Named Mention Overrides Sticky
**Setup**: Issue with amy-doyle as sticky reviewer
**Action**: `@quinn-qa please respond`
**Expected**: quinn-qa responds (not Amy)
**Validation**: Comment from quinn-qa

#### Test 3.2: Assignment Overrides Sticky
**Setup**: Issue with tom-dolen as sticky reviewer
**Action**: Assign issue to `cody-chen`
**Expected**: cody-chen responds (not Tom)
**Validation**: Comment from cody-chen

#### Test 3.3: Return to Sticky After Override
**Setup**: Issue with amy as sticky, one-time quinn override
**Actions**:
1. `@quinn-qa please respond` (override)
2. `@claude please respond` (should return to sticky)
**Expected**: Step 2 uses AMY_GH_PAT (returns to original sticky)
**Validation**: Amy responds in step 2

---

### 4. Concurrent Execution

Tests multiple agents working simultaneously on different issues.

#### Test 4.1: Two Issues, Different Random Agents
**Setup**: Two fresh issues
**Actions**:
1. Issue A: `@claude please respond`
2. Issue B: `@claude please respond` (immediately after)
**Expected**: Different agents assigned (likely, but not guaranteed)
**Validation**: Track which agents handle each

#### Test 4.2: Two Issues, Explicit Different Agents
**Setup**: Two fresh issues
**Actions**:
1. Issue A: Assign to `amy-doyle`
2. Issue B: Assign to `tom-dolen`
**Expected**: Amy on A, Tom on B (concurrent)
**Validation**: Both work simultaneously without conflicts

#### Test 4.3: Concurrent Work, No Cross-contamination
**Setup**: Issues from Test 4.2 still running
**Action**: Monitor progressive status updates
**Expected**: Updates don't mix between issues
**Validation**: Each issue has isolated progress tracking

---

### 5. Progressive Status Updates

Tests real-time GitHub comment updates during execution.

#### Test 5.1: Todo List Appears
**Setup**: Fresh issue with non-trivial task
**Action**: `@claude please create a simple README.md file`
**Expected**: Comment with todo list appears
**Validation**: Todo list visible in first comment

#### Test 5.2: Todo Items Update in Real-Time
**Setup**: Continuing Test 5.1
**Action**: Monitor comment updates
**Expected**: Todo items change from pending → in_progress → completed
**Validation**: Comment updates without creating new comments

#### Test 5.3: Final Status Reflects Completion
**Setup**: Continuing Test 5.1
**Action**: Wait for completion
**Expected**: All todos marked completed, success message
**Validation**: Comment shows all checkboxes checked

---

### 6. Edge Cases

Tests unusual or error scenarios.

#### Test 6.1: Bot Account Mentions Itself
**Setup**: Issue with amy-doyle comments
**Action**: Have Amy mention `@claude` (if possible via API)
**Expected**: No infinite loop, graceful handling
**Validation**: System ignores bot-to-bot mentions

#### Test 6.2: Multiple @claude in Single Comment
**Setup**: Fresh issue
**Action**: `@claude please respond @claude @claude`
**Expected**: Single response, not triple
**Validation**: Only one workflow triggered

#### Test 6.3: Mixed Mentions in Single Comment
**Setup**: Issue with amy as sticky
**Action**: `@claude @quinn-qa please respond`
**Expected**: Priority to named mention (quinn-qa)
**Validation**: quinn-qa responds, not amy

#### Test 6.4: Very Long-Running Task
**Setup**: Fresh issue
**Action**: `@claude please create 50 files` (intentionally slow)
**Expected**: Progressive updates every 5+ seconds
**Validation**: Multiple progressive updates visible

#### Test 6.5: Task Failure During Execution
**Setup**: Fresh issue
**Action**: `@claude please do something impossible`
**Expected**: Error message in progressive status
**Validation**: Todo marked failed, error explanation

---

### 7. PAT Availability Scenarios

Tests behavior when PATs are unavailable or exhausted.

#### Test 7.1: Random Selection with All PATs Available
**Setup**: Fresh issue, all 5 PATs configured
**Action**: `@claude please respond`
**Expected**: One of 5 agents randomly selected
**Validation**: Distribution roughly even over multiple tests

#### Test 7.2: Named Mention to Unavailable Agent
**Setup**: Fresh issue, QUINN_GH_PAT temporarily removed
**Action**: `@quinn-qa please respond`
**Expected**: Fallback to random selection with warning
**Validation**: Different agent responds, warning in logs

---

### 8. Cross-Repository Behavior

Tests if behavior is consistent across repos in same org.

#### Test 8.1: Platform Repo vs Test Repo
**Setup**: Same test in both repos
**Action**: `@claude please respond`
**Expected**: Same sticky reviewer behavior
**Validation**: Both repos follow same priority rules

#### Test 8.2: Org Secrets Properly Shared
**Setup**: platform-test repo should have org secrets
**Action**: Create test issue with @claude mention
**Expected**: Workflow runs successfully
**Validation**: Agent responds (confirms secrets accessible)

---

## Test Execution Plan

### Phase 1: Basic Validation (5 tests)
- Test 1.1 (Random selection)
- Test 2.1 (Sticky reviewer)
- Test 3.1 (Named override)
- Test 4.2 (Concurrent)
- Test 5.1 (Progressive status)

### Phase 2: Edge Cases (5 tests)
- Test 2.2 (Sticky persists)
- Test 3.3 (Return to sticky)
- Test 6.1 (Bot self-mention)
- Test 6.4 (Long-running)
- Test 6.5 (Task failure)

### Phase 3: Comprehensive Coverage (remaining tests)
All other tests for full coverage

---

## Expected Test Duration

- **Phase 1**: ~15-20 minutes (basic validation)
- **Phase 2**: ~20-25 minutes (edge cases)
- **Phase 3**: ~30-40 minutes (full suite)
- **Total**: ~1-1.5 hours for complete validation

---

## Success Criteria

- ✅ All Phase 1 tests pass → Feature is production-ready
- ✅ 90%+ of all tests pass → Feature is robust
- ✅ No cross-contamination in concurrent tests → Safe for scale
- ✅ Progressive status updates reliably → User experience is good

---

## Test Results Log

Results should be documented here after running tests:

```
[Date] Test X.X - [PASS/FAIL] - Notes
```

### Phase 1 Results
- [ ] Test 1.1 -
- [ ] Test 2.1 -
- [ ] Test 3.1 -
- [ ] Test 4.2 -
- [ ] Test 5.1 -

### Phase 2 Results
- [ ] Test 2.2 -
- [ ] Test 3.3 -
- [ ] Test 6.1 -
- [ ] Test 6.4 -
- [ ] Test 6.5 -
