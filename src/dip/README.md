# Dependency Inversion Principle (DIP)

This directory contains an example demonstrating the Dependency Inversion Principle (DIP) in a React application.

## Crucial Core

**Core Idea:** Depend upon abstractions, not concretions.
**Implementation:** Components depend on interfaces (abstractions), and concrete implementations are injected via props.

## Core Concepts Illustrated

1.  **Abstraction**: The `DataService` interface in `types/index.ts` defines a contract for fetching users. This is the abstraction that both high-level and low-level modules depend on.

2.  **Low-Level Modules (Details)**:
    *   `services/ApiService.ts`: A concrete implementation that fetches data from a real API.
    *   `services/MockService.ts`: A concrete implementation that returns hardcoded mock data.

3.  **High-Level Module**:
    *   `components/UserList.tsx`: This React component is responsible for displaying the list of users. Crucially, it does **not** know whether the data is coming from a real API or a mock service. It only depends on the `DataService` abstraction, which is passed in as a prop.

4.  **Dependency Injection**:
    *   `index.tsx`: This is the "injector" or "orchestrator." It decides which concrete service (`ApiService` or `MockService`) to create and "injects" it into the `UserList` component. You can toggle the `useLiveApi` flag to see how easily the data source can be swapped without changing a single line of code in the `UserList` component itself.

## How It Fulfills DIP

- **High-level modules don't depend on low-level modules**: `UserList` (high-level) doesn't import `ApiService` or `MockService` (low-level). It only knows about `DataService` (abstraction).
- **Both depend on abstractions**: `UserList`, `ApiService`, and `MockService` all depend on the `DataService` interface.
- **Details depend on abstractions**: The concrete `ApiService` and `MockService` classes implement the `DataService` interface.

This structure makes the code highly decoupled, easier to test (you can inject the `MockService` in tests), and more flexible to future changes (e.g., swapping the API for GraphQL without touching the UI components).
