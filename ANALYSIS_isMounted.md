/**
 * ANALYSIS: Is isMounted Needed in useGetUser Hook?
 * ==================================================
 * 
 * SHORT ANSWER: YES, isMounted is NEEDED, but can be IMPROVED
 * 
 * ============================================================
 * WHY isMounted IS NEEDED
 * ============================================================
 * 
 * SCENARIO 1: Component Unmounts Before Fetch Completes
 * Timeline:
 * ├─ t0: Component mounts
 * ├─ t1: Effect runs, fetch starts
 * ├─ t2: Component unmounts (user navigates away)
 * │  └─ Cleanup runs: isMounted = false
 * ├─ t3: Fetch completes (from t1)
 * │  └─ if (isMounted) → Skip state updates ✓
 * 
 * WITHOUT isMounted:
 * ├─ t3: Fetch completes
 * │  └─ setData(), setErrors(), setLoading() still called
 * │  └─ React Warning: "Can't perform state update on unmounted component"
 * │  └─ Memory leak: Component stays in memory to process response
 * 
 * SCENARIO 2: Normal Flow (Component Still Mounted)
 * ├─ t0: Component mounts
 * ├─ t1: Effect runs, fetch starts
 * ├─ t2: Fetch completes
 * │  └─ if (isMounted) → true, state updates ✓
 * ├─ t3: Component renders with new data
 * 
 * ============================================================
 * VERDICT: isMounted is NOT REDUNDANT
 * ============================================================
 * 
 * It prevents:
 * ✓ Memory leaks
 * ✓ React warnings
 * ✓ State updates on unmounted components
 * ✓ Unnecessary re-renders after unmount
 * 
 * ============================================================
 * BUT: There's a BETTER MODERN APPROACH
 * ============================================================
 * 
 * Instead of just skipping state updates, we should CANCEL the fetch.
 * This is done with AbortController (modern JavaScript API).
 * 
 * BENEFITS OF AbortController:
 * ✓ Actually aborts the HTTP request (doesn't waste network)
 * ✓ No need for isMounted check
 * ✓ Fetch promise never resolves if aborted
 * ✓ Cleaner code, clearer intent
 * ✓ Better performance
 * 
 * COMPARISON:
 * 
 * Current approach (isMounted):
 * ├─ Fetch completes
 * ├─ Check if mounted
 * └─ Skip state update (but request already completed)
 * 
 * Better approach (AbortController):
 * ├─ Component unmounts
 * ├─ Abort signal fires
 * └─ Fetch cancelled mid-flight (request never completes)
 * 
 * ============================================================
 * RECOMMENDATION
 * ============================================================
 * 
 * OPTION 1: Keep isMounted (Current)
 * - Simple, works, prevents errors
 * - Uses an extra local variable
 * - Fetch still completes but state isn't updated
 * 
 * OPTION 2: Use AbortController (Modern Best Practice)
 * - Cleaner code
 * - Actually cancels the request
 * - No unnecessary checks
 * - Better performance
 * - Compatible with modern React/JavaScript
 * 
 * VERDICT: Upgrade to AbortController for production code.
 * Keep isMounted for this educational project if you want to
 * show the traditional pattern.
 */
