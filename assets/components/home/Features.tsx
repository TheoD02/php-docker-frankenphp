import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Paper,
  ThemeIcon,
  Stack,
} from '@mantine/core';
import { features } from '@/data/features';

export function Features() {
  return (
    <section style={{ padding: '5rem 0', backgroundColor: '#f8f9fa' }}>
      <Container size="lg">
        <Stack align="center" gap="md" mb="xl">
          <Title order={2} ta="center">
            Tout ce dont vous avez besoin pour sécuriser vos documents
          </Title>
          <Text size="lg" c="dimmed" ta="center" maw={600}>
            SafeDossier combine sécurité maximale et simplicité d'utilisation
            pour protéger ce qui compte vraiment pour vous.
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mt={50}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Paper
                key={index}
                shadow="sm"
                p="xl"
                radius="md"
                style={{
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <ThemeIcon
                  size={60}
                  radius="md"
                  variant="light"
                  color="blue"
                  mb="md"
                >
                  <Icon size={30} />
                </ThemeIcon>
                <Text fw={600} size="lg" mb="xs">
                  {feature.title}
                </Text>
                <Text size="sm" c="dimmed">
                  {feature.description}
                </Text>
              </Paper>
            );
          })}
        </SimpleGrid>
      </Container>
    </section>
  );
}
