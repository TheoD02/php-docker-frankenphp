import {
  Card,
  Stack,
  Group,
  Text,
  Badge,
  ThemeIcon,
  Divider,
} from '@mantine/core';
import {
  IconCurrencyEuro,
  IconBriefcase,
  IconShield,
  IconUsers,
  IconPaw,
  IconSmoking,
  IconSmokingNo,
} from '@tabler/icons-react';
import type { CandidateProfile, EmploymentType } from '@/types/housing';

interface CandidateProfileCardProps {
  candidate: CandidateProfile;
  name?: string;
  compact?: boolean;
}

const employmentTypeLabels: Record<EmploymentType, string> = {
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

const employmentTypeColors: Record<EmploymentType, string> = {
  cdi: 'green',
  cdd: 'blue',
  interim: 'cyan',
  etudiant: 'violet',
  freelance: 'indigo',
  auto_entrepreneur: 'grape',
  retraite: 'teal',
  chomage: 'orange',
  rsa: 'red',
  profession_liberale: 'pink',
  fonctionnaire: 'green',
};

export function CandidateProfileCard({
  candidate,
  name,
  compact = false,
}: CandidateProfileCardProps) {
  const seniorityYears = Math.floor(candidate.employment.seniority / 12);
  const seniorityMonths = candidate.employment.seniority % 12;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        {/* En-tête */}
        {name && (
          <Group justify="space-between">
            <Text fw={600} size="lg">
              {name}
            </Text>
            <Badge
              size="lg"
              color={employmentTypeColors[candidate.employment.type]}
              variant="light"
            >
              {employmentTypeLabels[candidate.employment.type]}
            </Badge>
          </Group>
        )}

        {/* Revenus */}
        <Group gap="md" wrap="wrap">
          <Group gap="xs">
            <ThemeIcon size="lg" radius="md" color="green" variant="light">
              <IconCurrencyEuro size={20} />
            </ThemeIcon>
            <div>
              <Text size="xs" c="dimmed">
                Revenus mensuels
              </Text>
              <Text size="lg" fw={600}>
                {candidate.income.monthly}€
              </Text>
              <Text size="xs" c="dimmed">
                {candidate.income.type === 'net' ? 'net' : 'brut'}
              </Text>
            </div>
          </Group>

          {/* Garant */}
          {candidate.income.hasGuarantor && (
            <Group gap="xs">
              <ThemeIcon size="lg" radius="md" color="blue" variant="light">
                <IconShield size={20} />
              </ThemeIcon>
              <div>
                <Text size="xs" c="dimmed">
                  Garant
                </Text>
                <Text size="lg" fw={600}>
                  {candidate.income.guarantorIncome || 0}€
                </Text>
                <Text size="xs" c="green">
                  ✓ Présent
                </Text>
              </div>
            </Group>
          )}

          {!candidate.income.hasGuarantor && (
            <Group gap="xs">
              <ThemeIcon size="lg" radius="md" color="gray" variant="light">
                <IconShield size={20} />
              </ThemeIcon>
              <div>
                <Text size="xs" c="dimmed">
                  Garant
                </Text>
                <Text size="sm" c="red">
                  ✗ Absent
                </Text>
              </div>
            </Group>
          )}
        </Group>

        {!compact && <Divider />}

        {/* Emploi */}
        <Group gap="xs">
          <ThemeIcon size="lg" radius="md" color="violet" variant="light">
            <IconBriefcase size={20} />
          </ThemeIcon>
          <div style={{ flex: 1 }}>
            <Text size="xs" c="dimmed">
              Situation professionnelle
            </Text>
            <Text size="sm" fw={500}>
              {employmentTypeLabels[candidate.employment.type]}
            </Text>
            {candidate.employment.companyName && (
              <Text size="xs" c="dimmed">
                {candidate.employment.companyName}
              </Text>
            )}
            <Text size="xs" c="dimmed" mt={4}>
              Ancienneté :{' '}
              {seniorityYears > 0 && `${seniorityYears} an${seniorityYears > 1 ? 's' : ''}`}
              {seniorityYears > 0 && seniorityMonths > 0 && ' et '}
              {seniorityMonths > 0 && `${seniorityMonths} mois`}
              {seniorityYears === 0 && seniorityMonths === 0 && 'Moins d\'1 mois'}
            </Text>
          </div>
        </Group>

        {/* Informations additionnelles */}
        {!compact && candidate.additionalInfo && (
          <>
            <Divider />
            <Group gap="md" wrap="wrap">
              {/* Occupants */}
              {candidate.additionalInfo.occupants !== undefined && (
                <Group gap="xs">
                  <ThemeIcon size="sm" radius="md" color="gray" variant="light">
                    <IconUsers size={16} />
                  </ThemeIcon>
                  <Text size="sm">
                    {candidate.additionalInfo.occupants} occupant
                    {candidate.additionalInfo.occupants > 1 ? 's' : ''}
                  </Text>
                </Group>
              )}

              {/* Fumeur */}
              {candidate.additionalInfo.isSmoker !== undefined && (
                <Group gap="xs">
                  <ThemeIcon
                    size="sm"
                    radius="md"
                    color={candidate.additionalInfo.isSmoker ? 'orange' : 'green'}
                    variant="light"
                  >
                    {candidate.additionalInfo.isSmoker ? (
                      <IconSmoking size={16} />
                    ) : (
                      <IconSmokingNo size={16} />
                    )}
                  </ThemeIcon>
                  <Text size="sm">
                    {candidate.additionalInfo.isSmoker ? 'Fumeur' : 'Non-fumeur'}
                  </Text>
                </Group>
              )}

              {/* Animaux */}
              {candidate.additionalInfo.hasPets !== undefined && (
                <Group gap="xs">
                  <ThemeIcon
                    size="sm"
                    radius="md"
                    color={candidate.additionalInfo.hasPets ? 'blue' : 'gray'}
                    variant="light"
                  >
                    <IconPaw size={16} />
                  </ThemeIcon>
                  <Text size="sm">
                    {candidate.additionalInfo.hasPets ? 'Avec animaux' : 'Sans animaux'}
                  </Text>
                </Group>
              )}
            </Group>
          </>
        )}
      </Stack>
    </Card>
  );
}
