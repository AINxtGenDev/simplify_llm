# React UI Complete Guide

A comprehensive, well-structured guide on how to use React for building modern user interfaces.

---

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Core Concepts](#2-core-concepts)
3. [Components Deep Dive](#3-components-deep-dive)
4. [Hooks Complete Guide](#4-hooks-complete-guide)
5. [State Management](#5-state-management)
6. [Routing](#6-routing)
7. [Data Fetching](#7-data-fetching)
8. [Forms & Validation](#8-forms--validation)
9. [Styling Approaches](#9-styling-approaches)
10. [Performance Optimization](#10-performance-optimization)
11. [Testing](#11-testing)
12. [Security Best Practices](#12-security-best-practices)
13. [Project Structure](#13-project-structure)
14. [Deployment](#14-deployment)
15. [Quick Reference](#15-quick-reference)

---

## 1. Getting Started

### 1.1 Prerequisites

- **Node.js** (v18+ recommended)
- **npm**, **yarn**, or **pnpm** package manager
- **Code Editor** (VS Code recommended)

### 1.2 Creating a New Project

#### Using Vite (Recommended)

```bash
# Create with TypeScript template
npm create vite@latest my-react-app -- --template react-ts

# Navigate to project
cd my-react-app

# Install dependencies
npm install

# Start development server
npm run dev
```

#### Using Create React App

```bash
# Create with TypeScript
npx create-react-app my-react-app --template typescript

cd my-react-app
npm start
```

### 1.3 VS Code Extensions

| Extension | Purpose |
|-----------|---------|
| ES7+ React/Redux/React-Native snippets | Code snippets |
| Prettier | Code formatting |
| ESLint | Linting |
| Auto Rename Tag | HTML/JSX tag renaming |
| Tailwind CSS IntelliSense | Tailwind support |

---

## 2. Core Concepts

### 2.1 JSX (JavaScript XML)

JSX is a syntax extension that allows you to write HTML-like code in JavaScript.

```jsx
// JSX Example
function Welcome() {
  const name = "React Developer";
  const isLoggedIn = true;

  return (
    <div className="welcome-container">
      <h1>Hello, {name}!</h1>
      {isLoggedIn && <p>Welcome back!</p>}
      {!isLoggedIn ? (
        <button>Login</button>
      ) : (
        <button>Logout</button>
      )}
    </div>
  );
}
```

#### JSX Rules

1. **Single Root Element** - Wrap multiple elements in a parent or fragment
2. **Close All Tags** - Self-closing tags must end with `/>`
3. **camelCase Attributes** - Use `className` instead of `class`, `onClick` instead of `onclick`
4. **JavaScript in Curly Braces** - `{expression}`

### 2.2 Components

Components are the building blocks of React applications.

```tsx
// Functional Component with TypeScript
interface UserCardProps {
  name: string;
  email: string;
  avatar?: string;
  onSelect?: (name: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({
  name,
  email,
  avatar = "/default-avatar.png",
  onSelect
}) => {
  return (
    <div className="user-card" onClick={() => onSelect?.(name)}>
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
};

export default UserCard;
```

### 2.3 Props

Props are read-only inputs passed from parent to child components.

```tsx
// Parent Component
function App() {
  const handleUserSelect = (name: string) => {
    console.log(`Selected: ${name}`);
  };

  return (
    <UserCard
      name="John Doe"
      email="john@example.com"
      onSelect={handleUserSelect}
    />
  );
}

// Destructuring Props with Defaults
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

### 2.4 Children Prop

```tsx
// Card component that accepts children
interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

// Usage
function App() {
  return (
    <Card title="User Profile">
      <p>Name: John Doe</p>
      <p>Email: john@example.com</p>
      <Button variant="primary">Edit Profile</Button>
    </Card>
  );
}
```

---

## 3. Components Deep Dive

### 3.1 Component Composition Patterns

#### Container/Presentational Pattern

```tsx
// Presentational Component (UI only)
interface UserListViewProps {
  users: User[];
  isLoading: boolean;
  error?: string;
  onUserClick: (id: string) => void;
}

const UserListView: React.FC<UserListViewProps> = ({
  users,
  isLoading,
  error,
  onUserClick
}) => {
  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <ul className="user-list">
      {users.map(user => (
        <li key={user.id} onClick={() => onUserClick(user.id)}>
          {user.name}
        </li>
      ))}
    </ul>
  );
};

// Container Component (Logic)
const UserListContainer: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const handleUserClick = (id: string) => {
    // Handle navigation or selection
  };

  return (
    <UserListView
      users={users}
      isLoading={isLoading}
      error={error}
      onUserClick={handleUserClick}
    />
  );
};
```

#### Compound Components Pattern

```tsx
// Compound Component Example - Tabs
interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

const Tabs: React.FC<{ children: React.ReactNode; defaultTab: string }> = ({
  children,
  defaultTab
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
};

const TabList: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="tab-list" role="tablist">{children}</div>
);

const Tab: React.FC<{ id: string; children: React.ReactNode }> = ({
  id,
  children
}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within Tabs');

  return (
    <button
      role="tab"
      aria-selected={context.activeTab === id}
      onClick={() => context.setActiveTab(id)}
      className={context.activeTab === id ? 'active' : ''}
    >
      {children}
    </button>
  );
};

const TabPanel: React.FC<{ id: string; children: React.ReactNode }> = ({
  id,
  children
}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabPanel must be used within Tabs');

  if (context.activeTab !== id) return null;
  return <div role="tabpanel">{children}</div>;
};

// Attach sub-components
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

// Usage
function App() {
  return (
    <Tabs defaultTab="profile">
      <Tabs.List>
        <Tabs.Tab id="profile">Profile</Tabs.Tab>
        <Tabs.Tab id="settings">Settings</Tabs.Tab>
        <Tabs.Tab id="notifications">Notifications</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel id="profile">Profile Content</Tabs.Panel>
      <Tabs.Panel id="settings">Settings Content</Tabs.Panel>
      <Tabs.Panel id="notifications">Notifications Content</Tabs.Panel>
    </Tabs>
  );
}
```

#### Render Props Pattern

```tsx
// Mouse position tracker using render props
interface MousePosition {
  x: number;
  y: number;
}

interface MouseTrackerProps {
  render: (position: MousePosition) => React.ReactNode;
}

const MouseTracker: React.FC<MouseTrackerProps> = ({ render }) => {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <>{render(position)}</>;
};

// Usage
function App() {
  return (
    <MouseTracker
      render={({ x, y }) => (
        <div>
          Mouse position: {x}, {y}
        </div>
      )}
    />
  );
}
```

---

## 4. Hooks Complete Guide

### 4.1 useState

Manage local component state.

```tsx
// Basic usage
const [count, setCount] = useState(0);

// With object state
interface FormState {
  username: string;
  email: string;
  password: string;
}

const [formData, setFormData] = useState<FormState>({
  username: '',
  email: '',
  password: ''
});

// Update object state (always spread previous state)
const handleChange = (field: keyof FormState, value: string) => {
  setFormData(prev => ({
    ...prev,
    [field]: value
  }));
};

// Functional update (when new state depends on previous)
const increment = () => {
  setCount(prevCount => prevCount + 1);
};

// Lazy initialization (expensive initial value)
const [data, setData] = useState(() => {
  return computeExpensiveValue();
});
```

### 4.2 useEffect

Handle side effects in components.

```tsx
// Basic effect - runs on every render
useEffect(() => {
  console.log('Component rendered');
});

// Effect with dependencies - runs when dependencies change
useEffect(() => {
  console.log(`Count changed to: ${count}`);
}, [count]);

// Effect runs once on mount
useEffect(() => {
  console.log('Component mounted');
}, []);

// Effect with cleanup
useEffect(() => {
  const subscription = subscribeToData(id);

  return () => {
    // Cleanup function - runs before next effect or unmount
    subscription.unsubscribe();
  };
}, [id]);

// Data fetching pattern
useEffect(() => {
  let isMounted = true;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.getUsers();
      if (isMounted) {
        setUsers(response.data);
      }
    } catch (error) {
      if (isMounted) {
        setError(error.message);
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  fetchData();

  return () => {
    isMounted = false;
  };
}, []);
```

### 4.3 useContext

Share data across components without prop drilling.

```tsx
// Create context
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for consuming context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Usage in components
const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`header-${theme}`}>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </header>
  );
};
```

### 4.4 useReducer

Manage complex state logic.

```tsx
// Define types
interface State {
  count: number;
  step: number;
  history: number[];
}

type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'RESET' };

// Reducer function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + state.step,
        history: [...state.history, state.count + state.step]
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - state.step,
        history: [...state.history, state.count - state.step]
      };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'RESET':
      return { count: 0, step: 1, history: [] };
    default:
      return state;
  }
};

// Component using useReducer
const Counter: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    step: 1,
    history: []
  });

  return (
    <div>
      <p>Count: {state.count}</p>
      <input
        type="number"
        value={state.step}
        onChange={e => dispatch({ type: 'SET_STEP', payload: Number(e.target.value) })}
      />
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
};
```

### 4.5 useRef

Access DOM elements and persist values without re-renders.

```tsx
// DOM reference
const InputFocus: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
};

// Persisting values without re-render
const Timer: React.FC = () => {
  const [count, setCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopTimer(); // Cleanup on unmount
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
};

// Previous value pattern
const usePrevious = <T,>(value: T): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
```

### 4.6 useMemo & useCallback

Optimize performance by memoizing values and functions.

```tsx
// useMemo - memoize expensive calculations
const ExpensiveComponent: React.FC<{ items: Item[]; filter: string }> = ({
  items,
  filter
}) => {
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]); // Only recalculate when items or filter change

  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

// useCallback - memoize functions
const ParentComponent: React.FC = () => {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<string[]>([]);

  // Without useCallback, this creates a new function on every render
  const handleAddItem = useCallback((item: string) => {
    setItems(prev => [...prev, item]);
  }, []); // Empty deps - function never changes

  const handleRemoveItem = useCallback((index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
      {/* ChildComponent won't re-render when count changes */}
      <ChildComponent onAdd={handleAddItem} onRemove={handleRemoveItem} />
    </div>
  );
};

// Child component with React.memo
const ChildComponent = React.memo<{
  onAdd: (item: string) => void;
  onRemove: (index: number) => void;
}>(({ onAdd, onRemove }) => {
  console.log('ChildComponent rendered');
  return <div>Child Content</div>;
});
```

### 4.7 Custom Hooks

Extract reusable logic into custom hooks.

```tsx
// useLocalStorage hook
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// useDebounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// useFetch hook
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const json = await response.json();
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// useOnClickOutside hook
function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// Usage example
const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const { data, loading, error } = useFetch<SearchResults>(
    `/api/search?q=${debouncedQuery}`
  );
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {loading && <Spinner />}
      {error && <Error message={error.message} />}
      {data && <Results items={data.items} />}
    </div>
  );
};
```

---

## 5. State Management

### 5.1 Component State (useState)

Best for local, component-specific state.

```tsx
const [isOpen, setIsOpen] = useState(false);
const [selectedItems, setSelectedItems] = useState<string[]>([]);
```

### 5.2 Context API

Best for global state shared across many components.

```tsx
// auth-context.tsx
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        const response = await api.getCurrentUser();
        setUser(response.data);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.login(email, password);
    setUser(response.data.user);
  };

  const logout = () => {
    api.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### 5.3 Zustand (Lightweight Alternative)

```bash
npm install zustand
```

```tsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => set((state) => {
        const existingItem = state.items.find(i => i.id === item.id);
        if (existingItem) {
          return {
            items: state.items.map(i =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          };
        }
        return { items: [...state.items, { ...item, quantity: 1 }] };
      }),

      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),

      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      })),

      clearCart: () => set({ items: [] }),

      total: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      }
    }),
    { name: 'cart-storage' }
  )
);

// Usage
const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <input
            type="number"
            value={item.quantity}
            onChange={e => updateQuantity(item.id, Number(e.target.value))}
          />
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <p>Total: ${total().toFixed(2)}</p>
    </div>
  );
};
```

---

## 6. Routing

### 6.1 React Router Setup

```bash
npm install react-router-dom
```

### 6.2 Basic Configuration

```tsx
// App.tsx
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet
} from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
        </Route>

        {/* Auth routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Protected routes */}
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
```

### 6.3 Protected Routes

```tsx
interface ProtectedRouteProps {
  requiredRole?: 'admin' | 'user';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};
```

### 6.4 Navigation

```tsx
import { useNavigate, useParams, useSearchParams, Link } from 'react-router-dom';

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleProductClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  const handleFilter = (category: string) => {
    setSearchParams({ category });
  };

  return (
    <div>
      <Link to="/products/new">Add Product</Link>
      {/* ... */}
    </div>
  );
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back
  };

  return (
    <div>
      <button onClick={handleBack}>Back</button>
      <h1>Product {id}</h1>
    </div>
  );
};
```

### 6.5 Lazy Loading Routes

```tsx
import { lazy, Suspense } from 'react';

// Lazy load components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const Analytics = lazy(() => import('./pages/Analytics'));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
```

---

## 7. Data Fetching

### 7.1 TanStack Query (React Query)

```bash
npm install @tanstack/react-query
```

```tsx
// Setup
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 3,
    },
  },
});

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <Router />
  </QueryClientProvider>
);

// Fetching data
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface User {
  id: string;
  name: string;
  email: string;
}

// Custom hook for fetching users
const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<User[]> => {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      return response.json();
    },
  });
};

// Custom hook for fetching single user
const useUser = (id: string) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: async (): Promise<User> => {
      const response = await fetch(`/api/users/${id}`);
      if (!response.ok) throw new Error('Failed to fetch user');
      return response.json();
    },
    enabled: !!id, // Only fetch if id exists
  });
};

// Mutation for creating user
const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newUser: Omit<User, 'id'>): Promise<User> => {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) throw new Error('Failed to create user');
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

// Usage in component
const UserList: React.FC = () => {
  const { data: users, isLoading, error } = useUsers();
  const createUser = useCreateUser();

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;

  const handleCreate = async () => {
    await createUser.mutateAsync({
      name: 'New User',
      email: 'new@example.com',
    });
  };

  return (
    <div>
      <button onClick={handleCreate} disabled={createUser.isPending}>
        {createUser.isPending ? 'Creating...' : 'Add User'}
      </button>
      <ul>
        {users?.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

### 7.2 Optimistic Updates

```tsx
const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: User): Promise<User> => {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      return response.json();
    },
    onMutate: async (newUser) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['users', newUser.id] });

      // Snapshot previous value
      const previousUser = queryClient.getQueryData(['users', newUser.id]);

      // Optimistically update
      queryClient.setQueryData(['users', newUser.id], newUser);

      return { previousUser };
    },
    onError: (err, newUser, context) => {
      // Rollback on error
      queryClient.setQueryData(
        ['users', newUser.id],
        context?.previousUser
      );
    },
    onSettled: (data, error, variables) => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: ['users', variables.id] });
    },
  });
};
```

---

## 8. Forms & Validation

### 8.1 React Hook Form with Zod

```bash
npm install react-hook-form zod @hookform/resolvers
```

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define schema
const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z
    .string()
    .email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await api.register(data);
      reset();
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          {...register('username')}
          aria-invalid={errors.username ? 'true' : 'false'}
        />
        {errors.username && (
          <span className="error">{errors.username.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
          <span className="error">{errors.email.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          aria-invalid={errors.confirmPassword ? 'true' : 'false'}
        />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword.message}</span>
        )}
      </div>

      <div className="form-group">
        <label>
          <input type="checkbox" {...register('terms')} />
          I accept the terms and conditions
        </label>
        {errors.terms && (
          <span className="error">{errors.terms.message}</span>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};
```

