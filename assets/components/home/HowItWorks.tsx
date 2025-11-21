import {
  Container,
  Title,
  Text,
  Timeline,
  Stack,
  ThemeIcon,
} from '@mantine/core';
import {
  IconUserPlus,
  IconUpload,
  IconFolderShare,
} from '@tabler/icons-react';
import { howItWorksSteps } from '@/data/features';

const icons = [IconUserPlus, IconUpload, IconFolderShare];

export function HowItWorks() {
  return (
    <section style={{ padding: '5rem 0' }}>
      <Container size="lg">
        <Stack align="center" gap="md" mb="xl">
          <Title order={2} ta="center">
            Comment ça marche ?
          </Title>
          <Text size="lg" c="dimmed" ta="center" maw={600}>
            Trois étapes simples pour protéger vos documents importants
          </Text>
        </Stack>

        <Timeline
          active={3}
          bulletSize={60}
          lineWidth={3}
          mt={50}
          styles={{
            item: {
              paddingBottom: '2rem',
            },
          }}
        >
          {howItWorksSteps.map((step, index) => {
            const Icon = icons[index] || IconUserPlus;
            return (
              <Timeline.Item
                key={index}
                bullet={
                  <ThemeIcon size={60} radius="xl" color="blue" variant="filled">
                    <Icon size={30} />
                  </ThemeIcon>
                }
                title={
                  <Text fw={600} size="xl" mt="xs">
                    {step.title}
                  </Text>
                }
              >
                <Text c="dimmed" size="lg" mt="xs">
                  {step.description}
                </Text>
              </Timeline.Item>
            );
          })}
        </Timeline>
      </Container>
    </section>
  );
}
