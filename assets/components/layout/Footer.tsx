import { Container, Group, Text, Stack, Anchor, Divider } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import {
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandGithub,
  IconShieldLock,
} from '@tabler/icons-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ borderTop: '1px solid #e9ecef', marginTop: 'auto' }}>
      <Container size="lg" py="xl">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem',
          }}
        >
          {/* Colonne 1 : À propos */}
          <Stack gap="sm">
            <Group gap="xs">
              <IconShieldLock size={24} color="#1976d2" />
              <Text fw={700} c="blue">
                SafeDossier
              </Text>
            </Group>
            <Text size="sm" c="dimmed">
              La solution française pour sécuriser et organiser vos documents
              importants.
            </Text>
            <Group gap="md" mt="sm">
              <Anchor href="https://twitter.com" target="_blank" c="dimmed">
                <IconBrandTwitter size={20} />
              </Anchor>
              <Anchor href="https://linkedin.com" target="_blank" c="dimmed">
                <IconBrandLinkedin size={20} />
              </Anchor>
              <Anchor href="https://github.com" target="_blank" c="dimmed">
                <IconBrandGithub size={20} />
              </Anchor>
            </Group>
          </Stack>

          {/* Colonne 2 : Produit */}
          <Stack gap="xs">
            <Text fw={600} size="sm">
              Produit
            </Text>
            <Link to="/pricing" style={{ textDecoration: 'none' }}>
              <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }}>
                Tarifs
              </Text>
            </Link>
            <Anchor href="#" size="sm" c="dimmed">
              Fonctionnalités
            </Anchor>
            <Anchor href="#" size="sm" c="dimmed">
              Sécurité
            </Anchor>
            <Anchor href="#" size="sm" c="dimmed">
              Mises à jour
            </Anchor>
          </Stack>

          {/* Colonne 3 : Entreprise */}
          <Stack gap="xs">
            <Text fw={600} size="sm">
              Entreprise
            </Text>
            <Link to="/about" style={{ textDecoration: 'none' }}>
              <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }}>
                À propos
              </Text>
            </Link>
            <Anchor href="#" size="sm" c="dimmed">
              Blog
            </Anchor>
            <Anchor href="#" size="sm" c="dimmed">
              Carrières
            </Anchor>
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }}>
                Contact
              </Text>
            </Link>
          </Stack>

          {/* Colonne 4 : Légal */}
          <Stack gap="xs">
            <Text fw={600} size="sm">
              Légal
            </Text>
            <Anchor href="#" size="sm" c="dimmed">
              Mentions légales
            </Anchor>
            <Anchor href="#" size="sm" c="dimmed">
              CGU/CGV
            </Anchor>
            <Anchor href="#" size="sm" c="dimmed">
              Politique de confidentialité
            </Anchor>
            <Anchor href="#" size="sm" c="dimmed">
              Politique de cookies
            </Anchor>
          </Stack>
        </div>

        <Divider my="lg" />

        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            © {currentYear} SafeDossier. Tous droits réservés.
          </Text>
          <Group gap="md">
            <Text size="sm" c="dimmed">
              Hébergé en France
            </Text>
            <Text size="sm" c="dimmed">
              Conforme RGPD
            </Text>
          </Group>
        </Group>
      </Container>
    </footer>
  );
}
