# Theme System Documentation

## Overview

The theme system is the core mechanism that enables true **Open/Closed Principle** for the Button component. Instead of hardcoding variants in component code, themes are passed as configuration data.

```typescript
import { 
  DEFAULT_BUTTON_THEME,
  mergeButtonThemes,
  getVariantStyle,
} from './core/themes';
```

## Core Concept

### The Problem: Hardcoded Variants

```typescript
// ❌ Violates OCP - hardcoded in component
function Button({ variant = 'primary' }) {
  const colors = {
    primary: { bg: 'blue' },
    secondary: { bg: 'gray' },
    danger: { bg: 'red' },
    // Need custom variant? Must modify Button.tsx!
  };
}
```

### The Solution: Data-Driven Themes

```typescript
// ✅ True OCP - themes are data
interface ButtonTheme {
  [variantName: string]: ButtonVariantStyle;
}

// Button stays unchanged, themes are just data objects
<Button theme={MY_CUSTOM_THEME} variant="custom" />
```

## Theme Structure

### ButtonTheme Type

```typescript
type ButtonTheme = {
  [variantName: string]: ButtonVariantStyle;
};
```

**Key Insight:** Theme is a JavaScript object where:
- **Keys** = variant names (any string)
- **Values** = style objects for that variant

### ButtonVariantStyle Type

```typescript
interface ButtonVariantStyle {
  backgroundColor?: string;
  color?: string;
  hoverBackgroundColor?: string;
  activeBackgroundColor?: string;
  borderRadius?: string;
  border?: string;
  fontSize?: string;
  padding?: string;
  fontWeight?: string;
  letterSpacing?: string;
  textTransform?: string;
  boxShadow?: string;
  transition?: string;
  cursor?: string;
  opacity?: string;
  transform?: string;
  [key: string]: string | undefined;
}
```

## Built-in Themes

### DEFAULT_BUTTON_THEME

The default theme with primary, secondary, and danger variants:

```typescript
const DEFAULT_BUTTON_THEME: ButtonTheme = {
  primary: {
    backgroundColor: '#0066cc',
    color: '#ffffff',
    hoverBackgroundColor: '#0052a3',
    activeBackgroundColor: '#003d7a',
    borderRadius: '4px',
    border: 'none',
    fontSize: '14px',
    padding: '10px 16px',
  },
  secondary: {
    backgroundColor: '#6c757d',
    color: '#ffffff',
    hoverBackgroundColor: '#5a6268',
    activeBackgroundColor: '#4e555b',
    borderRadius: '4px',
    border: 'none',
    fontSize: '14px',
    padding: '10px 16px',
  },
  danger: {
    backgroundColor: '#dc3545',
    color: '#ffffff',
    hoverBackgroundColor: '#c82333',
    activeBackgroundColor: '#bd2130',
    borderRadius: '4px',
    border: 'none',
    fontSize: '14px',
    padding: '10px 16px',
  },
};
```

### DARK_THEME

Professional dark theme:

```typescript
export const DARK_THEME: ButtonTheme = {
  primary: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    hoverBackgroundColor: '#333',
    activeBackgroundColor: '#555',
  },
  secondary: {
    backgroundColor: '#444',
    color: '#fff',
    hoverBackgroundColor: '#666',
    activeBackgroundColor: '#888',
  },
  // ... more variants
};
```

### EXTENDED_THEME

Default theme extended with success, warning, info variants:

```typescript
export const EXTENDED_THEME: ButtonTheme = mergeButtonThemes({
  success: {
    backgroundColor: '#28a745',
    color: '#white',
    hoverBackgroundColor: '#218838',
  },
  warning: {
    backgroundColor: '#ffc107',
    color: '#000',
    hoverBackgroundColor: '#e0a800',
  },
  info: {
    backgroundColor: '#17a2b8',
    color: '#white',
    hoverBackgroundColor: '#138496',
  },
});
```

### GRADIENT_THEME

Modern gradient buttons:

```typescript
export const GRADIENT_THEME: ButtonTheme = {
  gradient: {
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
  },
  neon: {
    backgroundColor: '#00ff00',
    color: '#000',
    hoverBackgroundColor: '#00cc00',
  },
};
```

### BRAND_THEME

Company-specific branding:

```typescript
export const BRAND_THEME: ButtonTheme = {
  brand_primary: {
    backgroundColor: '#ff6b35',
    color: '#fff',
    hoverBackgroundColor: '#e55a2b',
    activeBackgroundColor: '#cc4922',
  },
  brand_secondary: {
    backgroundColor: '#004e89',
    color: '#fff',
    hoverBackgroundColor: '#003d6e',
    activeBackgroundColor: '#002d53',
  },
};
```

## Theme Utilities

### mergeButtonThemes

Merge custom variants with default theme:

