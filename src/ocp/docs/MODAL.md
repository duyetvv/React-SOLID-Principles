# Modal Component Documentation

## Overview

The Modal component demonstrates the **Slots Pattern** to achieve extensible modal footer and content without component modification.

```typescript
import { Modal } from './components';
```

## Core Concept

Instead of hardcoding modal structure:

```typescript
// ❌ NOT OCP - limited customization
function Modal({ title, message }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{message}</p>
      <button>OK</button>
    </div>
  );
}
```

We accept slots for flexible structure:

```typescript
// ✅ OCP - caller controls content and actions
function Modal({ title, children, footer }) {
  return (
    <div>
      <h2>{title}</h2>
      {children}          {/* Custom content */}
      <div>{footer}</div> {/* Custom actions */}
    </div>
  );
}
```

## Props

```typescript
interface ModalProps {
  // Content
  title: string;                          // Modal title
  children: React.ReactNode;              // Modal body content
  footer?: React.ReactNode;               // Footer actions/content
  
  // State
  isOpen: boolean;                        // Show/hide modal
  
  // Size
  size?: 'small' | 'medium' | 'large';   // Modal size (default: 'medium')
  
  // Behavior
  closeOnEsc?: boolean;                   // Close when ESC pressed (default: true)
  closeOnBackdropClick?: boolean;         // Close when backdrop clicked (default: false)
  
  // Events
  onClose: () => void;                    // Called when modal should close
}
```

## Usage Examples

### Basic Modal

```typescript
import { Modal, Button } from './components';
import { useState } from 'react';

function BasicModal() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        title="Welcome"
        onClose={() => setIsOpen(false)}
      >
        <p>This is a basic modal with just content.</p>
      </Modal>
    </>
  );
}
```

### Modal with Footer

```typescript
<Modal
  isOpen={isOpen}
  title="Confirm Action"
  onClose={() => setIsOpen(false)}
  footer={
    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
      <Button variant="secondary" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={() => { handleConfirm(); setIsOpen(false); }}>
        Confirm
      </Button>
    </div>
  }
>
  <p>Are you sure you want to proceed?</p>
</Modal>
```

### Modal with Different Sizes

```typescript
// Small modal
<Modal
  isOpen={isOpen}
  title="Quick Note"
  size="small"
  onClose={() => setIsOpen(false)}
>
  Content here
</Modal>

// Large modal with lots of content
<Modal
  isOpen={isOpen}
  title="Settings"
  size="large"
  onClose={() => setIsOpen(false)}
>
  <SettingsForm />
</Modal>
```

### Modal with ESC and Backdrop

```typescript
<Modal
  isOpen={isOpen}
  title="Delete Item"
  closeOnEsc={true}           // ESC key closes
  closeOnBackdropClick={true} // Clicking backdrop closes
  onClose={() => setIsOpen(false)}
  footer={
    <div>
      <Button onClick={() => setIsOpen(false)}>Cancel</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </div>
  }
>
  <p>This action cannot be undone!</p>
</Modal>
```

### Complex Modal with Forms

```typescript
function FormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>New User</Button>
      <Modal
        isOpen={isOpen}
        title="Create User"
        size="medium"
        onClose={() => setIsOpen(false)}
        footer={
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="primary"
              onClick={() => { handleCreateUser(formData); setIsOpen(false); }}
            >
              Create
            </Button>
          </div>
        }
      >
        <form>
          <div>
            <label>Name:</label>
            <input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </form>
      </Modal>
    </>
  );
}
```

## Implementation Details

### Component Structure

