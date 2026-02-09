# List Component Documentation

## Overview

The List component demonstrates the **Render Props Pattern** combined with **Generics** to achieve flexible, type-safe list rendering without component modification.

```typescript
import { List } from './components';
```

## Core Concept

Instead of hardcoding item rendering in the component:

```typescript
// ❌ NOT OCP - must modify for each item type
function List({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>  // Only works for objects with `name`
      ))}
    </ul>
  );
}
```

We accept a render callback:

```typescript
// ✅ OCP - caller controls rendering
function List<T>({ items, renderItem, keyExtractor }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={keyExtractor(item)}>
          {renderItem(item)}  {/* Caller decides how to render */}
        </li>
      ))}
    </ul>
  );
}
```

## Props

```typescript
interface ListProps<T extends Record<string, any>> {
  // Required
  items: T[];                            // Array of items to render
  renderItem: (item: T) => React.ReactNode;  // How to render each item
  keyExtractor: (item: T) => string | number;  // Unique key per item
  
  // Optional
  emptyMessage?: string;                 // Message when list is empty
  className?: string;                    // Additional CSS classes
}
```

### Generics Explanation

The `<T extends Record<string, any>>` means:
- **T** - Any type of object
- **extends Record<string, any>** - Must be an object with string keys and any values
- Provides full TypeScript support for any item type

## Usage Examples

### Basic List - Users

```typescript
import { List } from './components';

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

<List
  items={users}
  renderItem={(user) => <span>👤 {user.name}</span>}
  keyExtractor={(user) => user.id}
/>
```

### Different Type - Products

```typescript
const products = [
  { id: 1, title: 'Laptop', price: 999 },
  { id: 2, title: 'Mouse', price: 29 },
];

// ✅ Same component, completely different rendering!
<List
  items={products}
  renderItem={(product) => (
    <span>📦 {product.title} - ${product.price}</span>
  )}
  keyExtractor={(product) => product.id}
/>
```

### Complex Rendering

```typescript
<List
  items={users}
  renderItem={(user) => (
    <UserCard 
      name={user.name}
      email={user.email}
      onEdit={() => handleEdit(user)}
    />
  )}
  keyExtractor={(user) => user.id}
/>
```

### With Empty State

```typescript
<List
  items={filteredUsers}
  renderItem={(user) => <UserRow user={user} />}
  keyExtractor={(user) => user.id}
  emptyMessage="No users found. Try adjusting your filters."
/>
```

### Different Key Extraction

```typescript
// If items don't have id field
<List
  items={items}
  renderItem={(item) => <Item item={item} />}
  keyExtractor={(item) => item.email}  // Use email as key instead
/>

// Or index (only if list is static)
<List
  items={items}
  renderItem={(item) => <Item item={item} />}
  keyExtractor={(_, index) => `item-${index}`}
/>
```

## Implementation Details

### Component Structure

```typescript
export const List = React.memo(
  function List<T extends Record<string, any>>({
    items,
    renderItem,
    keyExtractor,
    emptyMessage = DEFAULTS.EMPTY_MESSAGE,
    className = '',
  }: ListProps<T>) {
    // Show empty state if no items
    if (items.length === 0) {
      return (
        <div className={`${CSS_CLASSES.LIST_EMPTY} ${className}`}>
          {emptyMessage}
        </div>
      );
    }

    // Render list items
    return (
      <ul className={`${CSS_CLASSES.LIST} ${className}`}>
        {items.map((item) => (
          <li key={keyExtractor(item)} className={CSS_CLASSES.LIST_ITEM}>
            {renderItem(item)}
          </li>
        ))}
      </ul>
    );
  }
) as <T extends Record<string, any>>(props: ListProps<T>) => React.ReactElement;
```

### Why React.memo?

List only re-renders when:
- `items` changes
- `renderItem` callback changes
- `keyExtractor` callback changes

Without `React.memo`, parent re-renders would always re-render List.

## TypeScript Patterns

### Type-Safe Rendering

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// TypeScript knows item is User!
<List<User>
  items={users}
  renderItem={(user) => (
    // ✅ Full autocomplete for user.id, user.name, user.email
    <div>{user.name} ({user.email})</div>
  )}
  keyExtractor={(user) => user.id}
