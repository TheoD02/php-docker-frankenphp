import { Table, Badge, Progress, Group, Text, ThemeIcon } from '@mantine/core';
import { IconStar, IconTrendingUp, IconMinus, IconAlertTriangle, IconX } from '@tabler/icons-react';
import type { MatchResult } from '@/types/housing';

interface MatchingTableProps {
  matches: MatchResult[];
  candidateNames?: Record<string, string>;
  housingTitles?: Record<string, string>;
  onRowClick?: (match: MatchResult) => void;
}

const statusConfig = {
  excellent: { color: 'green', icon: IconStar },
  good: { color: 'blue', icon: IconTrendingUp },
  average: { color: 'yellow', icon: IconMinus },
  poor: { color: 'orange', icon: IconAlertTriangle },
  rejected: { color: 'red', icon: IconX },
};

export function MatchingTable({
  matches,
  candidateNames = {},
  housingTitles = {},
  onRowClick,
}: MatchingTableProps) {
  if (matches.length === 0) {
    return (
      <Text ta="center" c="dimmed" py="xl">
        Aucun matching trouvé
      </Text>
    );
  }

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Candidat</Table.Th>
            <Table.Th>Logement</Table.Th>
            <Table.Th>Score</Table.Th>
            <Table.Th>Statut</Table.Th>
            <Table.Th>Problèmes</Table.Th>
            <Table.Th>Date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {matches.map((match, index) => {
            const config = statusConfig[match.status];
            const StatusIcon = config.icon;
            const failedCriteria = match.details.filter(
              (c) => c.status === 'fail' && c.required
            );
            const warningCriteria = match.details.filter(
              (c) => c.status === 'warning'
            );

            return (
              <Table.Tr
                key={index}
                onClick={() => onRowClick?.(match)}
                style={{ cursor: onRowClick ? 'pointer' : 'default' }}
              >
                {/* Candidat */}
                <Table.Td>
                  <Text size="sm" fw={500}>
                    {candidateNames[match.candidateId] ||
                      `Candidat ${match.candidateId}`}
                  </Text>
                </Table.Td>

                {/* Logement */}
                <Table.Td>
                  <Text size="sm" lineClamp={1}>
                    {housingTitles[match.housingId] ||
                      `Logement ${match.housingId}`}
                  </Text>
                </Table.Td>

                {/* Score */}
                <Table.Td>
                  <div style={{ width: 150 }}>
                    <Group gap="xs" mb={4}>
                      <Text size="sm" fw={600} c={config.color}>
                        {match.overallScore}/100
                      </Text>
                    </Group>
                    <Progress
                      value={match.overallScore}
                      color={config.color}
                      size="sm"
                      radius="xl"
                    />
                  </div>
                </Table.Td>

                {/* Statut */}
                <Table.Td>
                  <Badge
                    color={config.color}
                    variant="light"
                    leftSection={
                      <ThemeIcon size={16} color={config.color} variant="transparent">
                        <StatusIcon size={12} />
                      </ThemeIcon>
                    }
                  >
                    {match.status}
                  </Badge>
                </Table.Td>

                {/* Problèmes */}
                <Table.Td>
                  <Group gap="xs">
                    {failedCriteria.length > 0 && (
                      <Badge color="red" size="sm" variant="filled">
                        {failedCriteria.length} ❌
                      </Badge>
                    )}
                    {warningCriteria.length > 0 && (
                      <Badge color="orange" size="sm" variant="filled">
                        {warningCriteria.length} ⚠️
                      </Badge>
                    )}
                    {failedCriteria.length === 0 &&
                      warningCriteria.length === 0 && (
                        <Badge color="green" size="sm" variant="light">
                          ✓ Aucun
                        </Badge>
                      )}
                  </Group>
                </Table.Td>

                {/* Date */}
                <Table.Td>
                  <Text size="xs" c="dimmed">
                    {new Date(match.matchedAt).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </Text>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
