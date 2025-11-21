import {
  Modal,
  Stack,
  Group,
  Text,
  Badge,
  Divider,
  ThemeIcon,
  Paper,
  Grid,
  Title,
  Anchor,
  Button,
  Accordion,
} from '@mantine/core';
import {
  IconHome,
  IconRuler,
  IconMapPin,
  IconCurrencyEuro,
  IconCalendar,
  IconBed,
  IconKey,
  IconExternalLink,
  IconShield,
  IconUsers,
  IconBriefcase,
  IconAlertCircle,
  IconCheck,
  IconX,
  IconChartBar,
  IconEye,
} from '@tabler/icons-react';
import type { Housing, CandidateProfile, MatchResult } from '@/types/housing';
import { MatchingResultCard } from '@components/matching/MatchingResultCard';

interface HousingDetailModalProps {
  opened: boolean;
  onClose: () => void;
  housing: Housing;
  matchResult?: MatchResult;
  candidate?: CandidateProfile;
  onApply?: () => void;
  onContactOwner?: () => void;
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

const employmentTypeLabels: Record<string, string> = {
  cdi: 'CDI',
  cdd: 'CDD',
  interim: 'Intérim',
  etudiant: 'Étudiant',
  freelance: 'Freelance',
  auto_entrepreneur: 'Auto-entrepreneur',
  retraite: 'Retraité',
  chomage: 'Chômage',
  rsa: 'RSA',
  profession_liberale: 'Profession libérale',
  fonctionnaire: 'Fonctionnaire',
};

const guarantorTypeLabels: Record<string, string> = {
  physique: 'Garant physique (famille)',
  garantme: 'GarantMe',
  visale: 'Visale (Action Logement)',
  entreprise: 'Garantie entreprise',
  gli: 'Assurance GLI',
  aucun: 'Aucun',
};

const seniorityLabels: Record<string, string> = {
  none: 'Aucune',
  '3_months': '3 mois',
  '6_months': '6 mois',
  '1_year': '1 an',
};

export function HousingDetailModal({
  opened,
  onClose,
  housing,
  matchResult,
  candidate,
  onApply,
  onContactOwner,
}: HousingDetailModalProps) {
  const availableDate = new Date(housing.availableFrom).toLocaleDateString(
    'fr-FR',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );

  const totalFirstMonth = housing.rent + housing.charges + housing.deposit;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="xl"
      title={
        <Group gap="md">
          <ThemeIcon size="lg" radius="md" color="blue" variant="light">
            <IconHome size={24} />
          </ThemeIcon>
          <div>
            <Title order={3}>{housing.title}</Title>
            <Text size="sm" c="dimmed">
              Référence: {housing.id}
            </Text>
          </div>
        </Group>
      }
      styles={{
        body: {
          maxHeight: 'calc(100vh - 200px)',
          overflowY: 'auto',
        },
      }}
    >
      <Stack gap="xl">
        {/* ============ SECTION 1 : INFORMATIONS GÉNÉRALES ============ */}
        <Paper p="lg" radius="md" withBorder>
          <Stack gap="md">
            <Group gap="xs">
              <ThemeIcon size="sm" radius="md" color="blue" variant="light">
                <IconHome size={16} />
              </ThemeIcon>
              <Title order={4}>Informations générales</Title>
            </Group>

            <Divider />

            {/* Grille d'informations */}
            <Grid>
              {/* Type de bien */}
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Stack gap={4}>
                  <Text size="xs" c="dimmed" fw={500}>
                    TYPE DE BIEN
                  </Text>
                  <Group gap="xs">
                    <ThemeIcon size="sm" variant="light" color="blue">
                      <IconBed size={14} />
                    </ThemeIcon>
                    <Text fw={600}>
                      {propertyTypeLabels[housing.propertyType]}
                    </Text>
                  </Group>
                </Stack>
              </Grid.Col>

              {/* Surface */}
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Stack gap={4}>
                  <Text size="xs" c="dimmed" fw={500}>
                    SURFACE
                  </Text>
                  <Group gap="xs">
                    <ThemeIcon size="sm" variant="light" color="blue">
                      <IconRuler size={14} />
                    </ThemeIcon>
                    <Text fw={600}>{housing.surface} m²</Text>
                  </Group>
                </Stack>
              </Grid.Col>

              {/* Adresse */}
              <Grid.Col span={12}>
                <Stack gap={4}>
                  <Text size="xs" c="dimmed" fw={500}>
                    ADRESSE / SECTEUR
                  </Text>
                  <Group gap="xs">
                    <ThemeIcon size="sm" variant="light" color="blue">
                      <IconMapPin size={14} />
                    </ThemeIcon>
                    <Text fw={600}>
                      {housing.address.street && `${housing.address.street}, `}
                      {housing.address.city} {housing.address.postalCode}
                    </Text>
                  </Group>
                </Stack>
              </Grid.Col>

              {/* Loyer CC */}
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Stack gap={4}>
                  <Text size="xs" c="dimmed" fw={500}>
                    LOYER CHARGES COMPRISES
                  </Text>
                  <Group gap="xs">
                    <ThemeIcon size="sm" variant="light" color="green">
                      <IconCurrencyEuro size={14} />
                    </ThemeIcon>
                    <Text fw={700} size="lg" c="green">
                      {housing.rent}€
                    </Text>
                    <Text size="sm" c="dimmed">
                      /mois
                    </Text>
                  </Group>
                </Stack>
              </Grid.Col>

              {/* Charges */}
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Stack gap={4}>
                  <Text size="xs" c="dimmed" fw={500}>
                    CHARGES
                  </Text>
                  <Group gap="xs">
                    <Text fw={600}>{housing.charges}€</Text>
                    <Text size="sm" c="dimmed">
                      /mois
                    </Text>
                  </Group>
                </Stack>
              </Grid.Col>

              {/* Dépôt de garantie */}
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Stack gap={4}>
                  <Text size="xs" c="dimmed" fw={500}>
                    DÉPÔT DE GARANTIE
                  </Text>
                  <Group gap="xs">
                    <ThemeIcon size="sm" variant="light" color="orange">
                      <IconKey size={14} />
                    </ThemeIcon>
                    <Text fw={600}>{housing.deposit}€</Text>
                    <Text size="xs" c="dimmed">
                      ({Math.round(housing.deposit / housing.rent)} mois)
                    </Text>
                  </Group>
                </Stack>
              </Grid.Col>

              {/* Disponibilité */}
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Stack gap={4}>
                  <Text size="xs" c="dimmed" fw={500}>
                    DISPONIBILITÉ
                  </Text>
                  <Group gap="xs">
                    <ThemeIcon size="sm" variant="light" color="violet">
                      <IconCalendar size={14} />
                    </ThemeIcon>
                    <Text fw={600}>{availableDate}</Text>
                  </Group>
                </Stack>
              </Grid.Col>

              {/* Type de bail */}
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Stack gap={4}>
                  <Text size="xs" c="dimmed" fw={500}>
                    TYPE DE BAIL
                  </Text>
                  <Badge size="lg" variant="light" color="blue">
                    {leaseTypeLabels[housing.leaseType]}
                  </Badge>
                </Stack>
              </Grid.Col>
            </Grid>

            {/* Récapitulatif financier */}
            <Paper p="md" radius="md" style={{ background: '#e3f2fd' }}>
              <Stack gap="xs">
                <Text size="sm" fw={600} c="blue">
                  💰 Récapitulatif financier
                </Text>
                <Group justify="space-between">
                  <Text size="sm">Loyer HC</Text>
                  <Text size="sm" fw={500}>
                    {housing.rent - housing.charges}€
                  </Text>
                </Group>
                <Group justify="space-between">
                  <Text size="sm">+ Charges</Text>
                  <Text size="sm" fw={500}>
                    {housing.charges}€
                  </Text>
                </Group>
                <Group justify="space-between">
                  <Text size="sm">+ Dépôt de garantie</Text>
                  <Text size="sm" fw={500}>
                    {housing.deposit}€
                  </Text>
                </Group>
                <Divider />
                <Group justify="space-between">
                  <Text size="sm" fw={700}>
                    Total 1er mois
                  </Text>
                  <Text size="lg" fw={700} c="blue">
                    {totalFirstMonth}€
                  </Text>
                </Group>
              </Stack>
            </Paper>

            {/* Description */}
            {housing.description && (
              <Stack gap="xs">
                <Text size="sm" fw={600}>
                  Description
                </Text>
                <Text size="sm" c="dimmed">
                  {housing.description}
                </Text>
              </Stack>
            )}

            {/* Liens externes */}
            {housing.externalLinks && (
              <Stack gap="xs">
                <Text size="sm" fw={600}>
                  Liens externes
                </Text>
                <Group gap="xs" wrap="wrap">
                  {housing.externalLinks.leboncoin && (
                    <Anchor
                      href={housing.externalLinks.leboncoin}
                      target="_blank"
                      size="sm"
                    >
                      <Badge
                        leftSection={<IconExternalLink size={12} />}
                        variant="light"
                        style={{ cursor: 'pointer' }}
                      >
                        Leboncoin
                      </Badge>
                    </Anchor>
                  )}
                  {housing.externalLinks.seloger && (
                    <Anchor
                      href={housing.externalLinks.seloger}
                      target="_blank"
                      size="sm"
                    >
                      <Badge
                        leftSection={<IconExternalLink size={12} />}
                        variant="light"
                        style={{ cursor: 'pointer' }}
                      >
                        SeLoger
                      </Badge>
                    </Anchor>
                  )}
                  {housing.externalLinks.googleMaps && (
                    <Anchor
                      href={housing.externalLinks.googleMaps}
                      target="_blank"
                      size="sm"
                    >
                      <Badge
                        leftSection={<IconExternalLink size={12} />}
                        variant="light"
                        style={{ cursor: 'pointer' }}
                      >
                        Google Maps
                      </Badge>
                    </Anchor>
                  )}
                  {housing.externalLinks.agencyWebsite && (
                    <Anchor
                      href={housing.externalLinks.agencyWebsite}
                      target="_blank"
                      size="sm"
                    >
                      <Badge
                        leftSection={<IconExternalLink size={12} />}
                        variant="light"
                        style={{ cursor: 'pointer' }}
                      >
                        Site agence
                      </Badge>
                    </Anchor>
                  )}
                  {housing.externalLinks.photosUrl && (
                    <Anchor
                      href={housing.externalLinks.photosUrl}
                      target="_blank"
                      size="sm"
                    >
                      <Badge
                        leftSection={<IconExternalLink size={12} />}
                        variant="light"
                        style={{ cursor: 'pointer' }}
                      >
                        Album photos
                      </Badge>
                    </Anchor>
                  )}
                </Group>
              </Stack>
            )}

            {/* Statistiques */}
            {housing.stats && (
              <Paper p="md" radius="md" style={{ background: '#f8f9fa' }}>
                <Group justify="space-around">
                  <Stack align="center" gap={4}>
                    <ThemeIcon size="lg" variant="light" color="gray">
                      <IconEye size={20} />
                    </ThemeIcon>
                    <Text size="xl" fw={700}>
                      {housing.stats.views}
                    </Text>
                    <Text size="xs" c="dimmed">
                      Vues
                    </Text>
                  </Stack>
                  <Stack align="center" gap={4}>
                    <ThemeIcon size="lg" variant="light" color="blue">
                      <IconUsers size={20} />
                    </ThemeIcon>
                    <Text size="xl" fw={700}>
                      {housing.stats.applications}
                    </Text>
                    <Text size="xs" c="dimmed">
                      Candidatures
                    </Text>
                  </Stack>
                  <Stack align="center" gap={4}>
                    <ThemeIcon size="lg" variant="light" color="green">
                      <IconCheck size={20} />
                    </ThemeIcon>
                    <Text size="xl" fw={700} c="green">
                      {housing.stats.matches}
                    </Text>
                    <Text size="xs" c="dimmed">
                      Matchs
                    </Text>
                  </Stack>
                </Group>
              </Paper>
            )}
          </Stack>
        </Paper>

        {/* ============ SECTION 2 : CRITÈRES ET EXIGENCES ============ */}
        <Paper p="lg" radius="md" withBorder style={{ background: '#fff3e0' }}>
          <Stack gap="md">
            <Group gap="xs">
              <ThemeIcon size="sm" radius="md" color="orange" variant="light">
                <IconShield size={16} />
              </ThemeIcon>
              <Title order={4}>Critères d'éligibilité du bailleur</Title>
            </Group>

            <Divider />

            <Accordion variant="contained" multiple defaultValue={['income', 'employment']}>
              {/* Critères de revenus */}
              <Accordion.Item value="income">
                <Accordion.Control
                  icon={
                    <ThemeIcon size="sm" color="green" variant="light">
                      <IconCurrencyEuro size={16} />
                    </ThemeIcon>
                  }
                >
                  <Text fw={600}>Critères de revenus</Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack gap="sm">
                    <Group justify="space-between">
                      <Text size="sm">Revenus mensuels minimum</Text>
                      <Badge size="lg" color="green" variant="light">
                        {housing.requirements.income.minimumMonthly}€
                      </Badge>
                    </Group>
                    <Group justify="space-between">
                      <Text size="sm">Multiplicateur du loyer</Text>
                      <Badge size="lg" color="blue" variant="light">
                        ×{housing.requirements.income.multiplier}
                      </Badge>
                    </Group>
                    <Group justify="space-between">
                      <Text size="sm">Revenus combinés acceptés</Text>
                      <Badge
                        color={
                          housing.requirements.income.combinedIncomeAccepted
                            ? 'green'
                            : 'red'
                        }
                        leftSection={
                          housing.requirements.income.combinedIncomeAccepted ? (
                            <IconCheck size={12} />
                          ) : (
                            <IconX size={12} />
                          )
                        }
                      >
                        {housing.requirements.income.combinedIncomeAccepted
                          ? 'Oui'
                          : 'Non'}
                      </Badge>
                    </Group>
                    <Divider />
                    <Text size="sm" fw={600} mt="xs">
                      Garant
                    </Text>
                    <Group justify="space-between">
                      <Text size="sm">Obligatoire</Text>
                      <Badge
                        size="lg"
                        color={
                          housing.requirements.income.guarantorRequired
                            ? 'orange'
                            : 'gray'
                        }
                        variant={
                          housing.requirements.income.guarantorRequired
                            ? 'filled'
                            : 'light'
                        }
                      >
                        {housing.requirements.income.guarantorRequired
                          ? 'OUI'
                          : 'Non'}
                      </Badge>
                    </Group>
                    {housing.requirements.income.guarantorRequired && (
                      <>
                        <Stack gap={4}>
                          <Text size="xs" c="dimmed" fw={500}>
                            Types de garants acceptés
                          </Text>
                          <Group gap="xs" wrap="wrap">
                            {housing.requirements.income.acceptedGuarantorTypes.map(
                              (type) => (
                                <Badge key={type} size="sm" variant="light">
                                  {guarantorTypeLabels[type]}
                                </Badge>
                              )
                            )}
                          </Group>
                        </Stack>
                        {housing.requirements.income.guarantorIncomeMultiplier && (
                          <Group justify="space-between">
                            <Text size="sm">
                              Revenus minimum du garant
                            </Text>
                            <Badge color="orange" variant="light">
                              {housing.requirements.income
                                .guarantorIncomeMultiplier}
                              × le loyer
                            </Badge>
                          </Group>
                        )}
                      </>
                    )}
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>

              {/* Critères d'emploi */}
              <Accordion.Item value="employment">
                <Accordion.Control
                  icon={
                    <ThemeIcon size="sm" color="blue" variant="light">
                      <IconBriefcase size={16} />
                    </ThemeIcon>
                  }
                >
                  <Text fw={600}>Critères d'emploi</Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack gap="sm">
                    <Stack gap={4}>
                      <Text size="sm" fw={500}>
                        Types d'emploi acceptés
                      </Text>
                      <Group gap="xs" wrap="wrap">
                        {housing.requirements.employment.acceptedTypes.map(
                          (type) => (
                            <Badge key={type} size="sm" color="blue" variant="light">
                              {employmentTypeLabels[type]}
                            </Badge>
                          )
                        )}
                      </Group>
                    </Stack>
                    <Group justify="space-between">
                      <Text size="sm">Ancienneté minimum requise</Text>
                      <Badge color="violet" variant="light">
                        {
                          seniorityLabels[
                            housing.requirements.employment.minimumSeniority
                          ]
                        }
                      </Badge>
                    </Group>
                    <Divider />
                    <Text size="xs" fw={600} c="dimmed">
                      Profils spécifiques acceptés
                    </Text>
                    <Group gap="md">
                      <Group gap={4}>
                        {housing.requirements.employment.acceptRetirement ? (
                          <IconCheck size={14} color="green" />
                        ) : (
                          <IconX size={14} color="red" />
                        )}
                        <Text size="sm">Retraités</Text>
                      </Group>
                      <Group gap={4}>
                        {housing.requirements.employment.acceptUnemployment ? (
                          <IconCheck size={14} color="green" />
                        ) : (
                          <IconX size={14} color="red" />
                        )}
                        <Text size="sm">Chômeurs</Text>
                      </Group>
                      <Group gap={4}>
                        {housing.requirements.employment.acceptRSA ? (
                          <IconCheck size={14} color="green" />
                        ) : (
                          <IconX size={14} color="red" />
                        )}
                        <Text size="sm">Bénéficiaires RSA</Text>
                      </Group>
                      <Group gap={4}>
                        {housing.requirements.employment.acceptSelfEmployed ? (
                          <IconCheck size={14} color="green" />
                        ) : (
                          <IconX size={14} color="red" />
                        )}
                        <Text size="sm">Auto-entrepreneurs</Text>
                      </Group>
                    </Group>
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>

              {/* Critères additionnels */}
              {housing.requirements.additional && (
                <Accordion.Item value="additional">
                  <Accordion.Control
                    icon={
                      <ThemeIcon size="sm" color="violet" variant="light">
                        <IconAlertCircle size={16} />
                      </ThemeIcon>
                    }
                  >
                    <Text fw={600}>Critères additionnels</Text>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Stack gap="sm">
                      {housing.requirements.additional.nonSmoker !== undefined && (
                        <Group justify="space-between">
                          <Text size="sm">Non-fumeur</Text>
                          <Badge
                            color={
                              housing.requirements.additional.nonSmoker
                                ? 'orange'
                                : 'gray'
                            }
                          >
                            {housing.requirements.additional.nonSmoker
                              ? 'Exigé'
                              : 'Pas de préférence'}
                          </Badge>
                        </Group>
                      )}
                      {housing.requirements.additional.petsAllowed !==
                        undefined && (
                        <Group justify="space-between">
                          <Text size="sm">Animaux</Text>
                          <Badge
                            color={
                              housing.requirements.additional.petsAllowed
                                ? 'green'
                                : 'red'
                            }
                            leftSection={
                              housing.requirements.additional.petsAllowed ? (
                                <IconCheck size={12} />
                              ) : (
                                <IconX size={12} />
                              )
                            }
                          >
                            {housing.requirements.additional.petsAllowed
                              ? 'Acceptés'
                              : 'Refusés'}
                          </Badge>
                        </Group>
                      )}
                      {housing.requirements.additional.colivingAccepted !==
                        undefined && (
                        <Group justify="space-between">
                          <Text size="sm">Colocation</Text>
                          <Badge
                            color={
                              housing.requirements.additional.colivingAccepted
                                ? 'green'
                                : 'red'
                            }
                          >
                            {housing.requirements.additional.colivingAccepted
                              ? 'Acceptée'
                              : 'Refusée'}
                          </Badge>
                        </Group>
                      )}
                      {housing.requirements.additional.maxOccupants && (
                        <Group justify="space-between">
                          <Text size="sm">Nombre maximum d'occupants</Text>
                          <Badge color="blue" variant="light">
                            {housing.requirements.additional.maxOccupants}{' '}
                            personne
                            {housing.requirements.additional.maxOccupants > 1
                              ? 's'
                              : ''}
                          </Badge>
                        </Group>
                      )}
                      {housing.requirements.additional.requireInsurance && (
                        <Group justify="space-between">
                          <Text size="sm">Assurance GLI</Text>
                          <Badge color="green">Requise</Badge>
                        </Group>
                      )}
                      {housing.requirements.additional.minimumCreditScore && (
                        <Group justify="space-between">
                          <Text size="sm">Score de crédit minimum</Text>
                          <Badge color="violet" variant="light">
                            {housing.requirements.additional.minimumCreditScore}
                            /1000
                          </Badge>
                        </Group>
                      )}
                    </Stack>
                  </Accordion.Panel>
                </Accordion.Item>
              )}
            </Accordion>

            {/* Alerte récapitulative */}
            <Paper p="md" radius="md" style={{ background: '#fff' }} withBorder>
              <Group gap="xs">
                <IconAlertCircle size={20} color="orange" />
                <Text size="sm" fw={500}>
                  Assurez-vous de remplir tous ces critères avant de postuler
                </Text>
              </Group>
            </Paper>
          </Stack>
        </Paper>

        {/* ============ SECTION 3 : MATCH CANDIDAT ============ */}
        {matchResult && candidate && (
          <Paper p="lg" radius="md" withBorder style={{ background: '#e7f5e7' }}>
            <Stack gap="md">
              <Group gap="xs">
                <ThemeIcon size="sm" radius="md" color="green" variant="light">
                  <IconChartBar size={16} />
                </ThemeIcon>
                <Title order={4}>Analyse de compatibilité</Title>
              </Group>

              <Divider />

              <MatchingResultCard
                matchResult={matchResult}
                housingTitle={housing.title}
              />
            </Stack>
          </Paper>
        )}

        {/* CTA en pied de modal */}
        <Group justify="flex-end" gap="md">
          <Button variant="subtle" onClick={onClose}>
            Fermer
          </Button>
          {onContactOwner && (
            <Button variant="light" onClick={onContactOwner}>
              Contacter le propriétaire
            </Button>
          )}
          {onApply && (
            <Button onClick={onApply}>
              Postuler à ce logement
            </Button>
          )}
        </Group>
      </Stack>
    </Modal>
  );
}
