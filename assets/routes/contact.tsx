import { createFileRoute } from '@tanstack/react-router';
import {
  Container,
  Title,
  Text,
  Stack,
  SimpleGrid,
  Paper,
  Group,
  ThemeIcon,
  Anchor,
} from '@mantine/core';
import { IconMail, IconPhone, IconMapPin, IconClock } from '@tabler/icons-react';
import { ContactForm } from '@components/contact/ContactForm';

export const Route = createFileRoute('/contact')({
  component: Contact,
});

function Contact() {
  const contactInfo = [
    {
      icon: IconMail,
      title: 'Email',
      value: 'contact@safedossier.fr',
      link: 'mailto:contact@safedossier.fr',
    },
    {
      icon: IconPhone,
      title: 'Téléphone',
      value: '+33 1 23 45 67 89',
      link: 'tel:+33123456789',
    },
    {
      icon: IconMapPin,
      title: 'Adresse',
      value: '42 Avenue des Champs-Élysées, 75008 Paris',
      link: null,
    },
    {
      icon: IconClock,
      title: 'Horaires',
      value: 'Lun-Ven : 9h-18h',
      link: null,
    },
  ];

  return (
    <Container size="lg" py={80}>
      <Stack align="center" gap="xl" mb={60}>
        <Title order={1} ta="center" size="3rem">
          Contactez-nous
        </Title>
        <Text size="xl" c="dimmed" ta="center" maw={700}>
          Une question ? Un problème ? Notre équipe est là pour vous aider.
          Nous vous répondons généralement sous 24h.
        </Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
        {/* Contact Info */}
        <Stack gap="lg">
          <Title order={3}>Informations de contact</Title>
          <Stack gap="md">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Paper key={index} shadow="xs" p="md" radius="md">
                  <Group gap="md">
                    <ThemeIcon size={50} radius="md" variant="light" color="blue">
                      <Icon size={25} />
                    </ThemeIcon>
                    <div>
                      <Text fw={600} mb={4}>
                        {info.title}
                      </Text>
                      {info.link ? (
                        <Anchor href={info.link} c="dimmed">
                          {info.value}
                        </Anchor>
                      ) : (
                        <Text c="dimmed">{info.value}</Text>
                      )}
                    </div>
                  </Group>
                </Paper>
              );
            })}
          </Stack>

          <Paper shadow="sm" p="xl" radius="md" mt="md">
            <Title order={4} mb="md">
              Support technique
            </Title>
            <Stack gap="sm">
              <Text size="sm">
                Pour un support technique urgent, connectez-vous à votre compte
                et utilisez le chat en direct disponible 24/7.
              </Text>
              <Text size="sm" c="dimmed">
                Pour les questions de sécurité sensibles, écrivez directement à{' '}
                <Anchor href="mailto:security@safedossier.fr">
                  security@safedossier.fr
                </Anchor>
              </Text>
            </Stack>
          </Paper>
        </Stack>

        {/* Contact Form */}
        <div>
          <Title order={3} mb="lg">
            Envoyez-nous un message
          </Title>
          <ContactForm />
        </div>
      </SimpleGrid>

      {/* FAQ Rapide */}
      <Stack gap="md" mt={80}>
        <Title order={3} ta="center">
          Questions fréquentes
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" mt="xl">
          <Paper shadow="xs" p="lg" radius="md">
            <Text fw={600} mb="xs">
              Quel est votre délai de réponse ?
            </Text>
            <Text size="sm" c="dimmed">
              Nous répondons généralement sous 24h les jours ouvrés. Pour les
              clients professionnels, le délai est de 4h maximum.
            </Text>
          </Paper>
          <Paper shadow="xs" p="lg" radius="md">
            <Text fw={600} mb="xs">
              Proposez-vous des démos personnalisées ?
            </Text>
            <Text size="sm" c="dimmed">
              Oui ! Pour les plans Famille et Professionnel, nous proposons des
              démos en visioconférence. Contactez-nous pour planifier un
              rendez-vous.
            </Text>
          </Paper>
          <Paper shadow="xs" p="lg" radius="md">
            <Text fw={600} mb="xs">
              Avez-vous un programme partenaire ?
            </Text>
            <Text size="sm" c="dimmed">
              Nous travaillons avec des notaires, avocats et experts-comptables.
              Écrivez-nous à partenaires@safedossier.fr pour en savoir plus.
            </Text>
          </Paper>
          <Paper shadow="xs" p="lg" radius="md">
            <Text fw={600} mb="xs">
              Puis-je visiter vos bureaux ?
            </Text>
            <Text size="sm" c="dimmed">
              Absolument ! Prenez rendez-vous par email ou téléphone pour visiter
              nos bureaux parisiens et rencontrer l'équipe.
            </Text>
          </Paper>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