/>
```

### Multiple Different Types

```typescript
interface User {
  id: number;
  name: string;
}

interface Product {
  id: number;
  title: string;
}

// ✅ Type-safe for each
<List<User>
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
  keyExtractor={(user) => user.id}
/>

<List<Product>
  items={products}
  renderItem={(product) => <span>{product.title}</span>}
  keyExtractor={(product) => product.id}
/>
```

## Common Patterns

### List with Actions

```typescript
function UserList() {
  return (
    <List
      items={users}
      renderItem={(user) => (
        <div className="user-item">
          <span>{user.name}</span>
          <button onClick={() => editUser(user.id)}>Edit</button>
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </div>
      )}
      keyExtractor={(user) => user.id}
    />
  );
}
```

### Filtered/Sorted List

```typescript
function FilteredList() {
  const [filter, setFilter] = useState('');
  
  const filtered = users.filter((user) =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );
  
  return (
    <>
      <input
        placeholder="Filter users..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <List
        items={filtered}
        renderItem={(user) => <UserItem user={user} />}
        keyExtractor={(user) => user.id}
        emptyMessage="No users match your filter"
      />
    </>
  );
}
```

### Paginated List

```typescript
function PaginatedList() {
  const [page, setPage] = useState(0);
  const itemsPerPage = 10;
  
  const start = page * itemsPerPage;
  const end = start + itemsPerPage;
  const visibleItems = users.slice(start, end);
  
  return (
    <>
      <List
        items={visibleItems}
        renderItem={(user) => <UserItem user={user} />}
        keyExtractor={(user) => user.id}
      />
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
          Previous
        </button>
        <span>Page {page + 1}</span>
        <button 
          onClick={() => setPage(page + 1)}
          disabled={end >= users.length}
        >
          Next
        </button>
      </div>
    </>
  );
}
```

### List with Details

```typescript
function ListWithDetails() {
  const [selected, setSelected] = useState<User | null>(null);
  
  return (
    <div className="list-with-details">
      <List
        items={users}
        renderItem={(user) => (
          <button
            onClick={() => setSelected(user)}
            className={selected?.id === user.id ? 'selected' : ''}
          >
            {user.name}
          </button>
        )}
        keyExtractor={(user) => user.id}
      />
      {selected && <UserDetails user={selected} />}
    </div>
  );
}
```

## Advanced Usage

### Nested Lists

```typescript
<List
  items={departments}
  renderItem={(dept) => (
    <>
      <div>{dept.name}</div>
      <List
        items={dept.employees}
        renderItem={(emp) => <div style={{ marginLeft: '20px' }}>{emp.name}</div>}
        keyExtractor={(emp) => emp.id}
      />
    </>
  )}
  keyExtractor={(dept) => dept.id}
/>
```

### List with Conditional Rendering

```typescript
<List
  items={items}
  renderItem={(item) => (
    item.type === 'user' ? (
      <UserItem user={item} />
    ) : (
      <AdminItem admin={item} />
    )
  )}
  keyExtractor={(item) => item.id}
/>
```

### List with Loading States

```typescript
function SmartList() {
  const { data, isLoading, error } = useUsers();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <List
      items={data}
      renderItem={(user) => <UserItem user={user} />}
      keyExtractor={(user) => user.id}
      emptyMessage="No users available"
    />
  );
}
```

## Styling

### List Styles (List.scss)

```scss
.list {
  list-style: none;
  padding: 0;
  margin: 0;
  
  @media (max-width: 768px) {
    padding: 0 8px;
  }
}

.list__item {
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
  
  &:hover {
    background-color: #f5f5f5;
  }
}

.list--empty {
  padding: 24px;
  text-align: center;
  color: #999;
  font-style: italic;
}
```

## Performance Considerations

### Key Extraction Best Practices

```typescript
// ✅ Good - unique and stable
<List
  items={users}
  renderItem={(user) => <UserItem user={user} />}
  keyExtractor={(user) => user.id}  // IDs don't change
/>

