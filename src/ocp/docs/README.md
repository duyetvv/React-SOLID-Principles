# Open/Closed Principle (OCP) - Implementation Guide

## Overview

This folder demonstrates the **Open/Closed Principle** from SOLID principles: *"Software entities should be open for extension but closed for modification."*

## Folder Structure

```
ocp/
├── components/                 # Reusable components (open for extension via props)
│   ├── Button/
│   │   ├── Button.tsx         # Core button component
│   │   ├── Button.scss        # Component-scoped styles
│   │   └── index.ts           # Barrel export
│   ├── List/
│   │   ├── List.tsx           # Generic list component with render props
│   │   ├── List.scss          # Component-scoped styles
│   │   └── index.ts           # Barrel export
│   ├── Modal/
│   │   ├── Modal.tsx          # Slot-based modal component
│   │   ├── Modal.scss         # Component-scoped styles
│   │   └── index.ts           # Barrel export
│   └── index.ts               # Barrel export for all components
│
├── core/                       # Core functionality (types, constants, themes)
│   ├── constants/
│   │   ├── index.ts           # DEFAULTS, CSS_CLASSES, ARIA_LABELS, KEYBOARD_KEYS
│   │   └── mockData.ts        # Mock data for examples
│   ├── types/
│   │   └── index.ts           # All TypeScript interfaces and types
│   └── themes/
│       ├── buttonTheme.ts     # Theme system utilities & default theme
│       ├── buttonThemes.ts    # Example themes (DARK, EXTENDED, GRADIENT, BRAND)
│       └── index.ts           # Barrel export for all themes
│
├── styles/                     # Global styles for OCP section
│   └── index.scss             # Main stylesheet
│
├── docs/                       # Documentation files
│   ├── ARCHITECTURE.md        # Architecture and design decisions
│   ├── BUTTON.md              # Button component documentation
│   ├── LIST.md                # List component documentation
│   ├── MODAL.md               # Modal component documentation
│   └── THEMES.md              # Theme system documentation
│
├── index.tsx                  # Main example component
└── App.tsx                    # (external) App that imports this
```

## Key Principles Demonstrated

### 1. **Button Component - Composition & Theme System**

**Problem:** How do we add new button variants without modifying component code?

**Solution:** Pass themes as configuration objects

```typescript
// ❌ NOT Open/Closed - requires code modification
const buttonVariants = {
  primary: { bg: 'blue' },
  secondary: { bg: 'gray' },
  // Need to add custom variant? Must modify code!
};

// ✅ Open/Closed - extend via themes
<Button theme={CUSTOM_THEME} variant="custom">Click</Button>

// CUSTOM_THEME can be defined anywhere without touching Button component
```

**Import Path:**
```typescript
import { Button } from './components';
import { EXTENDED_THEME, DARK_THEME, BRAND_THEME } from './core/themes';
```

### 2. **List Component - Render Props Pattern**

**Problem:** How do we make List flexible for different item rendering without modification?

**Solution:** Accept `renderItem` callback for item rendering logic

```typescript
// Component is closed to modification of list logic
// Component is open for extension via renderItem callback
<List
  items={users}
  renderItem={(user) => <UserCard user={user} />}  // Custom rendering!
  keyExtractor={(user) => user.id}
/>

// Different use case? Just pass a different renderItem
<List
  items={products}
  renderItem={(product) => <ProductCard product={product} />}  // Still works!
  keyExtractor={(product) => product.id}
/>
```

**Import Path:**
```typescript
import { List } from './components';
```

### 3. **Modal Component - Slot Pattern**

**Problem:** How do we extend modal content and actions without modification?

**Solution:** Accept slots (children + footer) for custom content

```typescript
<Modal
  title="Delete Item?"
  isOpen={isOpen}
  onClose={handleClose}
  footer={
    <div>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </div>
  }
>
  <p>Custom content here - no modification to Modal needed!</p>
</Modal>
```

**Import Path:**
```typescript
import { Modal } from './components';
```

## Core Types

All types are defined in `core/types/index.ts`:

```typescript
// Component Props
interface ButtonProps { /* ... */ }
interface ListProps<T> { /* ... */ }
interface ModalProps { /* ... */ }

// Theme Types (enables unlimited customization)
interface ButtonVariantStyle { /* ... */ }
interface ButtonTheme {
  [variantName: string]: ButtonVariantStyle;  // Unlimited variants!
}
```

## Constants