### 8.2 Controlled Form Component

```tsx
// Reusable form input component
interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  error?: string;
  register: any;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  error,
  register,
  required = false,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label}
        {required && <span className="required">*</span>}
      </label>
      <input
        id={name}
        type={type}
        {...register(name)}
        className={error ? 'input-error' : ''}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <span id={`${name}-error`} className="error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
```

---

## 9. Styling Approaches

### 9.1 CSS Modules

```css
/* Button.module.css */
.button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.primary {
  background-color: #007bff;
  color: white;
}

.primary:hover {
  background-color: #0056b3;
}

.secondary {
  background-color: #6c757d;
  color: white;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

```tsx
import styles from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  disabled = false,
  children,
  onClick
}) => {
  const className = [
    styles.button,
    styles[variant],
    disabled && styles.disabled
  ].filter(Boolean).join(' ');

  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
```

### 9.2 Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```tsx
// Tailwind component
interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-transform hover:scale-105">
      <img
        className="w-full h-48 object-cover"
        src={imageUrl}
        alt={title}
      />
      <div className="px-6 py-4">
        <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-base">
          {description}
        </p>
      </div>
      <div className="px-6 pt-2 pb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors">
          Learn More
        </button>
      </div>
    </div>
  );
};

// Using clsx for conditional classes
import clsx from 'clsx';

