import { createFileRoute } from '@tanstack/react-router';
import { Planner } from '@/components/planner/planner';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Nushluxe — Your Beauty, Planned Around Your Life' },
    { name: 'description', content: 'Explore Nushluxe, a fresh Babson Miami VentureHack prototype for recurring beauty and wellness routines, product replenishment, life events, and one thoughtful plan.' },
    { property: 'og:title', content: 'Nushluxe — Your Beauty, Planned Around Your Life' },
    { property: 'og:description', content: 'A personal beauty forecast for what to book, check, spend on, or skip before your next trip. An interactive VentureHack prototype.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Planner,
});
