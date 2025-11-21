import { Container, Title, Text, Button, Group, Stack } from '@mantine/core';
import { IconArrowRight, IconPlayerPlay } from '@tabler/icons-react';

export function Hero() {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '6rem 0',
        color: 'white',
      }}
    >
      <Container size="lg">
        <Stack align="center" gap="xl" maw={800} mx="auto">
          <Title
            order={1}
            ta="center"
            style={{
              fontSize: '3rem',
              fontWeight: 800,
              lineHeight: 1.2,
            }}
          >
            Vos documents importants,{' '}
            <span style={{ color: '#ffd700' }}>enfin en sécurité</span>
          </Title>

          <Text size="xl" ta="center" maw={600}>
            SafeDossier est le coffre-fort numérique qui protège vos documents
            personnels avec un chiffrement bancaire. Simple, sécurisé, 100%
            français.
          </Text>

          <Group gap="md" mt="md">
            <Button
              size="lg"
              variant="white"
              color="dark"
              rightSection={<IconArrowRight size={20} />}
            >
              Commencer gratuitement
            </Button>
            <Button
              size="lg"
              variant="outline"
              color="white"
              leftSection={<IconPlayerPlay size={20} />}
            >
              Voir la démo
            </Button>
          </Group>

          <Group gap="xl" mt="xl">
            <Stack align="center" gap={4}>
              <Text size="xl" fw={700}>
                50 000+
              </Text>
              <Text size="sm" opacity={0.8}>
                Utilisateurs actifs
              </Text>
            </Stack>
            <Stack align="center" gap={4}>
              <Text size="xl" fw={700}>
                2M+
              </Text>
              <Text size="sm" opacity={0.8}>
                Documents sécurisés
              </Text>
            </Stack>
            <Stack align="center" gap={4}>
              <Text size="xl" fw={700}>
                4.9/5
              </Text>
              <Text size="sm" opacity={0.8}>
                Note utilisateurs
              </Text>
            </Stack>
          </Group>
        </Stack>
      </Container>
    </section>
  );
}
