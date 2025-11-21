import { createFileRoute } from '@tanstack/react-router';
import {
  Container,
  Title,
  Text,
  Stack,
  SimpleGrid,
  Badge,
  Group,
  Select,
  TextInput,
  Button,
} from '@mantine/core';
import { useState } from 'react';
import { IconSearch, IconFilter, IconHome } from '@tabler/icons-react';
import { HousingCard } from '@components/housing/HousingCard';
import { HousingDetailModal } from '@components/housing/HousingDetailModal';
import { mockHousings } from '@/data/housing';
import type { PropertyType, HousingStatus, Housing } from '@/types/housing';

export const Route = createFileRoute('/demo/housings')({
  component: HousingsDemo,
});

function HousingsDemo() {
  const [statusFilter, setStatusFilter] = useState<HousingStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<PropertyType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHousing, setSelectedHousing] = useState<Housing | null>(null);
  const [modalOpened, setModalOpened] = useState(false);

  // Filtrage des logements
  const filteredHousings = mockHousings.filter((housing) => {
    const matchesStatus =
      statusFilter === 'all' || housing.status === statusFilter;
    const matchesType = typeFilter === 'all' || housing.propertyType === typeFilter;
    const matchesSearch =
      searchQuery === '' ||
      housing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      housing.address.city.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesType && matchesSearch;
  });

  return (
    <Container size="xl" py={80}>
      <Stack gap="xl">
        {/* En-tête */}
        <div>
          <Badge size="lg" variant="light" color="blue" mb="md">
            Démo - Fonctionnalité
          </Badge>
          <Title order={1} mb="md">
            Gestion des logements
          </Title>
          <Text size="lg" c="dimmed" maw={800}>
            Visualisez et gérez tous vos logements au même endroit. Chaque
            logement contient des informations détaillées, des liens externes et
            des statistiques de performance.
          </Text>
        </div>

        {/* Statistiques globales */}
        <SimpleGrid cols={{ base: 1, sm: 4 }} spacing="lg">
          <Stack gap={4} p="md" style={{ background: '#f8f9fa', borderRadius: 8 }}>
            <Text size="2rem" fw={700} c="blue">
              {mockHousings.length}
            </Text>
            <Text size="sm" c="dimmed">
              Logements totaux
            </Text>
          </Stack>
          <Stack gap={4} p="md" style={{ background: '#f8f9fa', borderRadius: 8 }}>
            <Text size="2rem" fw={700} c="green">
              {mockHousings.filter((h) => h.status === 'active').length}
            </Text>
            <Text size="sm" c="dimmed">
              Actifs
            </Text>
          </Stack>
          <Stack gap={4} p="md" style={{ background: '#f8f9fa', borderRadius: 8 }}>
            <Text size="2rem" fw={700} c="blue">
              {mockHousings
                .reduce((sum, h) => sum + (h.stats?.applications || 0), 0)}
            </Text>
            <Text size="sm" c="dimmed">
              Candidatures totales
            </Text>
          </Stack>
          <Stack gap={4} p="md" style={{ background: '#f8f9fa', borderRadius: 8 }}>
            <Text size="2rem" fw={700} c="green">
              {mockHousings.reduce((sum, h) => sum + (h.stats?.matches || 0), 0)}
            </Text>
            <Text size="sm" c="dimmed">
              Matchs réussis
            </Text>
          </Stack>
        </SimpleGrid>

        {/* Filtres */}
        <Group gap="md" align="flex-end">
          <TextInput
            placeholder="Rechercher par ville ou titre..."
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1 }}
          />
          <Select
            placeholder="Statut"
            leftSection={<IconFilter size={16} />}
            data={[
              { value: 'all', label: 'Tous les statuts' },
              { value: 'active', label: 'Actif' },
              { value: 'draft', label: 'Brouillon' },
              { value: 'rented', label: 'Loué' },
              { value: 'archived', label: 'Archivé' },
            ]}
            value={statusFilter}
            onChange={(value) =>
              setStatusFilter((value as HousingStatus) || 'all')
            }
            w={200}
          />
          <Select
            placeholder="Type"
            leftSection={<IconHome size={16} />}
            data={[
              { value: 'all', label: 'Tous les types' },
              { value: 'studio', label: 'Studio' },
              { value: 't1', label: 'T1' },
              { value: 't2', label: 'T2' },
              { value: 't3', label: 'T3' },
              { value: 't4', label: 'T4' },
              { value: 'maison', label: 'Maison' },
              { value: 'colocation', label: 'Colocation' },
            ]}
            value={typeFilter}
            onChange={(value) => setTypeFilter((value as PropertyType) || 'all')}
            w={200}
          />
          <Button variant="light">Ajouter un logement</Button>
        </Group>

        {/* Résultats */}
        <div>
          <Text size="sm" c="dimmed" mb="md">
            {filteredHousings.length} logement
            {filteredHousings.length > 1 ? 's' : ''} trouvé
            {filteredHousings.length > 1 ? 's' : ''}
          </Text>

          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
            {filteredHousings.map((housing) => (
              <HousingCard
                key={housing.id}
                housing={housing}
                onViewDetails={() => {
                  setSelectedHousing(housing);
                  setModalOpened(true);
                }}
                showStats
              />
            ))}
          </SimpleGrid>

          {filteredHousings.length === 0 && (
            <Text ta="center" c="dimmed" py="xl">
              Aucun logement ne correspond à vos critères
            </Text>
          )}
        </div>

        {/* Note explicative */}
        <Stack gap="sm" p="xl" style={{ background: '#e3f2fd', borderRadius: 8 }}>
          <Title order={4}>💡 À propos de cette page de démo</Title>
          <Text size="sm">
            Cette page démontre la fonctionnalité de <strong>gestion de logements</strong>.
            Les propriétaires et agences peuvent :
          </Text>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>
              <Text size="sm">
                Ajouter des logements avec toutes les informations (loyer, surface,
                adresse, photos)
              </Text>
            </li>
            <li>
              <Text size="sm">
                Définir des critères d'éligibilité (revenus, type d'emploi, garant)
              </Text>
            </li>
            <li>
              <Text size="sm">
                Ajouter des liens externes (Leboncoin, SeLoger, Google Maps, photos)
              </Text>
            </li>
            <li>
              <Text size="sm">
                Suivre les statistiques (vues, candidatures, matchs)
              </Text>
            </li>
          </ul>
        </Stack>
      </Stack>

      {/* Modal de détails */}
      {selectedHousing && (
        <HousingDetailModal
          opened={modalOpened}
          onClose={() => {
            setModalOpened(false);
            setSelectedHousing(null);
          }}
          housing={selectedHousing}
          onApply={() => {
            alert(`Candidature envoyée pour: ${selectedHousing.title}`);
            setModalOpened(false);
          }}
          onContactOwner={() => {
            alert(`Contacter le propriétaire de: ${selectedHousing.title}`);
          }}
        />
      )}
    </Container>
  );
}
