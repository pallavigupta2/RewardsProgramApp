import { render, screen } from "@testing-library/react";
import TotalRewards from "../TotalRewards";
describe("TotalRewards Component", () => {
  const mockTotalRewards = {
    Alice: { customerName: "Alice", rewardPoints: 240 },
    Bob: { customerName: "Bob", rewardPoints: 25 },
  };

  test("renders total rewards correctly", () => {
    render(<TotalRewards totalRewards={mockTotalRewards} />);

    expect(screen.getByText(/Total Rewards/i)).toBeInTheDocument();
    expect(screen.getByText(/Alice/i)).toBeInTheDocument();
    expect(screen.getByText(/240/i)).toBeInTheDocument();
    expect(screen.getByText(/Bob/i)).toBeInTheDocument();
    expect(screen.getByText(/25/i)).toBeInTheDocument();
  });
});
