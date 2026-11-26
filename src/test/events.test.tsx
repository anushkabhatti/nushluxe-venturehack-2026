import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Planner } from "@/components/planner/planner";

// The Events tab shows one card per destination, each with the five decisions
// produced by the shared planner rules, and an arrow that opens that plan.
describe("Events destinations", () => {
  function openEvents() {
    render(<Planner />);
    fireEvent.click(screen.getByRole("button", { name: "Events" }));
  }

  it("lists the five decisions on every destination card", () => {
    openEvents();

    for (const name of ["New York City", "Miami", "Dubai", "Hong Kong"]) {
      const card = screen.getByRole("heading", { name }).closest("article") as HTMLElement;
      for (const label of ["Book", "Replenish", "Plan", "Delay", "Skip"])
        expect(within(card).getByText(label)).toBeInTheDocument();
    }
    const miami = screen.getByRole("heading", { name: "Miami" }).closest("article") as HTMLElement;
    expect(within(miami).getByText("Nails, Eyebrows, Hair")).toBeInTheDocument();
    expect(within(miami).getByText("Foundation · check supply first")).toBeInTheDocument();
  });

  it("opens the chosen destination's plan from its arrow", () => {
    openEvents();

    fireEvent.click(screen.getByRole("button", { name: "Open Miami plan" }));

    expect(screen.getByRole("heading", { name: /Miami/ })).toBeInTheDocument();
    expect(screen.getByLabelText("Select upcoming event")).toHaveValue("miami");
  });
});