Centralized configuration in `core/constants/index.ts`:

```typescript
const DEFAULTS = {
  BUTTON_VARIANT: 'primary',
  BUTTON_SIZE: 'medium',
  MODAL_SIZE: 'medium',
  // ...
};

const CSS_CLASSES = {
  // Semantic class names
};

const ARIA_LABELS = {
  // Accessibility labels
};

const KEYBOARD_KEYS = {
  // Keyboard event codes
};
```

## Theme System

The theme system is the **core of true OCP implementation** for the Button component.

### How It Works

1. **Define a theme** (anywhere, even outside the component):
   ```typescript
   const MY_THEME = {
     primary: { backgroundColor: '#blue', color: '#white' },
     secondary: { backgroundColor: '#gray', color: '#black' },
   };
   ```

2. **Pass to Button component**:
   ```typescript
   <Button theme={MY_THEME} variant="primary">Click</Button>
   ```

3. **Button reads theme at runtime** and generates inline styles - no code modification needed!

### Available Themes

- **DEFAULT_BUTTON_THEME**: Built-in primary, secondary, danger variants
- **DARK_THEME**: Dark mode colors for professional applications
- **EXTENDED_THEME**: Adds success, warning, info to default theme
- **GRADIENT_THEME**: Modern gradient buttons
- **BRAND_THEME**: Company-specific branding

**Create unlimited themes - Button component never changes!**

## Import Patterns

### Recommended Imports

```typescript
// Components
import { Button, List, Modal } from './components';

// Types (if needed in your own types)
import type { ButtonProps, ListProps, ModalProps } from './core/types';

// Constants
import { DEFAULTS, CSS_CLASSES } from './core/constants';

// Themes
import { DEFAULT_BUTTON_THEME, DARK_THEME } from './core/themes';
```

### Why This Organization?

- **Barrel exports** reduce import clutter
- **Semantic paths** make it clear what's what
- **Clear separation of concerns** (components, core, styles)
- **Easy to extend** - themes, constants, types are all isolated
- **Follows React best practices** - industry-standard structure

## How to Extend

### Add a New Button Theme

1. Create theme in `core/themes/buttonThemes.ts`
2. Export it from `core/themes/index.ts`
3. Use it immediately - no other changes needed!

```typescript
// In buttonThemes.ts
export const GLASSMORPHISM_THEME: ButtonTheme = {
  primary: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    // ...
  },
};
```

### Add a New List Item Type

1. Just pass a different `renderItem` callback - no component changes!

```typescript
<List
  items={newDataType}
  renderItem={(item) => /* custom rendering */}
  keyExtractor={(item) => item.id}
/>
```

### Add New Modal Footer Actions

1. Just pass different footer prop - no component changes!

```typescript
<Modal footer={<MyCustomFooter />}>
  Content here
</Modal>
```

## Design Patterns Used

| Component | Pattern | Why? |
|-----------|---------|------|
| **Button** | Composition + Theme System | Unlimited customization without code modification |
| **List** | Render Props + Generics | Flexible rendering for any data type |
| **Modal** | Slots (children + footer) | Extensible footer and content areas |

## Benefits of This Organization

✅ **Truly Open/Closed** - Extend without modifying component code  
✅ **Type Safe** - Full TypeScript support  
✅ **Maintainable** - Clear file organization and responsibilities  
✅ **Scalable** - Easy to add new themes, components, constants  
✅ **Testable** - Isolated concerns make unit testing easier  
✅ **Reusable** - Barrel exports and consistent imports  

## Common Tasks

### Want to use a different button theme?
```typescript
import { DARK_THEME } from './core/themes';
<Button theme={DARK_THEME}>Dark Button</Button>
```

### Want custom button styles?
```typescript
const MY_THEME = { primary: { backgroundColor: '#custom' } };
<Button theme={MY_THEME}>Custom Button</Button>
```

### Want to render a different list item type?
```typescript
<List items={items} renderItem={(item) => <CustomItemView item={item} />} />
```

### Want modal with custom actions?
```typescript
<Modal footer={<MyCustomFooter />}>Content</Modal>
```

## Related Documentation

- [Button Component](./BUTTON.md) - Detailed Button implementation
- [List Component](./LIST.md) - Detailed List implementation
- [Modal Component](./MODAL.md) - Detailed Modal implementation
- [Theme System](./THEMES.md) - Complete theme documentation
- [Architecture Decisions](./ARCHITECTURE.md) - Why these patterns were chosen
