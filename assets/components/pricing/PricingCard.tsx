import { Paper, Stack, Text, Button, List, Badge, Group } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import type { PricingPlan } from '@/data/pricing';

interface PricingCardProps {
  plan: PricingPlan;
}

export function PricingCard({ plan }: PricingCardProps) {
  const isStringPrice = typeof plan.price === 'string';

  return (
    <Paper
      shadow={plan.highlighted ? 'xl' : 'sm'}
      p="xl"
      radius="lg"
      style={{
        border: plan.highlighted ? '2px solid #1976d2' : '1px solid #e9ecef',
        position: 'relative',
        transition: 'transform 0.2s, box-shadow 0.2s',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {(plan.highlighted || plan.badge) && (
        <Badge
          size="lg"
          variant="filled"
          color={plan.highlighted ? 'blue' : 'green'}
          style={{
            position: 'absolute',
            top: -12,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {plan.badge || 'Le plus populaire'}
        </Badge>
      )}

      <Stack gap="md" style={{ flex: 1 }}>
        <div>
          <Text fw={600} size="xl">
            {plan.name}
          </Text>
          <Text size="sm" c="dimmed" mt={4}>
            {plan.description}
          </Text>
        </div>

        <Group align="baseline" gap={4} mt="md">
          {isStringPrice ? (
            <Text size="2rem" fw={700} lh={1}>
              {plan.price}
            </Text>
          ) : (
            <>
              <Text size="3rem" fw={700} lh={1}>
                {plan.price}€
              </Text>
              {plan.period && (
                <Text size="lg" c="dimmed">
                  / {plan.period}
                </Text>
              )}
            </>
          )}
        </Group>

        <Button
          size="lg"
          variant={plan.highlighted ? 'filled' : 'outline'}
          fullWidth
          mt="md"
        >
          {plan.cta}
        </Button>

        <List
          spacing="sm"
          size="sm"
          mt="xl"
          icon={
            <IconCheck
              size={20}
              color="#1976d2"
              style={{ strokeWidth: 2.5 }}
            />
          }
          styles={{
            itemIcon: {
              marginTop: 2,
            },
          }}
        >
          {plan.features.map((feature, index) => (
            <List.Item key={index}>{feature}</List.Item>
          ))}
        </List>
      </Stack>
    </Paper>
  );
}