```typescript
const EXTENDED = mergeButtonThemes({
  custom: { backgroundColor: '#custom' },
  success: { backgroundColor: '#28a745' },
});

// EXTENDED has all DEFAULT variants PLUS custom ones
<Button theme={EXTENDED} variant="primary">Primary</Button>  // Works!
<Button theme={EXTENDED} variant="custom">Custom</Button>   // Works!
```

**Implementation:**
```typescript
export function mergeButtonThemes(
  customTheme: ButtonTheme
): ButtonTheme {
  return {
    ...DEFAULT_BUTTON_THEME,
    ...customTheme,
  };
}
```

### getVariantStyle

Get the style object for a specific variant:

```typescript
const primaryStyle = getVariantStyle(MY_THEME, 'primary');
// Returns: { backgroundColor: '...', color: '...', ... }

// Default if variant not found
const style = getVariantStyle(MY_THEME, 'nonexistent');
// Returns: DEFAULT_BUTTON_THEME.primary
```

**Implementation:**
```typescript
export function getVariantStyle(
  theme: ButtonTheme,
  variant: string
): ButtonVariantStyle {
  return theme[variant] || DEFAULT_BUTTON_THEME.primary;
}
```

### generateVariantStyles

Generate CSS for all theme variants:

```typescript
const css = generateVariantStyles(MY_THEME);
// Returns CSS string with all variant definitions
```

**Implementation:**
```typescript
export function generateVariantStyles(theme: ButtonTheme): string {
  let css = '';
  Object.entries(theme).forEach(([variant, styles]) => {
    css += `.button--${variant} { ... }`;
  });
  return css;
}
```

### createThemedButton

Create a pre-themed Button component:

```typescript
const DarkButton = createThemedButton(DARK_THEME);

// Now DarkButton always uses DARK_THEME
<DarkButton variant="primary">Click</DarkButton>
```

**Implementation:**
```typescript
export function createThemedButton(theme: ButtonTheme) {
  return (props: ButtonProps) => <Button {...props} theme={theme} />;
}
```

## Creating Custom Themes

### Simple Custom Theme

Create any theme object with any variant names:

```typescript
const MY_THEME: ButtonTheme = {
  action: {
    backgroundColor: '#ff6b35',
    color: '#fff',
    hoverBackgroundColor: '#e55a2b',
  },
  cancel: {
    backgroundColor: '#95e1d3',
    color: '#000',
    hoverBackgroundColor: '#7dd4c5',
  },
  link: {
    backgroundColor: 'transparent',
    color: '#0066cc',
    border: '1px solid #0066cc',
    hoverBackgroundColor: '#f0f0f0',
  },
};

<Button theme={MY_THEME} variant="action">Action</Button>
<Button theme={MY_THEME} variant="cancel">Cancel</Button>
<Button theme={MY_THEME} variant="link">Link</Button>
```

### Theme with Multiple Variants

```typescript
const STATUS_THEME: ButtonTheme = {
  pending: {
    backgroundColor: '#ffc107',
    color: '#000',
  },
  approved: {
    backgroundColor: '#28a745',
    color: '#fff',
  },
  rejected: {
    backgroundColor: '#dc3545',
    color: '#fff',
  },
  archived: {
    backgroundColor: '#6c757d',
    color: '#fff',
  },
};

// Use variants based on data
{status === 'pending' && <Button theme={STATUS_THEME} variant="pending">Pending</Button>}
{status === 'approved' && <Button theme={STATUS_THEME} variant="approved">Approved</Button>}
```

### Contextual Themes

Use React Context to provide theme globally:

```typescript
const ThemeContext = React.createContext<ButtonTheme>(DEFAULT_BUTTON_THEME);

export function ThemeProvider({ theme, children }: { theme: ButtonTheme; children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useButtonTheme(): ButtonTheme {
  return React.useContext(ThemeContext);
}

// Usage
<ThemeProvider theme={DARK_THEME}>
  <App />
</ThemeProvider>

// In component
function MyButton() {
  const theme = useButtonTheme();
  return <Button theme={theme}>Click</Button>;
}
```

## Advanced Patterns

### Theme Composition

Combine themes for specialized use cases:

```typescript
// Start with extended
const ADVANCED_THEME = mergeButtonThemes({
  // Add custom variants
  social_facebook: {
    backgroundColor: '#1877f2',
    color: '#fff',
  },
  social_twitter: {
    backgroundColor: '#1da1f2',
    color: '#fff',
  },
});

<Button theme={ADVANCED_THEME} variant="social_facebook">Facebook</Button>
```

### Theme Functions

Create theme factories:

```typescript
function createColorTheme(colors: Record<string, string>): ButtonTheme {
  return Object.entries(colors).reduce((theme, [name, color]) => ({
    ...theme,
    [name]: {
      backgroundColor: color,
      color: getContrastColor(color),
      hoverBackgroundColor: darken(color, 10),
    },
  }), {});
}

const COLORS = {
  red: '#e74c3c',
  green: '#2ecc71',
  blue: '#3498db',
};

const COLOR_THEME = createColorTheme(COLORS);
```

### Dynamic Themes

Generate themes based on data:

```typescript
function createUserTheme(user: User): ButtonTheme {
  return {
    primary: {
      backgroundColor: user.primaryColor,
      color: user.textColor,
    },
    secondary: {
      backgroundColor: user.secondaryColor,
      color: user.textColor,
    },
  };
}

const theme = createUserTheme(currentUser);
<Button theme={theme}>Submit</Button>
```

### Theme Overrides

Override specific variants while keeping others:

```typescript
const BASE_THEME = EXTENDED_THEME;

const OVERRIDE_THEME: ButtonTheme = {
  ...BASE_THEME,
  primary: {  // Override primary
    ...BASE_THEME.primary,
    backgroundColor: '#custom',
  },
};

<Button theme={OVERRIDE_THEME} variant="primary">Custom Primary</Button>
<Button theme={OVERRIDE_THEME} variant="success">Success (unchanged)</Button>
```

## Usage Patterns

### Single Theme for Application

```typescript
// App.tsx
import { DARK_THEME } from './core/themes';

function App() {
  return <Button theme={DARK_THEME} variant="primary">Click</Button>;
}
```

### Multiple Themes in One App

```typescript
// App.tsx
import { DEFAULT_BUTTON_THEME, DARK_THEME } from './core/themes';

function App() {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? DARK_THEME : DEFAULT_BUTTON_THEME;
  
  return (
    <>
      <Button 
        theme={theme} 
        onClick={() => setIsDark(!isDark)}
      >
        Toggle Theme
      </Button>
      <Button theme={theme} variant="primary">Primary</Button>
    </>
  );
}
```

### Theme Switching

```typescript
const THEMES = {
  light: DEFAULT_BUTTON_THEME,
  dark: DARK_THEME,
  brand: BRAND_THEME,
};

function App() {
  const [themeName, setThemeName] = useState('light');
  const theme = THEMES[themeName];
  
  return (
    <>
      <select value={themeName} onChange={(e) => setThemeName(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="brand">Brand</option>
      </select>
      <Button theme={theme}>Click me</Button>
    </>
  );
}
```

## TypeScript Support

### Full Type Safety

```typescript
// ✅ Type-safe theme creation
const MY_THEME: ButtonTheme = {
  primary: {
    backgroundColor: '#blue',
    color: '#white',
    // Full property autocomplete!
  },
};

// ✅ Type-safe usage
<Button theme={MY_THEME} variant="primary">
  {/* variant must exist in theme! */}
</Button>
```

### Theme Type Validation

```typescript
// Custom hook for type validation
function useTheme(theme: ButtonTheme, variant: string): ButtonVariantStyle {
  const style = getVariantStyle(theme, variant);
  if (!theme[variant]) {
    console.warn(`Variant "${variant}" not found in theme`);
  }
  return style;
}
```

## Performance Considerations

### Stable Theme References

```typescript
// ✅ Good - theme created outside component
const THEME = { primary: { ... } };
function App() {
  return <Button theme={THEME}>Click</Button>;
}

// ❌ Avoid - new object each render
function App() {
  return <Button theme={{ primary: { ... } }}>Click</Button>;
}
```

### Memoized Themes

```typescript
const THEME = useMemo(() => ({
  primary: { backgroundColor: computeColor() },
}), [dependency]);

<Button theme={THEME}>Click</Button>
```

## Best Practices

1. **Define themes outside components** - Ensures stable references
2. **Use constants for theme names** - Prevents typos
3. **Extract color palettes** - Easier to maintain color consistency
4. **Document theme variants** - Help team understand available options
5. **Test theme variants** - Ensure all themes render correctly
6. **Version your themes** - Track theme changes over time

## Comparison: Hardcoded vs Theme System

| Aspect | Hardcoded | Theme System |
|--------|-----------|--------------|
| **Adding Variant** | Modify component code | Create theme object |
| **Code Changes** | Yes | No |
| **Test Impact** | Entire component | Just theme data |
| **Reusability** | Single component | Any component |
| **Extensibility** | Limited | Unlimited |
| **OCP Compliance** | Violates | Compliant |

## Summary

The theme system enables true Open/Closed Principle by:
- ✅ Treating styles as data, not code
- ✅ Allowing unlimited variants without component modification
- ✅ Providing type-safe theme creation
- ✅ Supporting theme composition and merging
- ✅ Enabling runtime theme switching
- ✅ Maintaining performance through memoization

---

**See also:** [Button Component](./BUTTON.md), [Architecture Decisions](./ARCHITECTURE.md)
