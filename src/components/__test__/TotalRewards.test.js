import React from "react";
import { render, screen } from "@testing-library/react";
import TotalRewards from "../TotalRewards";
import { calculatePoints } from "../../utils/Utils";

describe("TotalRewards Component", () => {
  test("renders total rewards table correctly for last three months (Jan 2024 - Jan 2025)", () => {
    calculatePoints((price) => (price > 50 ? price - 50 : 0));

    const transactions = [
      {
        id: 1,
        customerID: "C1",
        customerName: "Bob",
        purchaseDate: "2024-11-10",
        productName: "Item1",
        price: 75,
      },
      {
        id: 2,
        customerID: "C2",
        customerName: "Alice",
        purchaseDate: "2024-12-15",
        productName: "Item2",
        price: 120,
      },
      {
        id: 3,
        customerID: "C3",
        customerName: "Charlie",
        purchaseDate: "2025-01-15",
        productName: "Item3",
        price: 60,
      },
      {
        id: 4,
        customerID: "C1",
        customerName: "Bob",
        purchaseDate: "2024-10-20",
        productName: "Item4",
        price: 50,
      }, // Old transaction (should be ignored)
    ];

    render(<TotalRewards transactions={transactions} />);

    expect(
      screen.getByText("Total Rewards for Last Three Months")
    ).toBeInTheDocument();
    expect(screen.getByText("Customer Name")).toBeInTheDocument();
    expect(screen.getByText("Total Reward Points")).toBeInTheDocument();

    // Checking for the latest three months: Nov 2024, Dec 2024, Jan 2025
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();

    expect(screen.getByText("25")).toBeInTheDocument();

    expect(screen.getByText("90")).toBeInTheDocument();

    expect(screen.getByText("10")).toBeInTheDocument();
  });
  test("renders total rewards for last three months (March 2024 - March 2025)", () => {
    calculatePoints((price) => (price > 50 ? price - 50 : 0));

    const transactions = [
      {
        id: 1,
        customerID: "C1",
        customerName: "Bob",
        purchaseDate: "2024-02-10",
        productName: "Item1",
        price: 75,
      },
      {
        id: 2,
        customerID: "C2",
        customerName: "Alice",
        purchaseDate: "2024-12-25",
        productName: "Item2",
        price: 120,
      },
      {
        id: 3,
        customerID: "C3",
        customerName: "Charlie",
        purchaseDate: "2025-03-05",
        productName: "Item3",
        price: 60,
      },
      {
        id: 4,
        customerID: "C1",
        customerName: "Bob",
        purchaseDate: "2025-01-10",
        productName: "Item4",
        price: 80,
      }, // Recent transaction (should be included)
    ];

    render(<TotalRewards transactions={transactions} />);

    expect(
      screen.getByText("Total Rewards for Last Three Months")
    ).toBeInTheDocument();

    // Checking for the latest three months: Jan 2025, Feb 2025, Mar 2025
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();

    // Bob's total reward:  (80-50) =  30
    expect(screen.getByText("30")).toBeInTheDocument();
    // Charlie's total reward: (60-50) = 10
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  test("displays no rewards when transactions array is empty", () => {
    render(<TotalRewards transactions={[]} />);

    expect(screen.getByText("No Total Rewards Found")).toBeInTheDocument();
  });
  test("handles missing or invalid date formats gracefully", () => {
    const transactions = [
      {
        id: 1,
        customerID: "C1",
        customerName: "Bob",
        purchaseDate: "Invalid Date",
        productName: "Item1",
        price: 100,
      },
    ];

    render(<TotalRewards transactions={transactions} />);

    expect(screen.getByText("No Total Rewards Found")).toBeInTheDocument();
  });
});
