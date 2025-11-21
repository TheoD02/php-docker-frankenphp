import '@mantine/core/styles.css';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from '@/app';

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

let appDiv = document.getElementById('app');
if (!appDiv) {
  appDiv = document.createElement('div');
  appDiv.id = 'app';
  document.body.appendChild(appDiv);
}

// Render your React component instead
const root = createRoot(appDiv);
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
