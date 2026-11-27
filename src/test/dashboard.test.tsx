import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Planner } from "@/components/planner/planner";

// The dashboard answers three questions at a glance: what needs attention,
// what can wait, and what it will cost. Each fact appears once.
describe("Dashboard presentation", () => {
  it("opens with Your Plan and the selected trip", () => {
    render(<Planner />);

    expect(screen.getByRole("heading", { name: "Your Plan" })).toBeInTheDocument();
    expect(screen.getByText("New York City · 7 days away")).toBeInTheDocument();
  });

  it("groups each item under its decision with a short reason", () => {
    render(<Planner />);

    const group = (name: string) =>
      screen.getByRole("heading", { name }).closest(".plan-summary-group") as HTMLElement;
    const lines = (name: string) =>
      within(group(name))
        .getAllByRole("listitem")
        .map((item) => item.textContent);

    expect(lines("Book")).toEqual(["Nails — due now", "Eyebrows — before your trip"]);
    expect(lines("Replenish")).toEqual(["Foundation — check supply first"]);
    expect(lines("Skip")).toEqual([
      "Hair — not needed for this trip",
      "Haircare — not needed for this trip",
    ]);
    expect(screen.queryByRole("heading", { name: "Delay" })).not.toBeInTheDocument();
  });

  it("shows one spending summary: $95 expected, +$48 possible, $90 avoided", () => {
    render(<Planner />);

    const spend = screen.getByRole("region", { name: "Spending" });
    const value = (label: string) =>
      (within(spend).getByText(label).nextElementSibling as HTMLElement).textContent;

    expect(value("Expected spend")).toBe("$95");
    expect(value("Possible additional")).toBe("+$48if foundation is needed");
    expect(value("Potential avoided spend")).toBe("$90");
  });

  it("sums the plan up in one Nushluxe Recommendation sentence", () => {
    render(<Planner />);

    const card = screen.getByRole("region", { name: "Nushluxe Recommendation" });

    expect(
      within(card).getByRole("heading", { name: "Nushluxe Recommendation" }),
    ).toBeInTheDocument();
    expect(card.querySelector("p")?.textContent).toBe(
      "Book nails and eyebrows before New York City, check foundation before buying more, and skip hair for this trip.",
    );
  });

  it("sends the Pre-Trip Plan arrow to the Plan tab", () => {
    render(<Planner />);

    fireEvent.click(screen.getByRole("button", { name: "Open your plan" }));

    expect(screen.getByText("A little preparation. A lot more ease.")).toBeInTheDocument();
  });

  it("sends the beauty bag arrow to the Products tab", () => {
    render(<Planner />);

    fireEvent.click(screen.getByRole("button", { name: "Manage products" }));

    expect(screen.getByRole("heading", { name: "Your Products" })).toBeInTheDocument();
  });
});
