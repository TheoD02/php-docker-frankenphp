import { createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { PublicLayout } from '@components/layout/PublicLayout';

export const Route = createRootRoute({
  component: () => (
    <>
      <PublicLayout />
      <TanStackRouterDevtools />
    </>
  ),
});