```typescript
export const Modal = React.memo(function Modal({
  title,
  children,
  footer,
  isOpen,
  size = 'medium',
  closeOnEsc = true,
  closeOnBackdropClick = false,
  onClose,
}: ModalProps) {
  // Prevent body scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  return (
    <div className={CSS_CLASSES.MODAL_BACKDROP} onClick={() => closeOnBackdropClick && onClose()}>
      <div
        className={`${CSS_CLASSES.MODAL_CONTENT} ${CSS_CLASSES[`MODAL_SIZE_${size}`]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={CSS_CLASSES.MODAL_HEADER}>
          <h2>{title}</h2>
          <button onClick={onClose} aria-label="Close modal">×</button>
        </div>
        <div className={CSS_CLASSES.MODAL_BODY}>{children}</div>
        {footer && <div className={CSS_CLASSES.MODAL_FOOTER}>{footer}</div>}
      </div>
    </div>
  );
});
```

### Key Features

1. **Body Scroll Prevention** - Prevents scrolling when modal is open
2. **ESC Key Handling** - Close modal by pressing ESC
3. **Backdrop Click** - Optional close on backdrop click
4. **Focus Trap** - Keep focus within modal
5. **Accessibility** - ARIA labels and semantic HTML

## Size Variants

### Small

```typescript
<Modal size="small" {...props}>
  Quick dialogs, confirmations, small forms
</Modal>
```

**Size:** ~400px wide on desktop

### Medium (default)

```typescript
<Modal size="medium" {...props}>
  Standard modals, forms, messages
</Modal>
```

**Size:** ~600px wide on desktop

### Large

```typescript
<Modal size="large" {...props}>
  Complex forms, settings, detailed content
</Modal>
```

**Size:** ~900px wide on desktop

## Styling

### Modal Styles (Modal.scss)

```scss
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.modal--small {
  width: 400px;
}

.modal--medium {
  width: 600px;
}

.modal--large {
  width: 900px;
}
```

## Common Patterns

### Confirmation Modal

```typescript
function ConfirmModal() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Delete</Button>
      <Modal
        isOpen={isOpen}
        title="Delete Item?"
        size="small"
        closeOnEsc
        closeOnBackdropClick
        onClose={() => setIsOpen(false)}
        footer={
          <div>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => { handleDelete(); setIsOpen(false); }}>
              Delete
            </Button>
          </div>
        }
      >
        <p>This action cannot be undone.</p>
      </Modal>
    </>
  );
}
```

### Edit Modal

```typescript
function EditModal({ user, onSave }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(user);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Edit</Button>
      <Modal
        isOpen={isOpen}
        title={`Edit ${user.name}`}
        size="medium"
        onClose={() => setIsOpen(false)}
        footer={
          <div>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="primary"
              onClick={() => {
                onSave(formData);
                setIsOpen(false);
              }}
            >
              Save
            </Button>
          </div>
        }
      >
        <UserEditForm user={formData} onChange={setFormData} />
      </Modal>
    </>
  );
}
```

### Alert Modal

```typescript
function AlertModal({ message, onConfirm }) {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <Modal
      isOpen={isOpen}
      title="Alert"
      size="small"
      closeOnEsc
      closeOnBackdropClick
      onClose={() => setIsOpen(false)}
      footer={
        <Button onClick={() => { onConfirm?.(); setIsOpen(false); }}>
          OK
        </Button>
      }
    >
      <p>{message}</p>
    </Modal>
  );
}
```

### Wizard Modal (Multi-step)

```typescript
function WizardModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Start Wizard</Button>
      <Modal
        isOpen={isOpen}
        title={`Step ${step} of 3`}
        size="large"
        onClose={() => setIsOpen(false)}
        footer={
          <div>
            <Button 
              disabled={step === 1}
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
            <Button 
              variant={step === 3 ? 'primary' : 'secondary'}
              onClick={() => {
                if (step === 3) {
                  handleComplete();
                  setIsOpen(false);
                } else {
                  setStep(step + 1);
                }
              }}
            >
              {step === 3 ? 'Finish' : 'Next'}
            </Button>
          </div>
        }
      >
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
      </Modal>
    </>
  );
}
```

## Accessibility

### Built-in Features

- ✅ Semantic HTML structure
- ✅ ARIA labels and roles
- ✅ ESC key support
- ✅ Focus management
- ✅ Backdrop click detection
- ✅ Body scroll prevention

### Best Practices

```typescript
// ✅ Good - provide meaningful title
<Modal title="Delete Item?" {...props}>
  Are you sure?
