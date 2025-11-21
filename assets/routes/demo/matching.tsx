import { createFileRoute } from '@tanstack/react-router';
import {
  Container,
  Title,
  Text,
  Stack,
  SimpleGrid,
  Badge,
  Select,
  Group,
  Tabs,
  Modal,
} from '@mantine/core';
import { useState } from 'react';
import { IconUsers, IconHome, IconChartBar } from '@tabler/icons-react';
import { MatchingResultCard } from '@components/matching/MatchingResultCard';
import { MatchingTable } from '@components/matching/MatchingTable';
import { CandidateProfileCard } from '@components/matching/CandidateProfileCard';
import { HousingCard } from '@components/housing/HousingCard';
import {
  mockHousings,
  mockCandidateProfiles,
} from '@/data/housing';
import {
  matchCandidateToHousing,
  getCandidateMatchings,
  getHousingMatches,
} from '@/utils/matching';
import type { MatchResult } from '@/types/housing';

export const Route = createFileRoute('/demo/matching')({
  component: MatchingDemo,
});

function MatchingDemo() {
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>(
    mockCandidateProfiles[0]?.id || ''
  );
  const [selectedHousingId, setSelectedHousingId] = useState<string>(
    mockHousings[0]?.id || ''
  );
  const [modalMatch, setModalMatch] = useState<MatchResult | null>(null);

  const selectedCandidate = mockCandidateProfiles.find(
    (c) => c.id === selectedCandidateId
  );
  const selectedHousing = mockHousings.find((h) => h.id === selectedHousingId);

  // Match individuel candidat ↔ logement
  const individualMatch =
    selectedCandidate && selectedHousing
      ? matchCandidateToHousing(selectedCandidate, selectedHousing)
      : null;

  // Fallback si pas de sélection
  if (!selectedCandidate || !selectedHousing) {
    return <div>Loading...</div>;
  }

  // Tous les matchs du candidat sélectionné
  const candidateMatchings = selectedCandidate
    ? getCandidateMatchings(selectedCandidate, mockHousings)
    : [];

  // Tous les matchs du logement sélectionné
  const housingMatches = selectedHousing
    ? getHousingMatches(selectedHousing, mockCandidateProfiles)
    : [];

  // Stats globales
  const allMatches = mockCandidateProfiles.flatMap((candidate) =>
    mockHousings.map((housing) => matchCandidateToHousing(candidate, housing))
  );
  const excellentMatches = allMatches.filter((m) => m.status === 'excellent')
    .length;
  const goodMatches = allMatches.filter((m) => m.status === 'good').length;
  const averageScore =
    allMatches.reduce((sum, m) => sum + m.overallScore, 0) / allMatches.length;

  // Noms pour l'affichage
  const candidateNames: Record<string, string> = {
    'candidate-1': 'Jean Dupont (CDI)',
    'candidate-2': 'Marie Martin (Étudiante)',
    'candidate-3': 'Pierre Durand (Freelance)',
    'candidate-4': 'Sophie Bernard (CDI Senior)',
  };

  const housingTitles = mockHousings.reduce(
    (acc, h) => {
      acc[h.id] = h.title;
      return acc;
    },
    {} as Record<string, string>
  );

  return (
    <Container size="xl" py={80}>
      <Stack gap="xl">
        {/* En-tête */}
        <div>
          <Badge size="lg" variant="light" color="green" mb="md">
            Démo - Matching Automatique
          </Badge>
          <Title order={1} mb="md">
            Système de matching intelligent
          </Title>
          <Text size="lg" c="dimmed" maw={800}>
            Notre algorithme analyse automatiquement la compatibilité entre les
            profils candidats et les exigences des logements. Score sur 100,
            détails par critère, et recommandations instantanées.
          </Text>
        </div>

        {/* Statistiques globales */}
        <SimpleGrid cols={{ base: 1, sm: 4 }} spacing="lg">
          <Stack
            gap={4}
            p="md"
            style={{ background: '#f8f9fa', borderRadius: 8 }}
          >
            <Text size="2rem" fw={700} c="blue">
              {allMatches.length}
            </Text>
            <Text size="sm" c="dimmed">
              Matchs analysés
            </Text>
          </Stack>
          <Stack
            gap={4}
            p="md"
            style={{ background: '#f8f9fa', borderRadius: 8 }}
          >
            <Text size="2rem" fw={700} c="green">
              {excellentMatches}
            </Text>
            <Text size="sm" c="dimmed">
              Matchs excellents
            </Text>
          </Stack>
          <Stack
            gap={4}
            p="md"
            style={{ background: '#f8f9fa', borderRadius: 8 }}
          >
            <Text size="2rem" fw={700} c="blue">
              {goodMatches}
            </Text>
            <Text size="sm" c="dimmed">
              Bons matchs
            </Text>
          </Stack>
          <Stack
            gap={4}
            p="md"
            style={{ background: '#f8f9fa', borderRadius: 8 }}
          >
            <Text size="2rem" fw={700} c="violet">
              {Math.round(averageScore)}
            </Text>
            <Text size="sm" c="dimmed">
              Score moyen
            </Text>
          </Stack>
        </SimpleGrid>

        {/* Tabs */}
        <Tabs defaultValue="individual" variant="pills">
          <Tabs.List>
            <Tabs.Tab value="individual" leftSection={<IconChartBar size={16} />}>
              Match individuel
            </Tabs.Tab>
            <Tabs.Tab value="candidate" leftSection={<IconUsers size={16} />}>
              Vue candidat
            </Tabs.Tab>
            <Tabs.Tab value="housing" leftSection={<IconHome size={16} />}>
              Vue logement
            </Tabs.Tab>
          </Tabs.List>

          {/* Tab 1: Match individuel */}
          <Tabs.Panel value="individual" pt="xl">
            <Stack gap="lg">
              <Text size="lg" fw={500}>
                Comparez un candidat avec un logement spécifique
              </Text>

              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                <div>
                  <Select
                    label="Sélectionner un candidat"
                    data={mockCandidateProfiles.map((c) => ({
                      value: c.id,
                      label: candidateNames[c.id] || c.id,
                    }))}
                    value={selectedCandidateId}
                    onChange={(value) =>
                      value && setSelectedCandidateId(value)
                    }
                    mb="md"
                  />
                  {selectedCandidate && (
                    <CandidateProfileCard
                      candidate={selectedCandidate}
                      name={candidateNames[selectedCandidate.id]}
                    />
                  )}
                </div>

                <div>
                  <Select
                    label="Sélectionner un logement"
                    data={mockHousings.map((h) => ({
                      value: h.id,
                      label: h.title,
                    }))}
                    value={selectedHousingId}
                    onChange={(value) => value && setSelectedHousingId(value)}
                    mb="md"
                  />
                  {selectedHousing && (
                    <HousingCard
                      housing={selectedHousing}
                      showStats={false}
                    />
                  )}
                </div>
              </SimpleGrid>

              {individualMatch && (
                <MatchingResultCard
                  matchResult={individualMatch}
                  candidateName={candidateNames[selectedCandidateId]}
                  housingTitle={selectedHousing?.title}
                />
              )}
            </Stack>
          </Tabs.Panel>

          {/* Tab 2: Vue candidat */}
          <Tabs.Panel value="candidate" pt="xl">
            <Stack gap="lg">
              <Group justify="space-between">
                <Text size="lg" fw={500}>
                  Tous les logements compatibles pour ce candidat
                </Text>
                <Select
                  placeholder="Sélectionner un candidat"
                  data={mockCandidateProfiles.map((c) => ({
                    value: c.id,
                    label: candidateNames[c.id] || c.id,
                  }))}
                  value={selectedCandidateId}
                  onChange={(value) => value && setSelectedCandidateId(value)}
                  w={300}
                />
              </Group>

              {selectedCandidate && (
                <CandidateProfileCard
                  candidate={selectedCandidate}
                  name={candidateNames[selectedCandidate.id]}
                  compact
                />
              )}

              <MatchingTable
                matches={candidateMatchings}
                candidateNames={candidateNames}
                housingTitles={housingTitles}
                onRowClick={(match) => setModalMatch(match)}
              />
            </Stack>
          </Tabs.Panel>

          {/* Tab 3: Vue logement */}
          <Tabs.Panel value="housing" pt="xl">
            <Stack gap="lg">
              <Group justify="space-between">
                <Text size="lg" fw={500}>
                  Tous les candidats compatibles pour ce logement
                </Text>
                <Select
                  placeholder="Sélectionner un logement"
                  data={mockHousings.map((h) => ({
                    value: h.id,
                    label: h.title,
                  }))}
                  value={selectedHousingId}
                  onChange={(value) => value && setSelectedHousingId(value)}
                  w={400}
                />
              </Group>

              {selectedHousing && (
                <HousingCard housing={selectedHousing} showStats />
              )}

              <MatchingTable
                matches={housingMatches}
                candidateNames={candidateNames}
                housingTitles={housingTitles}
                onRowClick={(match) => setModalMatch(match)}
              />
            </Stack>
          </Tabs.Panel>
        </Tabs>

        {/* Note explicative */}
        <Stack
          gap="sm"
          p="xl"
          style={{ background: '#e7f5e7', borderRadius: 8 }}
        >
          <Title order={4}>💡 Comment fonctionne le matching ?</Title>
          <Text size="sm">
            L'algorithme analyse 4 catégories de critères avec une pondération
            intelligente :
          </Text>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>
              <Text size="sm">
                <strong>Revenus (40%)</strong> : Vérifie si les revenus du
                candidat sont ≥ 3x le loyer
              </Text>
            </li>
            <li>
              <Text size="sm">
                <strong>Emploi (30%)</strong> : Type de contrat et ancienneté
              </Text>
            </li>
            <li>
              <Text size="sm">
                <strong>Garant (20%)</strong> : Présence et revenus du garant
              </Text>
            </li>
            <li>
              <Text size="sm">
                <strong>Critères additionnels (10%)</strong> : Fumeur, animaux,
                occupants
              </Text>
            </li>
          </ul>
          <Text size="sm" mt="xs">
            Le score final sur 100 détermine le statut : excellent (≥85), good
            (70-84), average (50-69), poor (30-49), ou rejected (&lt;30).
          </Text>
        </Stack>
      </Stack>

      {/* Modal pour les détails */}
      <Modal
        opened={modalMatch !== null}
        onClose={() => setModalMatch(null)}
        size="xl"
        title="Détails du matching"
      >
        {modalMatch && (
          <MatchingResultCard
            matchResult={modalMatch}
            candidateName={candidateNames[modalMatch.candidateId]}
            housingTitle={housingTitles[modalMatch.housingId]}
          />
        )}
      </Modal>
    </Container>
  );
}
