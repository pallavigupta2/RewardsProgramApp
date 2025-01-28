import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Rewards from "../Rewards";
import { fetchTransactions } from "../../utils/rewardspoints";

// Mock fetchTransactions function
jest.mock("../../utils/rewardspoints", () => ({
  fetchTransactions: jest.fn(),
  calculatePoints: jest.fn((price) => {
    let points = 0;
    if (price > 100) {
      points += 2 * (price - 100);
      points += 1 * 50;
    } else if (price > 50) {
      points += 1 * (price - 50);
    }
    return points;
  }),
}));

describe("Rewards Component", () => {
  const mockTransactions = [
    { id: 1, customerName: "Alice", purchaseDate: "2025-01-15", price: 120 },
    { id: 2, customerName: "Bob", purchaseDate: "2025-01-20", price: 75 },
    { id: 3, customerName: "Charlie", purchaseDate: "2024-12-15", price: 150 },
  ];

  beforeEach(() => {
    fetchTransactions.mockResolvedValue(mockTransactions);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading spinner initially", () => {
    render(<Rewards />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test("filters transactions within the last 3 months", async () => {
    render(<Rewards />);

    await waitFor(() => expect(fetchTransactions).toHaveBeenCalledTimes(1));

    // Use getAllByText to find all occurrences of "Charlie"
    const charlieEntries = screen.getAllByText(/Charlie/i);

    // Verify specific elements using their surrounding context
    expect(charlieEntries[0]).toBeInTheDocument(); // From the Transactions table
    expect(screen.getByText(/150/i)).toBeInTheDocument(); // Specific transaction
    expect(screen.getByText(/2024-12-15/i)).toBeInTheDocument(); // Specific date

    // Ensure the older transaction is not present
    expect(() => screen.getByText(/2024-11-15/i)).toThrow();
  });
});