const Alert: React.FC<{ type: 'success' | 'error' | 'warning'; message: string }> = ({
  type,
  message
}) => {
  return (
    <div
      className={clsx(
        'p-4 rounded-lg border',
        {
          'bg-green-100 border-green-400 text-green-700': type === 'success',
          'bg-red-100 border-red-400 text-red-700': type === 'error',
          'bg-yellow-100 border-yellow-400 text-yellow-700': type === 'warning',
        }
      )}
    >
      {message}
    </div>
  );
};
```

### 9.3 Styled Components

```bash
npm install styled-components @types/styled-components
```

```tsx
import styled, { css } from 'styled-components';

interface ButtonProps {
  $variant?: 'primary' | 'secondary' | 'danger';
  $size?: 'sm' | 'md' | 'lg';
  $fullWidth?: boolean;
}

const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  /* Size variants */
  ${({ $size = 'md' }) => {
    const sizes = {
      sm: css`
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
      `,
      md: css`
        padding: 0.5rem 1rem;
        font-size: 1rem;
      `,
      lg: css`
        padding: 0.75rem 1.5rem;
        font-size: 1.125rem;
      `,
    };
    return sizes[$size];
  }}

  /* Color variants */
  ${({ $variant = 'primary' }) => {
    const variants = {
      primary: css`
        background-color: #007bff;
        color: white;
        &:hover {
          background-color: #0056b3;
        }
      `,
      secondary: css`
        background-color: #6c757d;
        color: white;
        &:hover {
          background-color: #545b62;
        }
      `,
      danger: css`
        background-color: #dc3545;
        color: white;
        &:hover {
          background-color: #c82333;
        }
      `,
    };
    return variants[$variant];
  }}

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Usage
const App: React.FC = () => (
  <div>
    <Button $variant="primary" $size="lg">Primary Large</Button>
    <Button $variant="danger" $fullWidth>Delete</Button>
  </div>
);
```

---

## 10. Performance Optimization

### 10.1 React.memo

Prevent unnecessary re-renders for functional components.

```tsx
interface ExpensiveListProps {
  items: Item[];
  onItemClick: (id: string) => void;
}

