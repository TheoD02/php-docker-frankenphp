import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { createRouter, RouterProvider } from '@tanstack/react-router';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { theme } from './theme';

// Mantine CSS (core is imported in root.tsx)
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
