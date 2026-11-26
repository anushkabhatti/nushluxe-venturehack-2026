import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Planner } from "@/components/planner/planner";

// The dashboard is the judge's first screen: the greeting names the example,
// the avoided cost is itemised under planned spend, and the two section arrows
// lead to the Plan and Products tabs.
describe("Dashboard presentation", () => {
  it("opens with the example-plan greeting and no plane button", () => {
    const { container } = render(<Planner />);

    expect(
      screen.getByRole("heading", { name: "Example plan: Anushka's NYC trip" }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Good morning/)).not.toBeInTheDocument();
    expect(container.querySelector(".travel-icon")).toBeNull();
  });

  it("shows each skipped routine as an avoided line under Estimated Upcoming Spend", () => {
    render(<Planner />);

    const spend = screen
      .getByRole("heading", { name: "Estimated Upcoming Spend" })
      .closest("section") as HTMLElement;
    const hair = within(spend).getByText("Hair").closest(".trip-cost") as HTMLElement;

    expect(within(hair).getByText("Not needed for this trip")).toBeInTheDocument();
    expect(within(hair).getByText("$90")).toBeInTheDocument();
    expect(within(spend).getByText(/You may avoid \$90/)).toBeInTheDocument();
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
