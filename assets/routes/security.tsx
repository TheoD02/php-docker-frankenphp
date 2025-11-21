import { createFileRoute } from '@tanstack/react-router';
import {
  Container,
  Title,
  Text,
  Stack,
  SimpleGrid,
  Card,
  ThemeIcon,
  List,
  Badge,
  Group,
  Paper,
  Divider,
} from '@mantine/core';
import { securityFeatures, certifications } from '@/data/security';

export const Route = createFileRoute('/security')({
  component: Security,
});

function Security() {
  return (
    <Container size="lg" py={80}>
      {/* Hero Section */}
      <Stack align="center" gap="xl" mb={60}>
        <Badge size="lg" variant="light" color="blue">
          Sécurité de niveau bancaire
        </Badge>
        <Title order={1} ta="center" size="3rem">
          Votre sécurité, notre priorité absolue
        </Title>
        <Text size="xl" c="dimmed" ta="center" maw={800}>
          SafeDossier utilise les technologies de chiffrement et de sécurité les
          plus avancées pour protéger vos documents les plus sensibles. Conformité
          totale RGPD et certifications internationales.
        </Text>
      </Stack>

      {/* Security Features */}
      <Stack gap="xl" mb={80}>
        {securityFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card
              key={index}
              shadow="sm"
              padding="xl"
              radius="md"
              withBorder
              style={{
                transition: 'box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <Group align="flex-start" gap="xl">
                <ThemeIcon
                  size={80}
                  radius="md"
                  variant="light"
                  color="blue"
                  style={{ flexShrink: 0 }}
                >
                  <Icon size={40} />
                </ThemeIcon>
                <div style={{ flex: 1 }}>
                  <Title order={3} mb="xs">
                    {feature.title}
                  </Title>
                  <Text size="lg" c="dimmed" mb="lg">
                    {feature.description}
                  </Text>
                  <List
                    spacing="xs"
                    size="sm"
                    styles={{
                      item: {
                        color: 'var(--mantine-color-dimmed)',
                      },
                    }}
                  >
                    {feature.details.map((detail, detailIndex) => (
                      <List.Item key={detailIndex}>{detail}</List.Item>
                    ))}
                  </List>
                </div>
              </Group>
            </Card>
          );
        })}
      </Stack>

      <Divider my={60} />

      {/* Certifications */}
      <Stack align="center" gap="xl" mb={60}>
        <Title order={2} ta="center">
          Certifications et conformité
        </Title>
        <Text size="lg" c="dimmed" ta="center" maw={700}>
          SafeDossier est régulièrement audité par des organismes indépendants et
          maintient les certifications les plus exigeantes du secteur.
        </Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg" mb={80}>
        {certifications.map((cert, index) => (
          <Paper key={index} shadow="xs" p="xl" radius="md" withBorder>
            <Stack align="center" gap="md">
              <Badge size="xl" variant="filled" color="blue" circle>
                {cert.year}
              </Badge>
              <Text fw={700} size="lg" ta="center">
                {cert.name}
              </Text>
              <Text size="sm" c="dimmed" ta="center">
                {cert.description}
              </Text>
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>

      {/* Trust Section */}
      <Card shadow="md" padding="xl" radius="md" withBorder bg="blue.0">
        <Stack align="center" gap="md">
          <Title order={3} ta="center">
            La confiance de milliers d'utilisateurs
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" mt="md">
            <Stack align="center" gap={4}>
              <Text size="2.5rem" fw={700} c="blue">
                0
              </Text>
              <Text c="dimmed" ta="center">
                Fuite de données depuis notre création
              </Text>
            </Stack>
            <Stack align="center" gap={4}>
              <Text size="2.5rem" fw={700} c="blue">
                99.9%
              </Text>
              <Text c="dimmed" ta="center">
                Disponibilité garantie (SLA)
              </Text>
            </Stack>
            <Stack align="center" gap={4}>
              <Text size="2.5rem" fw={700} c="blue">
                24/7
              </Text>
              <Text c="dimmed" ta="center">
                Surveillance et monitoring
              </Text>
            </Stack>
          </SimpleGrid>
        </Stack>
      </Card>

      {/* Bottom CTA */}
      <Stack align="center" gap="md" mt={80}>
        <Title order={3} ta="center">
          Des questions sur notre sécurité ?
        </Title>
        <Text size="lg" c="dimmed" ta="center" maw={600}>
          Notre équipe sécurité est disponible pour répondre à toutes vos
          questions. Pour les problèmes de sécurité sensibles, contactez
          directement{' '}
          <Text span fw={600} c="blue">
            security@safedossier.fr
          </Text>
        </Text>
      </Stack>
    </Container>
  );
}