const ExpensiveList = React.memo<ExpensiveListProps>(
  ({ items, onItemClick }) => {
    console.log('ExpensiveList rendered');

    return (
      <ul>
        {items.map(item => (
          <li key={item.id} onClick={() => onItemClick(item.id)}>
            {item.name}
          </li>
        ))}
      </ul>
    );
  },
  // Custom comparison function (optional)
  (prevProps, nextProps) => {
    return prevProps.items.length === nextProps.items.length &&
           prevProps.items.every((item, i) => item.id === nextProps.items[i].id);
  }
);
```

### 10.2 Code Splitting

```tsx
import { lazy, Suspense } from 'react';

// Route-based code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

// Component-based code splitting
const HeavyChart = lazy(() => import('./components/HeavyChart'));

const App: React.FC = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </Suspense>
);

// Conditional loading
const Analytics: React.FC = () => {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>Show Chart</button>
      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
};
```

### 10.3 Virtualization

```bash
npm install @tanstack/react-virtual
```

```tsx
import { useVirtualizer } from '@tanstack/react-virtual';

interface VirtualListProps {
  items: Item[];
}

const VirtualList: React.FC<VirtualListProps> = ({ items }) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // Estimated row height
    overscan: 5, // Number of items to render outside viewport
  });

  return (
    <div
      ref={parentRef}
      style={{ height: '400px', overflow: 'auto' }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {items[virtualRow.index].name}
          </div>
        ))}
      </div>
    </div>
  );
};
```

### 10.4 Image Optimization

```tsx
// Lazy loading images
const LazyImage: React.FC<{
  src: string;
  alt: string;
  placeholder?: string;
}> = ({ src, alt, placeholder = '/placeholder.jpg' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="image-container">
      <img
        ref={imgRef}
        src={isInView ? src : placeholder}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`lazy-image ${isLoaded ? 'loaded' : 'loading'}`}
        loading="lazy"
      />
    </div>
  );
};
```

---

## 11. Testing

### 11.1 Testing Setup

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
});
```

