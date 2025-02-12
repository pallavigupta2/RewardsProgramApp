import React from "react";
import { render, screen } from "@testing-library/react";
import TotalRewards from "../TotalRewards";
import { calculatePoints } from "../../utils/rewardspoints";

jest.mock("../../utils/rewardspoints", () => ({
  calculatePoints: jest.fn(),
}));


describe("TotalRewards Component", () => {
  test("renders total rewards table correctly", () => {
    calculatePoints.mockImplementation((price) =>
      price > 50 ? price - 50 : 0
    );

    const transactions = [
      {
        id: 1,
        customerID: "C1",
        customerName: "Bob",
        purchaseDate: "2025-01-15",
        productName: "Item1",
        price: 75,
      },
      {
        id: 2,
        customerID: "C2",
        customerName: "Alice",
        purchaseDate: "2025-02-05",
        productName: "Item2",
        price: 120,
      },
      {
        id: 3,
        customerID: "C3",
        customerName: "Charlie",
        purchaseDate: "2024-12-20",
        productName: "Item3",
        price: 60,
      },
      {
        id: 4,
        customerID: "C1",
        customerName: "Bob",
        purchaseDate: "2024-11-10",
        productName: "Item4",
        price: 80,
      }, // Old transaction (should be ignored)
    ];

    render(<TotalRewards transactions={transactions} />);

    expect(screen.getByText("Total Rewards")).toBeInTheDocument();
    expect(screen.getByText("Customer Name")).toBeInTheDocument();
    expect(screen.getByText("Total Reward Points")).toBeInTheDocument();

    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();

    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("70")).toBeInTheDocument();
    expect(screen.getByText("70")).toBeInTheDocument();
  });
});
