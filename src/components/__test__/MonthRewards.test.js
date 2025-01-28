import { render, screen } from "@testing-library/react";
import MonthRewards from "../MonthRewards";
describe("MonthRewards Component", () => {
  const mockMonthlyRewards = {
    "Alice-2025-01": {
      customerName: "Alice",
      year: "2024",
      month: "01",
      rewardPoints: 240,
    },
    "Bob-2025-01": {
      customerName: "Bob",
      year: "2025",
      month: "02",
      rewardPoints: 25,
    },
  };

  test("renders monthly rewards correctly", () => {
    render(<MonthRewards monthlyRewards={mockMonthlyRewards} />);

    expect(screen.getByText(/User Monthly Rewards/i)).toBeInTheDocument();
    expect(screen.getByText(/Alice/i)).toBeInTheDocument();
    expect(screen.getByText(/2025/i)).toBeInTheDocument();
    expect(screen.getByText(/01/i)).toBeInTheDocument();
    expect(screen.getByText(/240/i)).toBeInTheDocument();
  });
});
