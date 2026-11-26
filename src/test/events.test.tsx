import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Planner } from "@/components/planner/planner";

// The Events tab is a destination selector: each card shows only the name and
// date, and the five decisions appear once, under the selected destination.
describe("Events destinations", () => {
  function openEvents() {
    render(<Planner />);
    fireEvent.click(screen.getByRole("button", { name: "Events" }));
  }

  it("keeps the decisions off the destination cards", () => {
    openEvents();

    for (const name of ["New York City", "Miami", "Dubai", "Hong Kong"]) {
      const card = screen.getByRole("heading", { name }).closest("article") as HTMLElement;
      for (const label of ["Book", "Replenish", "Plan", "Delay", "Skip"])
        expect(within(card).queryByText(label)).not.toBeInTheDocument();
    }
  });

  it("shows the five decisions once, for the selected destination", () => {
    openEvents();

    const newYork = screen
      .getByRole("heading", { name: "Your New York City plan" })
      .closest("section") as HTMLElement;
    expect(within(newYork).getByText("Nails, Eyebrows")).toBeInTheDocument();
    expect(within(newYork).getByText("Hair, Haircare")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Select Miami" }));

    const miami = screen
      .getByRole("heading", { name: "Your Miami plan" })
      .closest("section") as HTMLElement;
    for (const label of ["Book", "Replenish", "Plan", "Delay", "Skip"])
      expect(within(miami).getByText(label)).toBeInTheDocument();
    expect(within(miami).getByText("Nails, Eyebrows, Hair")).toBeInTheDocument();
    expect(within(miami).getByText("Foundation · check supply first")).toBeInTheDocument();
  });

  it("opens the chosen destination's plan from its arrow", () => {
    openEvents();

    fireEvent.click(screen.getByRole("button", { name: "Select Miami" }));
    fireEvent.click(screen.getByRole("button", { name: "Open Miami plan" }));

    expect(screen.getByRole("heading", { name: /Miami/ })).toBeInTheDocument();
    expect(screen.getByLabelText("Select upcoming event")).toHaveValue("miami");
  });
});
