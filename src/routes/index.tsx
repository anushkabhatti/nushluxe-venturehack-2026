import { createFileRoute } from '@tanstack/react-router';
import { Planner } from '@/components/planner/planner';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Nushluxe — Your Personal Maintenance Plan' },
    { name: 'description', content: 'Explore Nushluxe, a fresh Babson Miami VentureHack prototype for recurring beauty and wellness routines, product replenishment, life events, and one thoughtful plan.' },
    { property: 'og:title', content: 'Nushluxe — Your Personal Maintenance Plan' },
    { property: 'og:description', content: 'Your beauty and wellness life, organized around what comes next. An interactive VentureHack concept, shaped by customer discovery.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Planner,
});
