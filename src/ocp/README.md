# Open/Closed Principle (OCP)

This directory contains examples demonstrating the Open/Closed Principle (OCP) in a React application.

## Crucial Core

**Core Idea:** Software entities should be open for extension, but closed for modification.
**Implementation:** Using Composition, Slots, and Render Props to extend component behavior without modifying source code.

## Principle Overview

The Open/Closed Principle states that **software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification**.

In the context of React components, this means we should be able to add new functionality or change the appearance of a component without changing its source code. We achieve this through patterns like:
-   **Composition**: Passing components as props (children, slots).
-   **Configuration**: Passing data objects (themes) to control behavior/style.
-   **Render Props**: Delegating rendering logic to the consumer.

## Examples Explained

### 1. Button Component (Composition & Theme System)
Instead of hardcoding styles or variants inside the `Button` component (which would require modifying the file to add a new variant), we use a **Theme System**.
-   **Closed for Modification**: The `Button` component logic doesn't change.
-   **Open for Extension**: You can create a new theme object with new variants and pass it to the button.

### 2. List Component (Render Props)
Instead of hardcoding how list items are rendered inside the `List` component, we use a **Render Prop** (`renderItem`).
-   **Closed for Modification**: The `List` handles iteration and layout.
-   **Open for Extension**: The consumer decides exactly what each item looks like by passing a function.

### 3. Modal Component (Slots)
Instead of hardcoding the footer or content structure, we use **Slots** (props that accept React nodes).
-   **Closed for Modification**: The `Modal` handles visibility, overlay, and basic structure.
-   **Open for Extension**: The consumer injects custom content and footer actions via props.

## File Structure

-   `index.tsx`: The main component rendering the OCP examples.
-   `components/`: Reusable components designed with OCP in mind.
    -   `Button/`: Button component using themes.
    -   `List/`: Generic List component using render props.
    -   `Modal/`: Modal component using slots.
-   `core/`: Core logic separated from UI.
    -   `themes/`: Theme definitions (data, not code).
    -   `types/`: TypeScript interfaces.
    -   `constants/`: Configuration constants.
-   `docs/`: Detailed documentation for the implementation.

For more detailed documentation, please refer to the `docs/` folder.