import { Container, Title, Text, Button, Stack, Group } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';

export function CTA() {
  return (
    <section
      style={{
        padding: '5rem 0',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
      }}
    >
      <Container size="lg">
        <Stack align="center" gap="xl" maw={700} mx="auto">
          <Title order={2} ta="center" size="2.5rem">
            Prêt à sécuriser vos documents ?
          </Title>

          <Text size="xl" ta="center">
            Rejoignez les 50 000+ utilisateurs qui font confiance à SafeDossier
            pour protéger leurs documents importants.
          </Text>

          <Group gap="md" mt="md">
            <Button
              size="xl"
              variant="white"
              color="dark"
              rightSection={<IconArrowRight size={20} />}
            >
              Essayer gratuitement
            </Button>
          </Group>

          <Text size="sm" ta="center" opacity={0.9}>
            Aucune carte bancaire requise • 30 jours d'essai gratuit • Annulation à tout moment
          </Text>
        </Stack>
      </Container>
    </section>
  );
}
