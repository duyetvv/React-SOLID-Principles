# Architecture & Design Decisions

## Overview

This document explains the architectural decisions made in the OCP implementation and why each design pattern was chosen.

## Problem Statement

Implement SOLID principles (specifically Open/Closed Principle) in a React component library where:
- Components should be extensible without modification
- Code organization should be clear and semantic
- Type safety is important for large applications
- Themes and styling should be flexible
- Accessibility should be built-in

## Solution: Three-Pillar Architecture

### Pillar 1: Components Layer
**Location:** `components/*/`

Components are organized with clear separation:
- **Component Logic** - `Component.tsx`
- **Component Styles** - `Component.scss`
- **Barrel Export** - `index.ts`

**Why this approach?**
- Each component is self-contained
- SCSS files are scoped to component
- Barrel exports prevent deep imports
- Easy to locate related files

**Extensibility Points:**
- Props for configuration
- Callbacks for events
- Children/slots for content
- Theme objects for styling

### Pillar 2: Core Layer
**Location:** `core/`

Three sub-folders handle different concerns:

#### `core/types/` - Type Definitions
- Single source of truth for interfaces
- Enables type-safe extensions
- Makes implicit contracts explicit

**Example:**
```typescript
interface ButtonTheme {
  [variantName: string]: ButtonVariantStyle;  // Unlimited variants via typing!
}
```

#### `core/constants/` - Configuration
- DEFAULTS - Default values
- CSS_CLASSES - Semantic class names
- ARIA_LABELS - Accessibility labels
- KEYBOARD_KEYS - Event codes

**Why centralize?**
- Single source of truth for magic strings
- Easier to update across components
- Clear what values components expect
- Makes component behavior predictable

**Example:**
```typescript
const DEFAULTS = {
  BUTTON_VARIANT: 'primary',  // Not hardcoded in Button component
};
```

#### `core/themes/` - Theme System
- Theme utilities and functions
- Default theme definition
- Example themes

**Why separate from components?**
- Themes are data, not code
- Can create unlimited themes outside component
- Enables true Open/Closed Principle
- Themes can be versioned independently

**Example:**
```typescript
// Component never changes, only theme data changes
<Button theme={MY_CUSTOM_THEME} variant="primary" />
```

### Pillar 3: Styles Layer
**Location:** `styles/`

Global styles and utilities:
- Main stylesheet imports
- Shared utility classes
- Base styles

**Why separate?**
- Component SCSS handles component-specific styles
- Global styles for layout and utilities
- Clear separation of concerns

## Design Patterns Implemented

### 1. Composition Pattern (Button)

**Problem:** How to add unlimited button variants without modifying Button code?

**Solution:** Pass themes as data objects

**Code:**
```typescript
// Button component
export function Button({ theme = DEFAULT_BUTTON_THEME, variant = 'primary', ...props }) {
  const variantStyle = theme[variant];
  return <button style={variantStyle}>{props.children}</button>;
}

// Usage - create unlimited themes!
const MY_THEME = { custom: { backgroundColor: '#custom' } };
<Button theme={MY_THEME} variant="custom">Click</Button>
```

**Why this works:**
- Styles are configuration, not code
- Component doesn't know about specific variants
- Add new themes without touching component
- **True Open/Closed Principle**

### 2. Render Props Pattern (List)

**Problem:** How to make List flexible for different item types without modification?

**Solution:** Accept `renderItem` callback

**Code:**
```typescript
// List component
export function List<T>({ items, renderItem, keyExtractor }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={keyExtractor(item)}>
          {renderItem(item)}  {/* Caller controls rendering! */}
        </li>
      ))}
    </ul>
  );
}

// Usage - render any type!
<List
  items={users}
  renderItem={(user) => <UserCard user={user} />}
  keyExtractor={(user) => user.id}
/>
```

**Why this works:**
- Component handles iteration logic
- Caller handles rendering logic
- Infinitely flexible for different types
- **Open for extension via callbacks**

### 3. Slots Pattern (Modal)

**Problem:** How to allow custom footer and content without modification?

**Solution:** Accept children and footer as slots

**Code:**
```typescript
// Modal component
export function Modal({ title, children, footer, isOpen }) {
  return isOpen ? (
    <div>
      <h2>{title}</h2>
      {children}  {/* Custom content */}
      <footer>{footer}</footer>  {/* Custom actions */}
    </div>
  ) : null;
}

// Usage - unlimited customization!
<Modal
  title="Confirm?"
  footer={<CustomFooter />}
  isOpen={open}
>
  <CustomContent />
</Modal>
```

**Why this works:**
- Component defines structure
- Caller fills in the content
- No modification needed for new use cases
- **Closed for structure, open for content**

