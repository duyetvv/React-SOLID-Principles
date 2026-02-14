# Single Responsibility Principle (SRP)

This directory contains examples demonstrating the Single Responsibility Principle (SRP) in a React application.

## Crucial Core

**Core Idea:** A module should be responsible to one, and only one, actor.
**Implementation:** Separating data fetching (Hooks) from UI rendering (Components).

## Principle Overview

The Single Responsibility Principle (SRP) states that **a module should be responsible to one, and only one, actor**. Ideally, a component should have only one reason to change.

In React applications, this often means separating:
-   **Data Management**: Fetching data, handling loading states, and business logic.
-   **UI Rendering**: Displaying the data and handling user interactions.

## Example Explained

In this example, we demonstrate how to refactor a component that handles both data fetching and rendering into separate responsibilities.

1.  **Data Logic (The Hook)**:
    We move the state management and `useEffect` logic for fetching data into a custom hook (e.g., `useProducts`). This hook is responsible for *how* the data is retrieved.

2.  **Presentation (The Component)**:
    The component becomes a "dumb" or "presentational" component (e.g., `ProductList`). It simply takes the data provided by the hook and renders it. It is responsible for *what* the user sees.

## File Structure

-   `index.tsx`: The main entry point for the SRP example.
-   `components/`:
    -   `ProductList.tsx`: A presentational component responsible for rendering the list of products.
-   `hooks/`:
    -   `useProducts.ts`: A custom hook responsible for fetching product data.
-   `types/`:
    -   `index.ts`: TypeScript definitions for the data structures.