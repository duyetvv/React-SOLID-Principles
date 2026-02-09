# Button Component Documentation

## Overview

The Button component demonstrates **Composition Pattern** combined with a **Theme System** to achieve true Open/Closed Principle implementation.

```typescript
import { Button } from './components';
```

## Core Concept

Instead of hardcoding button variants in the component code:

```typescript
// ❌ NOT OCP - requires code modification
function Button({ variant = 'primary' }) {
  const styles = {
    primary: { bg: 'blue', color: 'white' },
    secondary: { bg: 'gray', color: 'black' },
    // Adding new variant? Must modify component!
  };
}
```

We accept themes as configuration:

```typescript
// ✅ OCP - extend via theme data
function Button({ theme = DEFAULT_BUTTON_THEME, variant = 'primary' }) {
  const variantStyle = theme[variant];  // Theme defines styles, not code
}
```

## Props

### Required Props
None - Button works with just `children`

### Optional Props

```typescript
interface ButtonProps {
  // Content
  children?: React.ReactNode;
  
  // Styling
  variant?: string;              // Must exist in theme (default: 'primary')
  theme?: ButtonTheme;           // Custom theme object (default: DEFAULT_BUTTON_THEME)
  size?: 'small' | 'medium' | 'large';  // Size variant (default: 'medium')
  
  // Icons
  startIcon?: React.ReactNode;   // Icon before text
  endIcon?: React.ReactNode;     // Icon after text
  
  // State
  disabled?: boolean;            // Disable button
  
  // Events
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  
  // HTML attributes
  className?: string;            // Additional CSS classes
  type?: 'button' | 'submit' | 'reset';  // Button type
}
```

## Theme System

### ButtonTheme Type

```typescript
interface ButtonTheme {
  [variantName: string]: ButtonVariantStyle;
}

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
  // ... any CSS property as camelCase
}
```

**Key Feature:** Theme is an object where keys are variant names and values are styles!

### Default Theme

```typescript
const DEFAULT_BUTTON_THEME: ButtonTheme = {
  primary: {
    backgroundColor: '#0066cc',
    color: '#ffffff',
    hoverBackgroundColor: '#0052a3',
    activeBackgroundColor: '#003d7a',
    // ...
  },
  secondary: {
    backgroundColor: '#6c757d',
    color: '#ffffff',
    hoverBackgroundColor: '#5a6268',
    activeBackgroundColor: '#4e555b',
  },
  danger: {
    backgroundColor: '#dc3545',
    color: '#ffffff',
    hoverBackgroundColor: '#c82333',
    activeBackgroundColor: '#bd2130',
  },
};
```

## Usage Examples

### Basic Button

```typescript
<Button onClick={() => console.log('clicked')}>
  Click me
</Button>
```

### With Variant

```typescript
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Delete</Button>
```

### With Icons

```typescript
<Button startIcon={<span>👋</span>}>
  Say Hello
</Button>

<Button endIcon={<span>→</span>}>
  Next
</Button>
```

### With Size

```typescript
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>
```

### Custom Theme

```typescript
const DARK_THEME: ButtonTheme = {
  primary: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    hoverBackgroundColor: '#333',
  },
};

<Button theme={DARK_THEME} variant="primary">
  Dark Button
</Button>
```

### Creating Your Own Theme

```typescript
const MY_BRAND_THEME: ButtonTheme = {
  // New variant - no component modification needed!
  brand_primary: {
    backgroundColor: '#ff6b35',
    color: '#fff',
    hoverBackgroundColor: '#e55a2b',
    borderRadius: '8px',
    fontWeight: 'bold',
  },
  brand_secondary: {
    backgroundColor: '#004e89',
    color: '#fff',
    hoverBackgroundColor: '#003d6e',
  },
};

// Use immediately!
<Button theme={MY_BRAND_THEME} variant="brand_primary">
  Brand Button
</Button>
```

## Advanced Usage

### Merging Themes

Extend existing themes:

```typescript
import { mergeButtonThemes, DEFAULT_BUTTON_THEME } from './core/themes';

const EXTENDED_THEME = mergeButtonThemes({
  success: {
    backgroundColor: '#28a745',
    color: '#fff',
  },
  warning: {
    backgroundColor: '#ffc107',
    color: '#000',
  },
});

// Has all default variants PLUS new ones!
<Button theme={EXTENDED_THEME} variant="success">Success</Button>
<Button theme={EXTENDED_THEME} variant="primary">Primary</Button>
```

### Theme Utilities

```typescript
import { 
  getVariantStyle,
  generateVariantStyles,
  createThemedButton 
} from './core/themes';

// Get a specific variant style
const primaryStyle = getVariantStyle(MY_THEME, 'primary');

// Generate all variant styles as CSS
const css = generateVariantStyles(MY_THEME);

// Create a pre-themed button component
const ThemedButton = createThemedButton(MY_THEME);
<ThemedButton variant="primary">Click</ThemedButton>
```

## Implementation Details

### How Theme Styling Works

1. **Theme passed to Button**
   ```typescript
   <Button theme={DARK_THEME} variant="primary">
   ```