</Modal>

// ✅ Good - footer with clear actions
<Modal
  {...props}
  footer={
    <Button>OK</Button>
    <Button>Cancel</Button>
  }
>
  Content
</Modal>

// ✅ Good - ESC and backdrop for easy dismissal
<Modal closeOnEsc closeOnBackdropClick {...props}>
  Content
</Modal>
```

## Performance

- ✅ Memoized with `React.memo`
- ✅ Only renders when `isOpen` is true
- ✅ Event listeners cleanup properly
- ✅ No unnecessary re-renders

## Testing

### Unit Test Example

```typescript
describe('Modal', () => {
  it('renders when isOpen is true', () => {
    const { getByText } = render(
      <Modal isOpen={true} title="Test" onClose={() => {}}>
        Content
      </Modal>
    );
    expect(getByText('Content')).toBeInTheDocument();
  });
  
  it('does not render when isOpen is false', () => {
    const { queryByText } = render(
      <Modal isOpen={false} title="Test" onClose={() => {}}>
        Content
      </Modal>
    );
    expect(queryByText('Content')).not.toBeInTheDocument();
  });
  
  it('calls onClose when ESC pressed', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={true} title="Test" onClose={onClose} closeOnEsc>
        Content
      </Modal>
    );
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });
  
  it('renders footer if provided', () => {
    const { getByText } = render(
      <Modal 
        isOpen={true} 
        title="Test" 
        onClose={() => {}}
        footer={<button>Action</button>}
      >
        Content
      </Modal>
    );
    expect(getByText('Action')).toBeInTheDocument();
  });
});
```

## Common Issues

### Issue: Body Scroll Not Prevented

```typescript
// ✅ Works - overflow is properly reset
<Modal isOpen={isOpen} onClose={handleClose}>
  Content
</Modal>

// The component automatically handles body.style.overflow
```

### Issue: Modal Not Closing on ESC

```typescript
// ✅ Make sure closeOnEsc is true
<Modal closeOnEsc={true} onClose={handleClose} {...props}>
  Content
</Modal>

// ✅ Make sure onClose actually closes it
const [isOpen, setIsOpen] = useState(false);
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
```

### Issue: Backdrop Click Not Working

```typescript
// ✅ Make sure closeOnBackdropClick is true
<Modal closeOnBackdropClick={true} onClose={handleClose} {...props}>
  Content
</Modal>
```

## Extending the Modal

### Custom Modal Hook

```typescript
function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  
  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(!isOpen),
  };
}

// Usage
function MyComponent() {
  const modal = useModal();
  
  return (
    <>
      <Button onClick={modal.open}>Open</Button>
      <Modal isOpen={modal.isOpen} onClose={modal.close}>
        Content
      </Modal>
    </>
  );
}
```

### Modal Composition

```typescript
// Create specialized modals without touching Modal component
function ConfirmModal({ title, message, onConfirm, ...props }) {
  return (
    <Modal title={title} {...props}>
      {message}
      <div style={{ marginTop: '20px' }}>
        <Button variant="secondary" onClick={props.onClose}>
          No
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Yes
        </Button>
      </div>
    </Modal>
  );
}
```

## Summary

| Feature | Benefit | Example |
|---------|---------|---------|
| **Slots** | Any content and footer | `<Modal footer={<Actions />}>` |
| **Size Options** | Layout flexibility | `size="large"` |
| **ESC Support** | Easy dismissal | `closeOnEsc={true}` |
| **Backdrop Click** | Alternative close | `closeOnBackdropClick={true}` |
| **Body Scroll Prevention** | Better UX | Automatic |
| **Accessibility** | Inclusive design | ARIA labels included |

---

**See also:** [Button Component](./BUTTON.md), [List Component](./LIST.md)
