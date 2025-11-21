import {
  Card,
  Stack,
  Group,
  Text,
  Badge,
  Button,
  Image,
  Divider,
  ThemeIcon,
  Anchor,
  Tooltip,
  Paper,
} from '@mantine/core';
import {
  IconMapPin,
  IconRuler,
  IconCurrencyEuro,
  IconCalendar,
  IconExternalLink,
  IconEye,
  IconUsers,
  IconCheck,
  IconShield,
  IconAlertCircle,
  IconTrendingUp,
} from '@tabler/icons-react';
import type { Housing } from '@/types/housing';

interface HousingCardProps {
  housing: Housing;
  onViewDetails?: () => void;
  showStats?: boolean;
}

const propertyTypeLabels: Record<string, string> = {
  studio: 'Studio',
  t1: 'T1',
  t2: 'T2',
  t3: 'T3',
  t4: 'T4',
  't5+': 'T5+',
  maison: 'Maison',
  colocation: 'Colocation',
  parking: 'Parking',
  autre: 'Autre',
};

const leaseTypeLabels: Record<string, string> = {
  meuble: 'Meublé',
  non_meuble: 'Non meublé',
  etudiant: 'Étudiant',
  saisonnier: 'Saisonnier',
  mobilite: 'Mobilité',
};

const statusColors: Record<string, string> = {
  draft: 'gray',
  active: 'green',
  rented: 'blue',
  archived: 'red',
};

const statusLabels: Record<string, string> = {
  draft: 'Brouillon',
  active: 'Actif',
  rented: 'Loué',
  archived: 'Archivé',
};

