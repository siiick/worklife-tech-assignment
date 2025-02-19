# Worklife tech assessment

## Sample App Description
This sample app is a responsive image gallery built with Nuxt 3 and managed with pnpm. It fetches art objects from an external API and displays them in a clean, modern grid layout.

## Design Choices

- **Server-Side Rendering (SSR):**
  - The app leverages SSR to pre-fetch data so that the initial HTML is fully rendered on the server. This improves load times and ensures the client and server state remain in sync, eliminating hydration issues.

- **Responsive Grid Layout:**
  - A mobile-first approach is used to design the gallery. The grid displays two columns on mobile devices and adjusts to five columns on larger screens, ensuring that the layout remains visually appealing and that rows are complete.

- **Modular Component Design:**
  - The image tiles are encapsulated within a dedicated component (named `ImageTile`). This component handles both the display of the image and the skeleton placeholder when no image URL is provided. It also accepts a prop to toggle between natural and square aspect ratios.

- **User-Friendly Search and Controls:**
  - The header includes a search input with an integrated clear button for quick resetting of search terms.
  - A toggle switch is provided, allowing users to switch the display mode of the image tiles on the fly.

- **Pagination and Data Stacking:**
  - The application uses a combination of reactive data, `useFetch`, and watchers to seamlessly append new pages of results to the existing gallery. This approach keeps the code DRY and maintains a smooth user experience during pagination.

- **BEM & SCSS for Maintainable Styles:**
  - Styling is organized using the BEM methodology in conjunction with SCSS, ensuring that the CSS is structured, modular, and easy to maintain.

## Setup

The project use pnpm as the default package manager. If you don't have pnpm installed, you can install it globally using npm:

```bash
npm install -g pnpm
```

> **Note:** If you prefer to use npm or yarn, you can remove the `pnpm-lock.yaml` file and run `npm install` or `yarn install` instead.

Make sure to install dependencies:

```bash
# pnpm
pnpm install

```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm run dev

```

## Production

Build the application for production:

```bash
# pnpm
pnpm run build

```

Locally preview production build:

```bash

# pnpm
pnpm preview

```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


## Additional commands

Run ESLint:

```bash
# pnpm
pnpm run lint

```