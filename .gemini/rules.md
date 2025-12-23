# Project Standardization Rules

This document outlines the standardization rules for this project to ensure consistency, readability, and maintainability of the codebase.

## 1. Type Safety

- **Strict TypeScript**: The project must use TypeScript in strict mode (`"strict": true` in `tsconfig.json`).
- **Explicit Types**: All variables, function parameters, and return values should have explicit types. Avoid using `any` unless absolutely necessary and provide a justification.
- **Interfaces and Types**: Use `interface` for public APIs and `type` for props, state, and other internal types.

## 2. Separation of Concerns (UI vs. Logic)

- **UI Components**:
  - **Shared UI**: Reusable, atomic components (e.g., buttons, inputs) must reside in the `packages/ui` workspace.
  - **Feature UI**: Components specific to a single application should reside in `apps/{app-name}/components`.
- **Business Logic**: Business logic, data fetching, and state management should be handled in custom hooks (`use...`) or service files.
- **Hooks**: Encapsulate reusable logic and side effects in custom hooks. Place hooks related to a specific feature within the feature's directory.
- **API Layer**: Create a dedicated layer for API calls. This layer should handle request/response formatting and error handling.

## 3. File and Folder Naming Convention

- **Components**: Use PascalCase for component files (e.g., `MyComponent.tsx`).
- **Other Files**: Use kebab-case for all other files and folders (e.g., `use-my-hook.ts`, `api-client.ts`).
- **Mastra Agents/Workflows**: Use descriptive kebab-case names ending with the type (e.g., `company-info-agent.ts`, `weather-workflow.ts`).

## 4. Component Structure

- **Atomic Design**: Follow the principles of Atomic Design to structure components into atoms, molecules, organisms, etc.
- **Props**: Define component props using `interface` or `type`. Keep props as minimal as possible.
- **Styling**: Use CSS Modules (`.module.css`) for component-specific styles to avoid class name collisions.

## 5. State Management

- **Local State**: Use the `useState` and `useReducer` hooks for component-local state.
- **Global State**: For global state, consider using React Context with custom hooks or a lightweight state management library if the complexity grows.

## 6. Code Formatting and Linting

- **ESLint & Prettier**: All code must adhere to the ESLint and Prettier rules defined in the project.
- **Auto-formatting**: It is recommended to set up your editor to format files on save.

## 7. Commit Messages

- **Conventional Commits**: Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. This helps in generating automated changelogs and understanding the history of the project.
  - **Format**: `feat: add new feature`
  - **Examples**:
    - `feat: allow user to upload a profile picture`
    - `fix: correct typo in the documentation`
    - `refactor: improve performance of the rendering`

## 8. Constants and Configuration

- **Constants**: Use constants for values that are used multiple times in the codebase. Place them in a dedicated file (e.g., `constants.ts`).
- **Configuration**: Use environment variables for configuration values that can change between environments (e.g., API URLs, feature flags).

## 9. Error Handling

- **Error Boundaries**: Use error boundaries to catch and handle errors in React components.
- **Logging**: Log errors to a centralized logging service for easier debugging and monitoring.
- **Notifications**: Provide user-friendly notifications for errors and success messages.

## 10. Project Structure (@app)

The project follows a Turborepo monorepo structure:

- **`apps/`**: Contains deployable applications.
  - **`apps/tob-chatbot`**: The Mastra AI backend application.
  - **`apps/web`**: The Next.js frontend application.
- **`packages/`**: Contains shared libraries and configurations.
  - **`packages/ui`**: Shared UI component library (Shadcn UI, etc.).
  - **`packages/eslint-config`**: Shared ESLint configurations.
  - **`packages/typescript-config`**: Shared TypeScript configurations.

## 11. Mastra Application Standards

For the Mastra application (`apps/tob-chatbot`), follow these specific conventions:

- **Directory Structure**:
  - `src/mastra`: Root folder for all Mastra-specific logic.
    - `src/mastra/agents`: Agent definitions.
    - `src/mastra/workflows`: Workflow definitions.
    - `src/mastra/tools`: Tool definitions.
    - `src/mastra/scorers`: Scorer definitions effectively.
- **Entry Point**: The application entry point is `src/index.ts`. It must:
  - Initialize the `mastra` instance.
  - Handle application statup logging.
  - Be the single source of truth for the running service.
- **Path Aliases**: Use the configured strict path aliases:
  - `@mastra/*` -> `src/mastra/*`
  - `@agents/*` -> `src/mastra/agents/*`
  - `@workflows/*` -> `src/mastra/workflows/*`
  - `@tools/*` -> `src/mastra/tools/*`
