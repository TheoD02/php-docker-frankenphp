import {
  Card,
  Stack,
  Group,
  Text,
  Badge,
  Progress,
  Accordion,
  ThemeIcon,
  List,
} from '@mantine/core';
import {
  IconCheck,
  IconAlertTriangle,
  IconX,
  IconStar,
  IconTrendingUp,
  IconMinus,
} from '@tabler/icons-react';
import type { MatchResult } from '@/types/housing';

interface MatchingResultCardProps {
  matchResult: MatchResult;
  candidateName?: string;
  housingTitle?: string;
  compact?: boolean;
}

const statusConfig = {
  excellent: {
    color: 'green',
    label: 'Excellent match',
    icon: IconStar,
    bgColor: '#e7f5e7',
  },
  good: {
    color: 'blue',
    label: 'Bon match',
    icon: IconTrendingUp,
    bgColor: '#e3f2fd',
  },
  average: {
    color: 'yellow',
    label: 'Match moyen',
    icon: IconMinus,
    bgColor: '#fff9e6',
  },
  poor: {
    color: 'orange',
    label: 'Match faible',
    icon: IconAlertTriangle,
    bgColor: '#fff3e0',
  },
  rejected: {
    color: 'red',
    label: 'Non compatible',
    icon: IconX,
    bgColor: '#ffebee',
  },
};

const criterionIcons = {
  pass: { icon: IconCheck, color: 'green' },
  warning: { icon: IconAlertTriangle, color: 'orange' },
  fail: { icon: IconX, color: 'red' },
};

const categoryLabels = {
  income: 'Revenus',
  employment: 'Emploi',
  guarantor: 'Garant',
  additional: 'Critères additionnels',
};

export function MatchingResultCard({
  matchResult,
  candidateName,
  housingTitle,
  compact = false,
}: MatchingResultCardProps) {
  const config = statusConfig[matchResult.status];
  const StatusIcon = config.icon;

  // Grouper les critères par catégorie
  const groupedCriteria = matchResult.details.reduce(
    (acc, criterion) => {
      if (!acc[criterion.category]) {
        acc[criterion.category] = [];
      }
      acc[criterion.category]?.push(criterion);
      return acc;
    },
    {} as Record<string, typeof matchResult.details>
  );

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ backgroundColor: config.bgColor }}
    >
      <Stack gap="md">
        {/* En-tête */}
        <Group justify="space-between" align="flex-start">
          <Stack gap="xs" style={{ flex: 1 }}>
            {candidateName && (
              <Text fw={600} size="lg">
                {candidateName}
              </Text>
            )}
            {housingTitle && (
              <Text size="sm" c="dimmed">
                {housingTitle}
              </Text>
            )}
          </Stack>
          <ThemeIcon size={50} radius="md" color={config.color} variant="light">
            <StatusIcon size={28} />
          </ThemeIcon>
        </Group>

        {/* Score global */}
        <div>
          <Group justify="space-between" mb="xs">
            <Badge size="lg" color={config.color} variant="filled">
              {config.label}
            </Badge>
            <Text size="xl" fw={700} c={config.color}>
              {matchResult.overallScore}/100
            </Text>
          </Group>
          <Progress
            value={matchResult.overallScore}
            color={config.color}
            size="xl"
            radius="md"
            animated
          />
        </div>

        {/* Détails des critères */}
        {!compact && (
          <Accordion variant="contained" radius="md">
            {Object.entries(groupedCriteria).map(([category, criteria]) => {
              const failedCount = criteria.filter((c) => c.status === 'fail')
                .length;
              const warningCount = criteria.filter((c) => c.status === 'warning')
                .length;

              return (
                <Accordion.Item key={category} value={category}>
                  <Accordion.Control>
                    <Group justify="space-between">
                      <Text fw={600}>
                        {categoryLabels[category as keyof typeof categoryLabels] || category}
                      </Text>
                      <Group gap="xs">
                        {failedCount > 0 && (
                          <Badge size="sm" color="red" variant="filled">
                            {failedCount} ❌
                          </Badge>
                        )}
                        {warningCount > 0 && (
                          <Badge size="sm" color="orange" variant="filled">
                            {warningCount} ⚠️
                          </Badge>
                        )}
                      </Group>
                    </Group>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <List spacing="sm" size="sm">
                      {criteria.map((criterion, index) => {
                        const Icon = criterionIcons[criterion.status].icon;
                        const color = criterionIcons[criterion.status].color;

                        return (
                          <List.Item
                            key={index}
                            icon={
                              <ThemeIcon
                                size={20}
                                radius="xl"
                                color={color}
                                variant="light"
                              >
                                <Icon size={12} />
                              </ThemeIcon>
                            }
                          >
                            <Stack gap={4}>
                              <Group gap="xs">
                                <Text fw={500} size="sm">
                                  {criterion.criterion}
                                </Text>
                                {criterion.required && (
                                  <Badge size="xs" color="red" variant="outline">
                                    Obligatoire
                                  </Badge>
                                )}
                              </Group>
                              <Text size="xs" c="dimmed">
                                {criterion.message}
                              </Text>
                            </Stack>
                          </List.Item>
                        );
                      })}
                    </List>
                  </Accordion.Panel>
                </Accordion.Item>
              );
            })}
          </Accordion>
        )}

        {/* Version compacte */}
        {compact && (
          <Group gap="xs" wrap="wrap">
            {matchResult.details
              .filter((c) => c.status !== 'pass')
              .map((criterion, index) => {
                const Icon = criterionIcons[criterion.status].icon;
                const color = criterionIcons[criterion.status].color;

                return (
                  <Badge
                    key={index}
                    leftSection={<Icon size={12} />}
                    color={color}
                    variant="light"
                    size="sm"
                  >
                    {criterion.criterion}
                  </Badge>
                );
              })}
          </Group>
        )}

        {/* Date du matching */}
        <Text size="xs" c="dimmed" ta="right">
          Analysé le{' '}
          {new Date(matchResult.matchedAt).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </Stack>
    </Card>
  );
}
