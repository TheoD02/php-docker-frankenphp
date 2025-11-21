import { Group, Button, Container, Text, Burger, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from '@tanstack/react-router';
import { IconShieldLock } from '@tabler/icons-react';

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);

  const navLinks = [
    { label: 'Accueil', to: '/' },
    { label: 'Comment ça marche', to: '/how-it-works' },
    { label: 'Tarifs', to: '/pricing' },
    { label: 'Sécurité', to: '/security' },
    { label: 'Démos', to: '/demo/housings' },
    { label: 'À propos', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <header style={{ borderBottom: '1px solid #e9ecef', padding: '1rem 0' }}>
      <Container size="lg">
        <Group justify="space-between">
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Group gap="xs">
              <IconShieldLock size={32} color="#1976d2" />
              <Text
                size="xl"
                fw={700}
                style={{ color: '#1976d2', cursor: 'pointer' }}
              >
                SafeDossier
              </Text>
            </Group>
          </Link>

          {/* Desktop Navigation */}
          <Group gap="lg" visibleFrom="sm">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{ textDecoration: 'none' }}
              >
                {({ isActive }) => (
                  <Text
                    fw={isActive ? 600 : 400}
                    c={isActive ? 'blue' : 'dimmed'}
                    style={{ cursor: 'pointer' }}
                  >
                    {link.label}
                  </Text>
                )}
              </Link>
            ))}
          </Group>

          {/* CTA Buttons */}
          <Group gap="sm" visibleFrom="sm">
            <Button variant="subtle">Connexion</Button>
            <Button>Essayer gratuitement</Button>
          </Group>

          {/* Mobile Burger */}
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" />
        </Group>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        title={
          <Group gap="xs">
            <IconShieldLock size={24} color="#1976d2" />
            <Text fw={700} c="blue">
              SafeDossier
            </Text>
          </Group>
        }
        padding="lg"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={close}
              style={{ textDecoration: 'none' }}
            >
              {({ isActive }) => (
                <Text
                  fw={isActive ? 600 : 400}
                  c={isActive ? 'blue' : 'dimmed'}
                  style={{ cursor: 'pointer' }}
                >
                  {link.label}
                </Text>
              )}
            </Link>
          ))}
          <Button variant="subtle" fullWidth mt="md">
            Connexion
          </Button>
          <Button fullWidth>Essayer gratuitement</Button>
        </div>
      </Drawer>
    </header>
  );
}
