# Liskov Substitution Principle (LSP) in React

This directory contains a React example demonstrating the Liskov Substitution Principle (LSP), along with the Single Responsibility Principle (SRP) and Open/Closed Principle (OCP).

## Principle Overview

-   **Liskov Substitution Principle (LSP):** Subtypes must be substitutable for their base types. In React, a child component should be usable wherever a base component is, without changing the program's correctness. This means the child should have at least the same props as the base and behave predictably.
-   **Single Responsibility Principle (SRP):** Each component has a single, well-defined purpose. For example, `Card` just displays a card, and `CardGrid` just handles layout.
-   **Open/Closed Principle (OCP):** Components should be open for extension but closed for modification. We achieve this through composition and props. We can create new card types like `ImageCard` without changing the base `Card` component.

## File Structure

-   `index.tsx`: The main component that renders the LSP example, showing both violating and compliant cases.
-   `styles.scss`: General styles for the example page.

### Components

-   `components/`
    -   `CardGrid.tsx`: (SRP) A layout component to arrange cards in a grid.
    -   `base/`
        -   `Card.tsx`: The base component. It defines the "contract" (props interface) that subtypes should follow.
    -   `violating/`
        -   `AdCard.tsx`: **(LSP Violation)** This component is a poor subtype of `Card`. It doesn't accept `children` and has a different internal structure, so it can't be reliably substituted for a `Card`.
    -   `compliant/`
        -   `ImageCard.tsx`: **(LSP Compliant)** Extends `Card` by adding an image. It respects the `Card`'s props contract (including `children`) and can be used anywhere a `Card` is expected.
        -   `ClickableCard.tsx`: **(LSP Compliant)** Extends `Card` by adding an `onClick` behavior, also fully substitutable for a `Card`.

## How to Run

This example is part of the main application. You can view it by navigating to the appropriate route where `LspExample` is rendered.