export function HousingCard({
  housing,
  onViewDetails,
  showStats = true,
}: HousingCardProps) {
  const availableDate = new Date(housing.availableFrom).toLocaleDateString(
    'fr-FR',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );

  // Calcul de métriques avancées
  const totalCost = housing.rent + housing.charges;
  const hasExternalLinks = housing.externalLinks &&
    Object.values(housing.externalLinks).some(link => link);
  const isAvailableSoon = new Date(housing.availableFrom) <=
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 jours

  // Taux de conversion (matchs / candidatures)
  const conversionRate = housing.stats?.applications
    ? Math.round((housing.stats.matches / housing.stats.applications) * 100)
    : 0;

  // Critères d'exigences principales
  const mainRequirements = [
    housing.requirements.income.guarantorRequired && 'Garant obligatoire',
    housing.requirements.income.minimumMonthly > 0 &&
      `Revenus min: ${housing.requirements.income.minimumMonthly}€`,
    housing.requirements.employment.acceptedTypes.length < 5 &&
      'Critères emploi stricts',
  ].filter(Boolean);

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'visible',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      <Card.Section style={{ position: 'relative' }}>
        {housing.photos && housing.photos.length > 0 ? (
          <Image
            src={housing.photos[0]}
            height={200}
            alt={housing.title}
            fallbackSrc="https://placehold.co/600x400/e9ecef/999999?text=Pas+de+photo"
          />
        ) : (
          <div
            style={{
              height: 200,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text c="white" size="xl" fw={600}>
              {propertyTypeLabels[housing.propertyType]}
            </Text>
          </div>
        )}

        {/* Badge disponibilité urgente */}
        {isAvailableSoon && housing.status === 'active' && (
          <Badge
            size="md"
            color="red"
            variant="filled"
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
            }}
          >
            Disponible bientôt
          </Badge>
        )}

        {/* Nombre de photos */}
        {housing.photos && housing.photos.length > 1 && (
          <Badge
            size="sm"
            color="dark"
            variant="filled"
            style={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              opacity: 0.8,
            }}
          >
            📷 {housing.photos.length} photos
          </Badge>
        )}
      </Card.Section>

      <Stack gap="md" mt="md">
        {/* Status et badges */}
        <Group justify="space-between">
          <Badge color={statusColors[housing.status]} variant="light">
            {statusLabels[housing.status]}
          </Badge>
          <Group gap="xs">
            <Badge variant="outline">
              {propertyTypeLabels[housing.propertyType]}
            </Badge>
            <Badge variant="outline">
              {leaseTypeLabels[housing.leaseType]}
            </Badge>
          </Group>
        </Group>

        {/* Titre */}
        <Text fw={600} size="lg" lineClamp={2}>
          {housing.title}
        </Text>

        {/* Infos principales */}
        <Group gap="lg">
          <Group gap="xs">
            <ThemeIcon size="sm" variant="light" color="blue">
              <IconRuler size={14} />
            </ThemeIcon>
            <Text size="sm">{housing.surface}m²</Text>
          </Group>
          <Group gap="xs">
            <ThemeIcon size="sm" variant="light" color="blue">
              <IconMapPin size={14} />
            </ThemeIcon>
            <Text size="sm" lineClamp={1}>
              {housing.address.city}
            </Text>
          </Group>
        </Group>

        {/* Prix avec détails */}
        <Paper p="sm" radius="md" style={{ background: '#f8f9fa' }}>
          <Stack gap="xs">
            <Group justify="space-between" align="baseline">
              <Group gap={4}>
                <IconCurrencyEuro size={24} color="#1976d2" />
                <Text size="xl" fw={700} c="blue">
                  {housing.rent}€
                </Text>
              </Group>
              <Text size="sm" c="dimmed">
                /mois CC
              </Text>
            </Group>
            <Group gap="md" wrap="wrap">
              <Tooltip label="Loyer hors charges">
                <Text size="xs" c="dimmed">
                  HC: {housing.rent - housing.charges}€
                </Text>
              </Tooltip>
              <Text size="xs" c="dimmed">•</Text>
              <Tooltip label="Charges mensuelles">
                <Text size="xs" c="dimmed">
                  Charges: {housing.charges}€
                </Text>
              </Tooltip>
              <Text size="xs" c="dimmed">•</Text>
              <Tooltip label="Dépôt de garantie">
                <Text size="xs" c="dimmed">
                  Dépôt: {housing.deposit}€
                </Text>
              </Tooltip>
            </Group>
            <Divider style={{ margin: '4px 0' }} />
            <Group justify="space-between">
              <Text size="xs" fw={500}>
                Total premier mois
              </Text>
              <Text size="sm" fw={600} c="blue">
                {totalCost + housing.deposit}€
              </Text>
            </Group>
          </Stack>
        </Paper>

        {/* Disponibilité */}
        <Group gap="xs">
          <ThemeIcon
            size="sm"
            variant="light"
            color={isAvailableSoon ? 'red' : 'gray'}
          >
            <IconCalendar size={14} />
          </ThemeIcon>
          <Text size="sm" c={isAvailableSoon ? 'red' : 'dimmed'}>
            Disponible {isAvailableSoon ? '🔥 ' : ''}dès le {availableDate}
          </Text>
        </Group>

        {/* Critères d'exigences */}
        {mainRequirements.length > 0 && (
          <Paper p="sm" radius="md" style={{ background: '#fff3e0' }}>
            <Group gap="xs" mb={4}>
              <ThemeIcon size="sm" variant="light" color="orange">
                <IconShield size={14} />
              </ThemeIcon>
              <Text size="xs" fw={600} c="orange">
                Critères d'éligibilité
              </Text>
            </Group>
            <Stack gap={4}>
              {mainRequirements.map((req, index) => (
                <Group key={index} gap={4}>
                  <Text size="xs" c="orange">
                    •
                  </Text>
                  <Text size="xs">{req}</Text>
                </Group>
              ))}
            </Stack>
          </Paper>
        )}

        {/* Statistiques avancées */}
        {showStats && housing.stats && (
          <>
            <Divider />
            <Paper p="sm" radius="md" style={{ background: '#e7f5e7' }}>
              <Stack gap="sm">
                <Group justify="space-between">
                  <Group gap="xs">
                    <ThemeIcon size="sm" variant="light" color="gray">
                      <IconEye size={14} />
                    </ThemeIcon>
                    <Text size="sm">{housing.stats.views}</Text>
                  </Group>
                  <Group gap="xs">
                    <ThemeIcon size="sm" variant="light" color="blue">
                      <IconUsers size={14} />
                    </ThemeIcon>
                    <Text size="sm">{housing.stats.applications}</Text>
                  </Group>
                  <Group gap="xs">
                    <ThemeIcon size="sm" variant="light" color="green">
                      <IconCheck size={14} />
                    </ThemeIcon>
                    <Text size="sm" c="green" fw={600}>
                      {housing.stats.matches}
                    </Text>
                  </Group>
                </Group>

                {/* Taux de conversion */}
                {conversionRate > 0 && (
                  <Group justify="space-between" mt={4}>
                    <Group gap={4}>
                      <ThemeIcon size="xs" variant="light" color="green">
                        <IconTrendingUp size={12} />
                      </ThemeIcon>
                      <Text size="xs" c="dimmed">
                        Taux de matching
                      </Text>
                    </Group>
                    <Badge
                      size="sm"
                      color={conversionRate >= 50 ? 'green' : conversionRate >= 25 ? 'blue' : 'orange'}
                      variant="filled"
                    >
                      {conversionRate}%
                    </Badge>
                  </Group>
                )}

                {/* Alerte si aucun match */}
                {housing.stats.applications > 0 && housing.stats.matches === 0 && (
                  <Group gap={4} mt={4}>
                    <IconAlertCircle size={14} color="orange" />
                    <Text size="xs" c="orange">
                      Aucun match trouvé - critères trop stricts ?
                    </Text>
                  </Group>
                )}
              </Stack>
            </Paper>
          </>
        )}

        {/* Liens externes améliorés */}
        {hasExternalLinks && (
          <>
            <Divider />
            <Stack gap="xs">
              <Group gap={4}>
                <IconExternalLink size={14} color="gray" />
                <Text size="xs" fw={500} c="dimmed">
                  Liens utiles
                </Text>
              </Group>
              <Group gap="xs" wrap="wrap">
                {housing.externalLinks?.leboncoin && (
                  <Anchor
                    href={housing.externalLinks.leboncoin}
                    target="_blank"
                    size="xs"
                  >
                    <Badge variant="light" size="sm" style={{ cursor: 'pointer' }}>
                      🟠 Leboncoin
                    </Badge>
                  </Anchor>
                )}
                {housing.externalLinks?.seloger && (
                  <Anchor
                    href={housing.externalLinks.seloger}
                    target="_blank"
                    size="xs"
                  >
                    <Badge variant="light" size="sm" style={{ cursor: 'pointer' }}>
                      🔵 SeLoger
                    </Badge>
                  </Anchor>
                )}
                {housing.externalLinks?.googleMaps && (
                  <Anchor
                    href={housing.externalLinks.googleMaps}
                    target="_blank"
                    size="xs"
                  >
                    <Badge variant="light" size="sm" style={{ cursor: 'pointer' }}>
                      📍 Maps
                    </Badge>
                  </Anchor>
                )}
                {housing.externalLinks?.agencyWebsite && (
                  <Anchor
                    href={housing.externalLinks.agencyWebsite}
                    target="_blank"
                    size="xs"
                  >
                    <Badge variant="light" size="sm" style={{ cursor: 'pointer' }}>
                      🏢 Agence
                    </Badge>
                  </Anchor>
                )}
                {housing.externalLinks?.photosUrl && (
                  <Anchor
                    href={housing.externalLinks.photosUrl}
                    target="_blank"
                    size="xs"
                  >
                    <Badge variant="light" size="sm" style={{ cursor: 'pointer' }}>
                      📷 Photos
                    </Badge>
                  </Anchor>
                )}
              </Group>
            </Stack>
          </>
        )}

        {/* Actions */}
        <Button
          fullWidth
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan' }}
          onClick={onViewDetails}
          mt="sm"
          size="md"
        >
          Voir les détails complets
        </Button>
      </Stack>
    </Card>
  );
}
