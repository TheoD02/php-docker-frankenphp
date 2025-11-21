import { createFileRoute } from '@tanstack/react-router';
import { Hero } from '@components/home/Hero';
import { Features } from '@components/home/Features';
import { HowItWorks } from '@components/home/HowItWorks';
import { CTA } from '@components/home/CTA';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
    </>
  );
}