```ts
// src/test/setup.ts
import '@testing-library/jest-dom';
```

### 11.2 Component Testing

```tsx
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies correct variant class', () => {
    render(<Button variant="danger">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-danger');
  });
});
```

### 11.3 Hook Testing

```tsx
// useCounter.test.tsx
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useCounter from './useCounter';

describe('useCounter', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('initializes with provided value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  it('increments count', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it('decrements count', () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);
  });
});
```

### 11.4 Integration Testing

```tsx
// UserList.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserList from './UserList';
import * as api from '../services/api';

vi.mock('../services/api');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('UserList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays loading state initially', () => {
    vi.mocked(api.getUsers).mockImplementation(() => new Promise(() => {}));

    render(<UserList />, { wrapper: createWrapper() });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays users after loading', async () => {
    vi.mocked(api.getUsers).mockResolvedValue([
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
    ]);

    render(<UserList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });
  });

  it('displays error message on failure', async () => {
    vi.mocked(api.getUsers).mockRejectedValue(new Error('Failed to fetch'));

    render(<UserList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
    });
  });
});
```

---

## 12. Security Best Practices

### 12.1 XSS Prevention

```tsx
// DANGEROUS - Don't do this
const UnsafeComponent: React.FC<{ html: string }> = ({ html }) => (
  <div dangerouslySetInnerHTML={{ __html: html }} /> // XSS vulnerability!
);

// SAFE - Use DOMPurify if HTML is required
import DOMPurify from 'dompurify';

const SafeHtmlComponent: React.FC<{ html: string }> = ({ html }) => {
  const sanitizedHtml = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p'],
    ALLOWED_ATTR: ['href', 'target'],
  });

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

// PREFERRED - Use React's built-in escaping
const SafeComponent: React.FC<{ content: string }> = ({ content }) => (
  <div>{content}</div> // React escapes content automatically
);
```

