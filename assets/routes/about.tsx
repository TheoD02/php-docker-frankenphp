import { createFileRoute } from '@tanstack/react-router';
import {
  Container,
  Title,
  Text,
  Stack,
  SimpleGrid,
  Avatar,
  Paper,
  Group,
  ThemeIcon,
} from '@mantine/core';
import {
  IconShield,
  IconEye,
  IconLock,
  IconHeart,
} from '@tabler/icons-react';
import { teamMembers, companyValues } from '@/data/team';

export const Route = createFileRoute('/about')({
  component: About,
});

const valueIcons = [IconShield, IconEye, IconLock, IconHeart];

function About() {
  return (
    <Container size="lg" py={80}>
      {/* Hero Section */}
      <Stack align="center" gap="xl" mb={80}>
        <Title order={1} ta="center" size="3rem">
          Notre mission : protéger ce qui compte pour vous
        </Title>
        <Text size="xl" c="dimmed" ta="center" maw={800}>
          Fondée en 2022 par une équipe d'experts en cybersécurité et droit
          numérique, SafeDossier est née d'un constat simple : gérer ses
          documents importants devrait être sécurisé ET simple.
        </Text>
      </Stack>

      {/* Story Section */}
      <Paper shadow="sm" p="xl" radius="md" mb={80}>
        <Title order={2} mb="md">
          Notre histoire
        </Title>
        <Stack gap="md">
          <Text>
            Tout a commencé lorsque Marie, avocate spécialisée en droit
            numérique, a constaté que ses clients perdaient régulièrement des
            documents importants ou les stockaient de manière non sécurisée. Les
            solutions existantes étaient soit trop complexes, soit pas assez
            sécurisées.
          </Text>
          <Text>
            Avec Thomas, expert en cybersécurité, ils ont décidé de créer
            SafeDossier : une solution qui combine la sécurité des coffres-forts
            bancaires avec la simplicité d'utilisation d'une application grand
            public.
          </Text>
          <Text>
            Aujourd'hui, plus de 50 000 utilisateurs font confiance à SafeDossier
            pour protéger leurs documents les plus importants : contrats,
            documents médicaux, titres de propriété, diplômes, et bien plus
            encore.
          </Text>
        </Stack>
      </Paper>

      {/* Values Section */}
      <Stack align="center" gap="xl" mb={80}>
        <Title order={2} ta="center">
          Nos valeurs
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" w="100%">
          {companyValues.map((value, index) => {
            const Icon = valueIcons[index] || IconShield;
            return (
              <Paper key={index} shadow="sm" p="xl" radius="md">
                <Group align="flex-start" gap="md">
                  <ThemeIcon size={50} radius="md" variant="light" color="blue">
                    <Icon size={25} />
                  </ThemeIcon>
                  <div style={{ flex: 1 }}>
                    <Text fw={600} size="lg" mb="xs">
                      {value.title}
                    </Text>
                    <Text c="dimmed">{value.description}</Text>
                  </div>
                </Group>
              </Paper>
            );
          })}
        </SimpleGrid>
      </Stack>

      {/* Team Section */}
      <Stack align="center" gap="xl">
        <Title order={2} ta="center">
          Notre équipe
        </Title>
        <Text size="lg" c="dimmed" ta="center" maw={700}>
          Une équipe passionnée de professionnels de la sécurité, du droit et de
          la tech, tous unis par une même mission : protéger vos données.
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg" w="100%">
          {teamMembers.map((member, index) => (
            <Paper key={index} shadow="sm" p="lg" radius="md">
              <Stack align="center" gap="md">
                <Avatar src={member.avatar} size={120} radius={120} />
                <div style={{ textAlign: 'center' }}>
                  <Text fw={600} size="lg">
                    {member.name}
                  </Text>
                  <Text size="sm" c="blue" mb="xs">
                    {member.role}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {member.bio}
                  </Text>
                </div>
              </Stack>
            </Paper>
          ))}
        </SimpleGrid>
      </Stack>

      {/* Stats Section */}
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" mt={80}>
        <Stack align="center" gap={4}>
          <Text size="3rem" fw={700} c="blue">
            50 000+
          </Text>
          <Text size="lg" c="dimmed">
            Utilisateurs actifs
          </Text>
        </Stack>
        <Stack align="center" gap={4}>
          <Text size="3rem" fw={700} c="blue">
            2M+
          </Text>
          <Text size="lg" c="dimmed">
            Documents protégés
          </Text>
        </Stack>
        <Stack align="center" gap={4}>
          <Text size="3rem" fw={700} c="blue">
            99.9%
          </Text>
          <Text size="lg" c="dimmed">
            Disponibilité
          </Text>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