// ⚠️ Okay - if list is static
<List
  items={staticUsers}
  renderItem={(user) => <UserItem user={user} />}
  keyExtractor={(_, index) => index}  // Only if list never changes
/>

// ❌ Avoid - recreated each render
<List
  items={users}
  renderItem={(user) => <UserItem user={user} />}
  keyExtractor={(user) => Math.random()}  // Bad! Will cause re-renders
/>
```

### Rendering Performance

```typescript
// ✅ Memoize renderItem if complex
const userRenderer = React.useCallback(
  (user: User) => <UserCard user={user} />,
  []
);

<List
  items={users}
  renderItem={userRenderer}
  keyExtractor={(user) => user.id}
/>
```

### Large Lists

For very large lists (1000+ items), consider:
- Virtual scrolling library (react-window)
- Pagination
- Lazy loading
- Filtering to reduce visible items

```typescript
// Example: Virtual scrolling with react-window
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={largeList.length}
  itemSize={50}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>
      {renderItem(largeList[index])}
    </div>
  )}
</FixedSizeList>
```

## Accessibility

- ✅ Semantic `<ul>` and `<li>` elements
- ✅ Proper key usage for screen readers
- ✅ Empty state message is descriptive
- ✅ Interactive items within list items should be keyboard accessible

```typescript
// ✅ Good - semantic structure
<List
  items={items}
  renderItem={(item) => (
    <button onClick={() => handleSelect(item)}>
      {item.name}
    </button>
  )}
  keyExtractor={(item) => item.id}
  emptyMessage="No items available"
/>
```

## Testing

### Unit Test Example

```typescript
describe('List', () => {
  it('renders items with renderItem', () => {
    const { getByText } = render(
      <List
        items={[{ id: 1, name: 'Alice' }]}
        renderItem={(item) => <div>{item.name}</div>}
        keyExtractor={(item) => item.id}
      />
    );
    expect(getByText('Alice')).toBeInTheDocument();
  });
  
  it('shows empty message when no items', () => {
    const { getByText } = render(
      <List
        items={[]}
        renderItem={(item: any) => <div>{item.name}</div>}
        keyExtractor={(item: any) => item.id}
        emptyMessage="No items"
      />
    );
    expect(getByText('No items')).toBeInTheDocument();
  });
  
  it('extracts keys correctly', () => {
    const { container } = render(
      <List
        items={[
          { id: 1, name: 'Alice' },
          { id: 2, name: 'Bob' },
        ]}
        renderItem={(item) => <div>{item.name}</div>}
        keyExtractor={(item) => `user-${item.id}`}
      />
    );
    const items = container.querySelectorAll('li');
    expect(items).toHaveLength(2);
  });
});
```

## Common Issues & Solutions

### Issue: "Key is not a function"

```typescript
// ❌ Wrong - keyExtractor should return key
<List
  items={items}
  keyExtractor={(item) => item}  // Returns object, not key!
/>

// ✅ Correct
<List
  items={items}
  keyExtractor={(item) => item.id}  // Returns string/number
/>
```

### Issue: List doesn't update when items change

```typescript
// ✅ Works - new array reference
setUsers([...users, newUser]);

// ✅ Works - new object reference
setUsers(users.map(user => user.id === id ? updated : user));

// ❌ May not work - same reference
users.push(newUser);
setUsers(users);  // Same array object!
```

### Issue: renderItem receives wrong type

```typescript
// ✅ Use TypeScript generics
<List<User>
  items={users}
  renderItem={(user) => <div>{user.name}</div>}
  keyExtractor={(user) => user.id}
/>
```

## Summary

| Feature | Benefit | Example |
|---------|---------|---------|
| **Render Props** | Any rendering logic | `renderItem={(item) => <Custom />}` |
| **Generics** | Type-safe for any type | `<List<User> items={users} />` |
| **Key Extraction** | Flexible key strategy | `keyExtractor={(item) => item.id}` |
| **Empty State** | Better UX | `emptyMessage="No results"` |
| **Memoization** | Performance | Re-renders only when props change |

---

**See also:** [Modal Component](./MODAL.md), [Button Component](./BUTTON.md)