### 12.2 Secure Authentication

```tsx
// Secure token storage
const useAuth = () => {
  // Never store sensitive tokens in localStorage
  // Use httpOnly cookies set by the server instead

  const login = async (credentials: Credentials) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include', // Include cookies
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  };

  const logout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  };

  return { login, logout };
};
```

### 12.3 Environment Variables

```tsx
// .env files
// VITE_API_URL=https://api.example.com
// VITE_PUBLIC_KEY=pk_live_xxx

// Access in code (Vite)
const apiUrl = import.meta.env.VITE_API_URL;

// NEVER expose secrets in frontend code
// Bad: const secretKey = import.meta.env.VITE_SECRET_KEY;
// Secrets should only exist on the server
```

### 12.4 Input Validation

```tsx
// Client-side validation (defense in depth)
const validateInput = (input: string): boolean => {
  // Whitelist approach
  const allowedPattern = /^[a-zA-Z0-9_-]+$/;
  return allowedPattern.test(input) && input.length <= 100;
};

// Always validate on server too!
const submitForm = async (data: FormData) => {
  // Client validation for UX
  if (!validateInput(data.username)) {
    throw new Error('Invalid username format');
  }

  // Server will also validate
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return response.json();
};
```

---

## 13. Project Structure

```
src/
├── assets/                 # Static assets
│   ├── images/
│   ├── fonts/
│   └── icons/
│
├── components/             # Reusable UI components
│   ├── ui/                 # Base UI components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   ├── Button.module.css
│   │   │   └── index.ts
│   │   ├── Input/
│   │   ├── Modal/
│   │   └── index.ts
│   │
│   ├── layout/             # Layout components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Sidebar/
│   │   └── index.ts
│   │
│   └── features/           # Feature-specific components
│       ├── auth/
│       ├── dashboard/
│       └── settings/
│
├── hooks/                  # Custom React hooks
│   ├── useAuth.ts
│   ├── useDebounce.ts
│   ├── useFetch.ts
│   └── index.ts
│
├── context/                # React Context providers
│   ├── AuthContext.tsx
│   ├── ThemeContext.tsx
│   └── index.ts
│
├── pages/                  # Page components (routes)
│   ├── Home/
│   ├── Dashboard/
│   ├── Settings/
│   └── NotFound/
│
├── services/               # API calls and external services
│   ├── api/
│   │   ├── client.ts       # Axios/fetch instance
│   │   ├── users.ts
│   │   ├── products.ts
│   │   └── index.ts
│   └── storage.ts          # Local storage utilities
│
├── store/                  # State management (if using Redux/Zustand)
│   ├── slices/
│   └── index.ts
│
├── types/                  # TypeScript type definitions
│   ├── api.ts
│   ├── models.ts
│   └── index.ts
│
├── utils/                  # Utility functions
│   ├── formatters.ts
│   ├── validators.ts
│   ├── constants.ts
│   └── index.ts
│
├── styles/                 # Global styles
│   ├── globals.css
│   ├── variables.css
│   └── themes/
│
├── test/                   # Test utilities and setup
│   ├── setup.ts
│   ├── mocks/
│   └── utils.tsx
│
├── App.tsx                 # Root component
├── main.tsx                # Entry point
└── vite-env.d.ts           # Vite type declarations
```

