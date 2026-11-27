import { createFileRoute } from "@tanstack/react-router";
import { Planner } from "@/components/planner/planner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nushluxe — Your Beauty, Planned Around Your Life" },
      {
        name: "description",
        content:
          "Know what you need, before you need it. Nushluxe brings recurring beauty and wellness routines, product replenishment, and life events into one thoughtful plan.",
      },
      { property: "og:title", content: "Nushluxe — Your Beauty, Planned Around Your Life" },
      {
        property: "og:description",
        content:
          "A personal beauty forecast for what to book, check, spend on, or skip before your next trip.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Planner,
});
