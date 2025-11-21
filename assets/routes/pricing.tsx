import { createFileRoute } from '@tanstack/react-router';
import {
  Container,
  Title,
  Text,
  Stack,
  SimpleGrid,
  Card,
  Divider,
  Badge,
  List,
} from '@mantine/core';
import { PricingCard } from '@components/pricing/PricingCard';
import {
  candidatPlan,
  proprietairePlans,
  agencePlans,
  additionalOptions,
} from '@/data/pricing';

export const Route = createFileRoute('/pricing')({
  component: Pricing,
});

function Pricing() {
  return (
    <Container size="lg" py={80}>
      <Stack align="center" gap="xl" mb={60}>
        <Title order={1} ta="center" size="3rem">
          Des tarifs adaptés à chaque profil
        </Title>
        <Text size="xl" c="dimmed" ta="center" maw={700}>
          Que vous soyez candidat locataire, propriétaire ou agence, nous avons
          une solution pour vous. Commencez gratuitement, payez seulement ce dont
          vous avez besoin.
        </Text>
      </Stack>

      {/* Candidat - Plan gratuit mis en avant */}
      <Card shadow="lg" padding="xl" radius="md" mb={60} withBorder bg="blue.0">
        <Stack align="center" gap="md" mb="lg">
          <Badge size="xl" variant="filled" color="green">
            {candidatPlan.badge}
          </Badge>
          <Title order={2} ta="center">
            {candidatPlan.name}
          </Title>
          <Text size="lg" c="dimmed" ta="center" maw={600}>
            {candidatPlan.description}
          </Text>
        </Stack>
        <PricingCard plan={candidatPlan} />
      </Card>

      <Divider my={60} />

      {/* Propriétaires */}
      <Stack align="center" gap="md" mb={40}>
        <Title order={2} ta="center">
          Pour les propriétaires
        </Title>
        <Text size="lg" c="dimmed" ta="center" maw={700}>
          Recevez et analysez les dossiers de vos candidats locataires en toute
          sécurité. Payant uniquement à partir du 2e locataire.
        </Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mb={60}>
        {proprietairePlans.map((plan, index) => (
          <PricingCard key={index} plan={plan} />
        ))}
      </SimpleGrid>

      <Divider my={60} />

      {/* Agences */}
      <Stack align="center" gap="md" mb={40}>
        <Title order={2} ta="center">
          Pour les agences immobilières
        </Title>
        <Text size="lg" c="dimmed" ta="center" maw={700}>
          Gérez tous vos dossiers locataires avec un outil professionnel et
          conforme RGPD. Collaboration d'équipe, automatisation et conformité.
        </Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mb={60}>
        {agencePlans.map((plan, index) => (
          <PricingCard key={index} plan={plan} />
        ))}
      </SimpleGrid>

      <Divider my={60} />

      {/* Options additionnelles */}
      <Stack align="center" gap="md" mb={40}>
        <Title order={2} ta="center">
          Options additionnelles
        </Title>
        <Text size="lg" c="dimmed" ta="center" maw={700}>
          Des fonctionnalités avancées pour aller plus loin
        </Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" mb={60}>
        {additionalOptions.map((option, index) => (
          <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md">
              <div>
                <Text fw={600} size="lg">
                  {option.name}
                </Text>
                <Text size="sm" c="dimmed" mt={4}>
                  {option.description}
                </Text>
              </div>
              <Text size="xl" fw={700} c="blue">
                {option.price}
              </Text>
              <List size="sm" spacing="xs">
                {option.features.map((feature, featureIndex) => (
                  <List.Item key={featureIndex}>{feature}</List.Item>
                ))}
              </List>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>

      {/* FAQ */}
      <Stack align="center" gap="md" mt={80}>
        <Title order={2} ta="center">
          Questions fréquentes
        </Title>
        <Stack gap="xl" mt="xl" maw={800}>
          <div>
            <Text fw={600} size="lg" mb="xs">
              Le candidat doit-il payer ?
            </Text>
            <Text c="dimmed">
              Non, jamais. Le candidat locataire peut créer et partager son
              dossier gratuitement, sans limite. Nous faisons payer uniquement
              les propriétaires et agences qui reçoivent les dossiers.
            </Text>
          </div>
          <div>
            <Text fw={600} size="lg" mb="xs">
              Comment fonctionne la tarification pour les propriétaires ?
            </Text>
            <Text c="dimmed">
              Le 1er locataire est gratuit (plan Proprio Solo). À partir du 2e
              locataire, vous payez soit 12€/an/locataire (Proprio Plus) soit
              2€/mois/locataire (Proprio Premium) selon vos besoins.
            </Text>
          </div>
          <div>
            <Text fw={600} size="lg" mb="xs">
              Puis-je changer de plan à tout moment ?
            </Text>
            <Text c="dimmed">
              Oui, vous pouvez upgrader ou downgrader votre plan à tout moment.
              Pour les plans annuels, un prorata sera appliqué.
            </Text>
          </div>
          <div>
            <Text fw={600} size="lg" mb="xs">
              Que se passe-t-il après la signature du bail ?
            </Text>
            <Text c="dimmed">
              Avec le plan Proprio Premium, les documents sont automatiquement
              archivés et téléchargeables. Sinon, vous avez accès aux dossiers
              pendant la durée de votre abonnement, puis ils sont automatiquement
              supprimés conformément au RGPD.
            </Text>
          </div>
        </Stack>
      </Stack>

      {/* Exemples de cas */}
      <Card shadow="md" padding="xl" radius="md" mt={80} bg="gray.0">
        <Title order={3} mb="lg" ta="center">
          Exemples de cas réels
        </Title>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
          <Stack gap="xs">
            <Text fw={600}>Propriétaire avec 1 locataire</Text>
            <Text size="xl" fw={700} c="blue">
              Gratuit
            </Text>
            <Text size="sm" c="dimmed">
              Parfait pour démarrer et découvrir la plateforme
            </Text>
          </Stack>
          <Stack gap="xs">
            <Text fw={600}>Propriétaire avec 3 locataires</Text>
            <Text size="xl" fw={700} c="blue">
              36€/an
            </Text>
            <Text size="sm" c="dimmed">
              3 × 12€/an = moins de 3€/mois
            </Text>
          </Stack>
          <Stack gap="xs">
            <Text fw={600}>Agence avec 30 dossiers actifs</Text>
            <Text size="xl" fw={700} c="blue">
              79€/mois
            </Text>
            <Text size="sm" c="dimmed">
              Plan Agence Pro, tout inclus
            </Text>
          </Stack>
        </SimpleGrid>
      </Card>
    </Container>
  );
}
