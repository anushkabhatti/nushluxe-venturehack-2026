import newYork from "@/assets/new-york.jpg";
import miami from "@/assets/miami.jpg";
import dubai from "@/assets/dubai.jpg";
import hongKong from "@/assets/hong-kong.jpg";

// Presentation only: destination imagery and travel context never feed the planner rules.
const destinations = [
  {
    match: "new york",
    source: newYork,
    alt: "The New York City skyline in bright, pale monochrome light",
    note: "NEW YORK, NEW YORK",
    context: "City break",
  },
  {
    match: "miami",
    source: miami,
    alt: "The Miami skyline and palms across calm water in pale monochrome light",
    note: "MIAMI, FLORIDA",
    context: "Coast and sun",
  },
  {
    match: "dubai",
    source: dubai,
    alt: "The Dubai skyline rising above pale haze in monochrome light",
    note: "DUBAI, UAE",
    context: "Long-haul · Desert city",
  },
  {
    match: "hong kong",
    source: hongKong,
    alt: "The Hong Kong skyline across the harbour in pale monochrome light",
    note: "HONG KONG",
    context: "Long-haul · Harbour city",
  },
];

export function destinationVisual(name: string | undefined) {
  const lower = name?.toLowerCase() ?? "";
  return destinations.find((d) => lower.includes(d.match));
}
