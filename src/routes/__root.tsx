import { Outlet, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from '@/components/theme-provider';

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background">
        <Outlet />
      </div>
    </ThemeProvider>
  ),
});