2. **Button extracts variant styles**
   ```typescript
   const variantStyle = theme[variant];  // Gets DARK_THEME.primary
   ```

3. **Button applies styles inline**
   ```typescript
   <button style={variantStyle}>...</button>
   ```

4. **Hover/Active states handled via CSS**
   ```typescript
   &:hover { background-color: ${theme.primary.hoverBackgroundColor}; }
   &:active { background-color: ${theme.primary.activeBackgroundColor}; }
   ```

### Component Structure

```typescript
export const Button = React.memo(
  React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, theme = DEFAULT_BUTTON_THEME, variant = 'primary', ...props }, ref) => {
      const variantStyle = getVariantStyle(theme, variant);
      
      return (
        <button
          ref={ref}
          style={variantStyle}
          className={CSS_CLASSES.BUTTON}
          {...props}
        >
          {props.startIcon && <span>{props.startIcon}</span>}
          {children}
          {props.endIcon && <span>{props.endIcon}</span>}
        </button>
      );
    }
  )
);
```

## Accessibility

- ✅ Proper `<button>` element (not styled `<div>`)
- ✅ Supports `disabled` attribute
- ✅ Full keyboard support (Tab, Enter, Space)
- ✅ Focus visible state (with CSS)
- ✅ ARIA attributes for icons if needed

## Performance

- ✅ Memoized with `React.memo` - prevents unnecessary re-renders
- ✅ Theme object should be stable (defined outside component)
- ✅ Inline styles efficiently applied
- ✅ No expensive computations

**Best Practice:**
```typescript
// ✅ Good - theme defined outside, memoized
const THEME = { primary: { ... } };
function App() {
  return <Button theme={THEME}>Click</Button>;
}

// ❌ Avoid - new object each render
function App() {
  return <Button theme={{ primary: { ... } }}>Click</Button>;
}
```

## Common Patterns

### Button Group

```typescript
function ButtonGroup() {
  return (
    <div className="button-group">
      <Button variant="primary">Save</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="danger">Delete</Button>
    </div>
  );
}
```

### Toggle Button State

```typescript
function ToggleButton() {
  const [active, setActive] = useState(false);
  const theme = active ? DARK_THEME : DEFAULT_BUTTON_THEME;
  
  return (
    <Button 
      theme={theme}
      onClick={() => setActive(!active)}
    >
      {active ? 'Active' : 'Inactive'}
    </Button>
  );
}
```

### Loading Button

```typescript
function LoadingButton() {
  const [loading, setLoading] = useState(false);
  
  return (
    <Button 
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        await doSomething();
        setLoading(false);
      }}
    >
      {loading ? 'Loading...' : 'Click me'}
    </Button>
  );
}
```

## Extending the Button

### Add New Default Variant?
Just pass a new theme - no code change needed!

### Add New Behavior?
Use React composition:

```typescript
// ✅ Better than modifying Button
function IconButton({ icon, ...props }: ButtonProps & { icon: React.ReactNode }) {
  return <Button startIcon={icon} {...props} />;
}

function LoadingButton({ isLoading, ...props }: ButtonProps & { isLoading: boolean }) {
  return <Button disabled={isLoading} {...props}>{isLoading ? 'Loading...' : props.children}</Button>;
}
```

## Styling

### Component Styles (Button.scss)

```scss
.button {
  // Base button styles
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.button--small {
  padding: 6px 12px;
  font-size: 12px;
}

.button--medium {
  padding: 10px 16px;
  font-size: 14px;
}

.button--large {
  padding: 12px 24px;
  font-size: 16px;
}
```

### Size Variants

Sizes are NOT in theme (they're structural, not stylistic):

```typescript
const SIZES = {
  small: 'button--small',
  medium: 'button--medium',
  large: 'button--large',
};

<button className={SIZES[size]}>
```

## Testing

### Unit Test Example

```typescript
describe('Button', () => {
  it('renders with default theme', () => {
    const { getByRole } = render(<Button>Click</Button>);
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
  });
  
  it('applies custom theme', () => {
    const { getByRole } = render(
      <Button theme={DARK_THEME} variant="primary">
        Dark
      </Button>
    );
    const button = getByRole('button');
    expect(button).toHaveStyle('background-color: #1a1a1a');
  });
  
  it('calls onClick handler', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Button onClick={onClick}>Click</Button>
    );
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

## TypeScript Support

Full TypeScript support with proper types:

```typescript
const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
  console.log(e.currentTarget);
};

<Button onClick={handleClick}>Typed</Button>
```

## Summary

| Aspect | Benefit | Example |
|--------|---------|---------|
| **Theme System** | Unlimited variants without code | `<Button theme={MY_THEME} variant="custom">` |
| **Composition** | Flexible content | `<Button startIcon={icon}>Text</Button>` |
| **Size Options** | Layout flexibility | `<Button size="large">` |
| **Memoization** | Performance | Re-renders prevented with `React.memo` |
| **Keyboard Support** | Accessibility | Enter, Space, Tab keys work |
| **Type Safe** | Developer experience | Full TypeScript support |

---

**See also:** [Theme System Documentation](./THEMES.md)
