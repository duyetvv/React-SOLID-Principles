# SOLID Principles in React

This repository provides practical, hands-on examples of the five SOLID principles of object-oriented design, implemented in a modern React and TypeScript context. Each principle is demonstrated in its own directory, containing code that both violates and (after refactoring) complies with the principle, along with a detailed `README.md` explaining the concepts.

---

## The Principles

Click on a principle to explore its detailed explanation and code implementation.

### 1. [Single Responsibility Principle (SRP)](./src/srp/README.md)
A component or module should have one, and only one, reason to change. Our example demonstrates how to separate data-fetching logic from state management and UI orchestration.

### 2. [Open/Closed Principle (OCP)](./src/ocp/README.md)
Software entities (classes, modules, functions) should be open for extension but closed for modification. Our examples showcase how patterns like theming, render props, and slots allow for new functionality without altering existing code.

### 3. [Liskov Substitution Principle (LSP)](./src/lsp/README.md)
Subtypes must be substitutable for their base types without affecting the correctness of the program. The example illustrates how a component's behavioral contract must be honored by all its variants.

### 4. [Interface Segregation Principle (ISP)](./src/isp/README.md)
Clients should not be forced to depend on interfaces they do not use. We show how "fat" interfaces can be broken down into smaller, role-specific interfaces to create more decoupled and maintainable code.

### 5. [Dependency Inversion Principle (DIP)](./src/dip/README.md)
High-level modules should not depend on low-level modules; both should depend on abstractions. The example demonstrates how to use dependency injection to create a flexible, "pluggable" architecture.
