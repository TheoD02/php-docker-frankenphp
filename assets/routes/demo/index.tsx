import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Container,
  Title,
  Text,
  Stack,
  SimpleGrid,
  Card,
  ThemeIcon,
  Group,
  Badge,
  Button,
} from '@mantine/core';
import {
  IconHome,
  IconChartBar,
  IconArrowRight,
} from '@tabler/icons-react';

export const Route = createFileRoute('/demo/')({
  component: DemoIndex,
});

function DemoIndex() {
  const demos = [
    {
      title: 'Gestion des logements',
      description:
        'Visualisez comment les propriétaires et agences peuvent ajouter et gérer leurs logements avec toutes les informations détaillées.',
      icon: IconHome,
      color: 'blue',
      path: '/demo/housings',
      features: [
        'Liste complète des logements',
        'Filtres par statut et type',
        'Statistiques de performance',
        'Liens externes (Leboncoin, SeLoger)',
      ],
    },
    {
      title: 'Matching automatique',
      description:
        'Découvrez notre algorithme intelligent qui compare automatiquement les profils candidats avec les exigences des logements.',
      icon: IconChartBar,
      color: 'green',
      path: '/demo/matching',
      features: [
        'Score sur 100 par matching',
        'Analyse détaillée par critère',
        'Vue candidat et vue logement',
        'Tableau comparatif complet',
      ],
    },
  ];

  return (
    <Container size="lg" py={80}>
      <Stack gap="xl">
        {/* En-tête */}
        <div>
          <Badge size="lg" variant="gradient" mb="md">
            Pages de démonstration
          </Badge>
          <Title order={1} mb="md">
            Découvrez SafeDossier en action
          </Title>
          <Text size="lg" c="dimmed" maw={800}>
            Explorez nos fonctionnalités principales à travers des démonstrations
            interactives avec des données réalistes. Testez le système de gestion
            de logements et l'algorithme de matching intelligent.
          </Text>
        </div>

        {/* Statistiques */}
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
          <Stack
            gap={4}
            p="md"
            style={{ background: '#f8f9fa', borderRadius: 8 }}
          >
            <Text size="2rem" fw={700} c="blue">
              4
            </Text>
            <Text size="sm" c="dimmed">
              Logements d'exemple
            </Text>
          </Stack>
          <Stack
            gap={4}
            p="md"
            style={{ background: '#f8f9fa', borderRadius: 8 }}
          >
            <Text size="2rem" fw={700} c="green">
              4
            </Text>
            <Text size="sm" c="dimmed">
              Profils candidats
            </Text>
          </Stack>
          <Stack
            gap={4}
            p="md"
            style={{ background: '#f8f9fa', borderRadius: 8 }}
          >
            <Text size="2rem" fw={700} c="violet">
              16
            </Text>
            <Text size="sm" c="dimmed">
              Matchs analysés
            </Text>
          </Stack>
        </SimpleGrid>

        {/* Démos */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl" mt="xl">
          {demos.map((demo, index) => {
            const Icon = demo.icon;
            return (
              <Card
                key={index}
                shadow="md"
                padding="xl"
                radius="md"
                withBorder
                style={{
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <Stack gap="md">
                  <Group justify="space-between">
                    <ThemeIcon
                      size={60}
                      radius="md"
                      variant="light"
                      color={demo.color}
                    >
                      <Icon size={30} />
                    </ThemeIcon>
                    <Badge size="lg" color={demo.color} variant="light">
                      Interactif
                    </Badge>
                  </Group>

                  <Title order={3}>{demo.title}</Title>

                  <Text c="dimmed">{demo.description}</Text>

                  <Stack gap="xs" mt="sm">
                    {demo.features.map((feature, i) => (
                      <Group key={i} gap="xs">
                        <Text c={demo.color} size="lg">
                          •
                        </Text>
                        <Text size="sm">{feature}</Text>
                      </Group>
                    ))}
                  </Stack>

                  <Link to={demo.path} style={{ textDecoration: 'none' }}>
                    <Button
                      fullWidth
                      size="lg"
                      color={demo.color}
                      rightSection={<IconArrowRight size={20} />}
                      mt="md"
                    >
                      Essayer la démo
                    </Button>
                  </Link>
                </Stack>
              </Card>
            );
          })}
        </SimpleGrid>

        {/* Note */}
        <Stack
          gap="sm"
          p="xl"
          style={{ background: '#fff9e6', borderRadius: 8 }}
          mt="xl"
        >
          <Title order={4}>📌 Note importante</Title>
          <Text size="sm">
            Ces pages de démonstration utilisent des <strong>données mockées</strong> pour
            illustrer les fonctionnalités. Dans la version réelle de SafeDossier,
            toutes ces données seront connectées à l'API et stockées de manière
            sécurisée avec chiffrement AES-256.
          </Text>
          <Text size="sm" mt="xs">
            Les algorithmes de matching et les calculs de scores sont
            fonctionnels et identiques à ceux qui seront utilisés en production.
          </Text>
        </Stack>
      </Stack>
    </Container>
  );
}
