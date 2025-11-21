import { AppShell } from '@mantine/core';
import { Outlet } from '@tanstack/react-router';
import { Header } from './Header';
import { Footer } from './Footer';

export function PublicLayout() {
  return (
    <AppShell
      header={{ height: 70 }}
      padding={0}
      styles={{
        main: {
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}
