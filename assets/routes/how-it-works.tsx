import { createFileRoute } from '@tanstack/react-router';
import {
  Container,
  Title,
  Text,
  Stack,
  Tabs,
  Card,
  ThemeIcon,
  Group,
  Badge,
} from '@mantine/core';
import { IconNumber1, IconNumber2, IconNumber3 } from '@tabler/icons-react';
import { userJourneys } from '@/data/howItWorks';

export const Route = createFileRoute('/how-it-works')({
  component: HowItWorks,
});

function HowItWorks() {
  return (
    <Container size="lg" py={80}>
      {/* Hero Section */}
      <Stack align="center" gap="xl" mb={60}>
        <Title order={1} ta="center" size="3rem">
          Comment fonctionne SafeDossier ?
        </Title>
        <Text size="xl" c="dimmed" ta="center" maw={800}>
          Que vous soyez candidat locataire, propriétaire ou agence immobilière,
          SafeDossier simplifie la gestion de vos dossiers de location en 3 étapes.
        </Text>
      </Stack>

      {/* Journey Tabs */}
      <Tabs defaultValue="Candidat" variant="pills" radius="md">
        <Tabs.List grow mb="xl" style={{ justifyContent: 'center' }}>
          {userJourneys.map((journey) => (
            <Tabs.Tab
              key={journey.userType}
              value={journey.userType}
              style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
            >
              {journey.userType}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {userJourneys.map((journey) => (
          <Tabs.Panel key={journey.userType} value={journey.userType}>
            <Stack gap="xl">
              {/* Journey Header */}
              <Card shadow="sm" padding="xl" radius="md" withBorder>
                <Stack gap="md">
                  <Group gap="md">
                    <Badge size="lg" color={journey.color} variant="light">
                      {journey.userType}
                    </Badge>
                  </Group>
                  <Title order={2}>{journey.title}</Title>
                  <Text size="lg" c="dimmed">
                    {journey.subtitle}
                  </Text>
                </Stack>
              </Card>

              {/* Steps */}
              <Stack gap="lg">
                {journey.steps.map((step) => {
                  const StepIcon =
                    step.step === 1
                      ? IconNumber1
                      : step.step === 2
                        ? IconNumber2
                        : IconNumber3;

                  return (
                    <Card
                      key={step.step}
                      shadow="sm"
                      padding="xl"
                      radius="md"
                      withBorder
                      style={{
                        transition: 'transform 0.2s, box-shadow 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateX(8px)';
                        e.currentTarget.style.boxShadow =
                          '0 8px 24px rgba(0,0,0,0.12)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.boxShadow = '';
                      }}
                    >
                      <Group align="flex-start" gap="xl">
                        <ThemeIcon
                          size={70}
                          radius="md"
                          variant="light"
                          color={journey.color}
                          style={{ flexShrink: 0 }}
                        >
                          <StepIcon size={35} />
                        </ThemeIcon>
                        <div style={{ flex: 1 }}>
                          <Title order={3} mb="sm">
                            {step.title}
                          </Title>
                          <Text size="lg" c="dimmed">
                            {step.description}
                          </Text>
                        </div>
                      </Group>
                    </Card>
                  );
                })}
              </Stack>
            </Stack>
          </Tabs.Panel>
        ))}
      </Tabs>

      {/* Bottom Section */}
      <Card shadow="md" padding="xl" radius="md" mt={80} bg="blue.0">
        <Stack align="center" gap="md">
          <Title order={3} ta="center">
            Prêt à simplifier votre gestion locative ?
          </Title>
          <Text size="lg" ta="center" c="dimmed" maw={700}>
            Rejoignez les milliers d'utilisateurs qui font confiance à SafeDossier
            pour gérer leurs dossiers de location en toute sécurité.
          </Text>
        </Stack>
      </Card>
    </Container>
  );
}