## Import Organization

### Rule: System → Core → Components → Styles

```typescript
// 1. System libraries
import React, { useState, useCallback } from 'react';

// 2. Core functionality (types, constants, themes)
import { CSS_CLASSES } from './core/constants';
import { Button } from './components';

// 3. Component imports
import { Modal } from './components';

// 4. Styles
import './styles/index.scss';
```

**Why this order?**
- Logical dependency hierarchy
- System first (universally available)
- Core second (foundation)
- Components third (build on core)
- Styles last (just CSS)
- Easy to scan and understand imports

## Folder Naming Decisions

| Folder | Name | Alternative | Why? |
|--------|------|-------------|------|
| **components/** | Plural | `Components/` | Plural noun conventional for folder of items |
| **core/** | Singular | `shared/` | "Core" implies essential, foundational |
| **constants/** | Plural | `config/` | Can have many constants, more specific than config |
| **types/** | Plural | `interfaces/` | Covers interfaces, types, types, enums - plural makes sense |
| **themes/** | Plural | `theme/` | Can have many themes, consistency with components |

## Extensibility Points

### For Button:
1. ✅ New themes - just create data object
2. ✅ New variants - add to theme
3. ✅ New sizes - add to constants/types
4. ✅ Icons - already supported via prop

### For List:
1. ✅ New item types - just change renderItem
2. ✅ New key extraction - adjust keyExtractor
3. ✅ Empty state - already supported
4. ✅ Loading state - can add via prop

### For Modal:
1. ✅ New sizes - add to constants
2. ✅ Custom footer - pass footer prop
3. ✅ Custom content - pass children
4. ✅ Custom actions - pass custom footer

## Scaling Considerations

### As Project Grows:

1. **More Components?**
   - Add to `components/` folder
   - Use same pattern: Component.tsx, Component.scss, index.ts
   - Export from `components/index.ts`

2. **More Themes?**
   - Add to `core/themes/buttonThemes.ts`
   - Or split into `core/themes/darkTheme.ts`, `core/themes/lightTheme.ts`
   - Export from `core/themes/index.ts`

3. **More Constants?**
   - Add to `core/constants/index.ts`
   - Or split into separate files by domain
   - Export from `core/constants/index.ts`

4. **More Types?**
   - Add to `core/types/index.ts`
   - Or split by component (componentTypes.ts)
   - Export from `core/types/index.ts`

5. **Utilities?**
   - Create `core/utils/` if needed
   - Include helpers for theme manipulation, style generation, etc.
   - Export from `core/utils/index.ts`

## What Makes This OCP Compliant

### ✅ Open for Extension

1. **Themes** - Create unlimited button themes as data objects
2. **Render Props** - Extend List rendering via callbacks
3. **Slots** - Extend Modal content via children/footer
4. **Props** - Add behavior via optional props
5. **TypeScript** - Type-safe extensions via interfaces

### ✅ Closed for Modification

1. **Button** - Never touches theme code, just uses it
2. **List** - Never touches rendering, just iterates
3. **Modal** - Never touches content, just displays it
4. **Constants** - Centralized, single source of truth
5. **Types** - Define contracts without implementation

### ❌ Violations Avoided

- ❌ Hardcoded variants in Button component
- ❌ Limited item rendering in List
- ❌ Fixed footer content in Modal
- ❌ Magic strings scattered across code
- ❌ Deep prop drilling

## Performance Considerations

### Memoization
- Components use `React.memo` to prevent unnecessary re-renders
- Callbacks use `useCallback` to maintain referential equality
- Theme objects are stable across renders

### SCSS Organization
- Component-scoped SCSS prevents CSS conflicts
- No global CSS pollution
- Easy to remove styles with component

### TypeScript
- Full static type checking
- No runtime type validation overhead
- Tree-shakeable builds

## Accessibility

Built into each component:

**Button:**
- Type attribute
- Disabled state handling
- Focus management

**List:**
- Semantic `<ul>/<li>` elements
- Proper ARIA attributes

**Modal:**
- ARIA labels and roles
- ESC key handling
- Focus trap
- Backdrop click detection

## Next Steps for Evolution

1. **Storybook Integration** - Document components visually
2. **Unit Tests** - Test components and theme system
3. **Documentation Site** - Build comprehensive docs
4. **Component Variants** - Add more example components
5. **Theme Builder** - Interactive theme creation tool
6. **E2E Tests** - Test real user workflows

## Conclusion

This architecture achieves true OCP by:
- Separating data (themes, constants) from logic
- Using proven React patterns (composition, render props, slots)
- Organizing code semantically
- Making extensibility a first-class concern
- Maintaining type safety throughout
- Keeping accessibility and performance in mind