---

## 14. Deployment

### 14.1 Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

### 14.2 Deployment Platforms

#### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

#### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

#### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```nginx
# nginx.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 15. Quick Reference

### Essential Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run preview          # Preview build
npm run test             # Run tests
npm run test:watch       # Watch mode
npm run lint             # Lint code
npm run lint:fix         # Fix lint errors

# Dependencies
npm install <pkg>        # Add dependency
npm install -D <pkg>     # Add dev dependency
npm update               # Update packages
npm audit                # Security audit
npm audit fix            # Fix vulnerabilities
```

### Key Libraries

| Category | Library | Purpose |
|----------|---------|---------|
| Routing | react-router-dom | Client-side routing |
| Data Fetching | @tanstack/react-query | Server state management |
| Forms | react-hook-form + zod | Form handling & validation |
| State | zustand | Lightweight state management |
| Styling | tailwindcss | Utility-first CSS |
| Testing | vitest + @testing-library/react | Testing |
| Animation | framer-motion | Animations |
| Icons | lucide-react | Icon library |
| Dates | date-fns | Date manipulation |
| HTTP | axios | HTTP client |

### Common Patterns Cheat Sheet

```tsx
// Conditional Rendering
{condition && <Component />}
{condition ? <A /> : <B />}

// List Rendering
{items.map(item => <Item key={item.id} {...item} />)}

// Event Handling
<button onClick={() => handleClick(id)}>Click</button>
<input onChange={e => setValue(e.target.value)} />

// Forwarding Refs
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <input ref={ref} {...props} />
));

// Error Boundary
<ErrorBoundary fallback={<Error />}>
  <App />
</ErrorBoundary>
```

---

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
