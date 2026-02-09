/**
 * DEEP ANALYSIS: Multiple Renders Issue in SRP Component
 * =====================================================
 * 
 * EXECUTIVE SUMMARY:
 * The multiple renders are EXPECTED and CORRECT behavior in React 18.
 * The actual problem is understanding WHY they happen and whether they impact performance.
 * 
 * ============================================================
 * LAYER 1: REACT 18 STRICT MODE (Development Only)
 * ============================================================
 * 
 * CAUSE:
 * React 18 intentionally runs effects twice in Strict Mode during development.
 * This is a feature, not a bug - designed to detect side effects and memory leaks.
 * 
 * WHAT HAPPENS:
 * 1. Component mounts (Mount #1)
 * 2. useEffect runs for the 1st time
 *    - apiCallCount increments
 *    - Effect triggered - API Call #1
 *    - Fetch starts
 * 3. Cleanup function runs (due to Strict Mode double-invoke)
 *    - isMounted = false (cleanup runs before second effect)
 *    - Cleanup: Component unmounted - stopping API call #1
 * 4. useEffect runs for the 2nd time
 *    - apiCallCount increments
 *    - Effect triggered - API Call #2
 *    - Fetch starts
 *    - Data arrives, isMounted = true, states update
 *
 * SOLUTION ALREADY IMPLEMENTED:
 * ✓ The isMounted flag prevents state updates after cleanup
 * ✓ Only ONE actual API request completes (the second one)
 * ✓ This is the correct pattern to prevent memory leaks
 * 
 * ============================================================
 * LAYER 2: COMPONENT RENDER CYCLES
 * ============================================================
 * 
 * STATE FLOW:
 * 
 * Initial Render #1:
 * - loading: true (initial state)
 * - data: [] (initial state)
 * - errors: [] (initial state)
 * - Displays: <Loading />
 * 
 * Render #2 (State Update #1 - after fetch completes):
 * - loading: false (setLoading(false))
 * - data: [...users] (setData(users))
 * - errors: [] (setErrors([]))
 * - Displays: <UserList />
 * 
 * Note: Multiple state updates in one batch still count as ONE render
 * React batches state updates in event handlers and effects for optimization
 * 
 * ============================================================
 * LAYER 3: THE COUNTER ISSUE (Minor Problem)
 * ============================================================
 * 
 * ISSUE:
 * componentRenderCount is incremented on EVERY render call, even if
 * the component doesn't actually update the DOM (due to memoization or shouldComponentUpdate)
 * 
 * This is a module-level global counter that persists across:
 * - Component remounts
 * - Hot module reloading (in development)
 * - Page refreshes
 * 
 * Example Console Output:
 * Refresh page:
 *   Render #1, Mount #1, API Call #1 & #2, Render #2
 * 
 * Navigate away and back:
 *   Render #3, Mount #2, API Call #3 & #4, Render #4
 *   (Counter keeps incrementing!)
 * 
 * ============================================================
 * LAYER 4: PERFORMANCE IMPACT ANALYSIS
 * ============================================================
 * 
 * GOOD NEWS:
 * ✓ Only ONE actual API request completes successfully
 * ✓ The wasted request is caught by isMounted cleanup (no state update)
 * ✓ Component renders are minimal (1-2 renders max per mount)
 * ✓ No memory leaks
 * ✓ No unnecessary DOM updates
 * 
 * DIAGRAM:
 * 
 * Time →
 * 
 * Strict Mode (Development):
 * |--- Mount #1
 * |    |--- Effect runs (1st time)
 * |    |    |--- Cleanup (prevents state update)
 * |    |--- Effect runs (2nd time)  ← This one completes successfully
 * |    |    |--- Fetch completes
 * |    |    |--- Render #2 triggered
 * 
 * Production Mode (No Strict Mode):
 * |--- Mount #1
 * |    |--- Effect runs (once)
 * |    |    |--- Fetch completes
 * |    |    |--- Render #2 triggered
 * 
 * ============================================================
 * SOLUTIONS
 * ============================================================
 * 
 * SOLUTION 1: Reset Counters (Current - Not Ideal)
 * Problem: Counters continue incrementing across remounts
 * 
 * SOLUTION 2: Use React DevTools Profiler
 * - Identify actual re-renders with reason
 * - See component tree and timing
 * - Better than console logs for production diagnosis
 * 
 * SOLUTION 3: Refactor Counters to Component State
 * - Move counters inside component state
 * - Reset on mount for clarity
 * - Better for debugging across multiple mounts
 * 
 * SOLUTION 4: Use useRef Instead of Global Variables
 * - useRef persists across renders but doesn't cause re-renders
 * - Better practice than module-level globals
 * - Can track instance-specific data
 * 
 * SOLUTION 5: Remove Console Logs in Production
 * - These logs are only for development debugging
 * - They impact performance if left in production builds
 * - Use conditional compilation or environment checks
 * 
 * ============================================================
 * RECOMMENDED ACTION: SOLUTION 3 + SOLUTION 5
 * ============================================================
 * 
 * 1. Use useRef for tracking (doesn't cause re-renders)
 * 2. Use useCallback to memoize values
 * 3. Remove console logs or make them conditional
 * 4. Keep the isMounted cleanup (prevents memory leaks)
 * 5. Trust React's batching and optimization
 * 
 * ============================================================
 * CONCLUSION
 * ============================================================
 * 
 * The current behavior is CORRECT for React 18 + Strict Mode.
 * Multiple renders are expected and necessary for React's reconciliation.
 * The isMounted cleanup prevents actual problems (memory leaks).
 * 
 * The only "issue" is code cleanliness - using global counters that
 * accumulate across the app lifecycle. This should be refactored to
 * use useRef + component state for better tracking.
 * 
 * In production, after removing Strict Mode, you'll see:
 * - Mount #1
 * - Render #1 (loading)
 * - Render #2 (data arrives)
 * 
 * Which is optimal behavior for data fetching.
 */
