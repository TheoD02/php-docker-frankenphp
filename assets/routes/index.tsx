import { createFileRoute } from '@tanstack/react-router';
import { Container, Title } from '@mantine/core';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <Container py="xl">
      <Title order={1}>Home</Title>
    </Container>
  );
}
