import React from "react";
import { render, screen } from "@testing-library/react";
import MonthRewards from "../MonthRewards";
import { calculatePoints } from "../../utils/RewardPointsCalculation";

jest.mock("../../utils/RewardPointsCalculation", () => ({
  calculatePoints: jest.fn(),
}));

describe("MonthRewards Component", () => {
  test("renders monthly rewards correctly", () => {
    const transactions = [
      {
        id: 1,
        customerID: "C123",
        customerName: "John Doe",
        purchaseDate: "2024-01-15",
        productName: "Laptop",
        price: "120.50",
      },
      {
        id: 2,
        customerID: "C456",
        customerName: "Jane Smith",
        purchaseDate: "2024-02-10",
        productName: "Phone",
        price: "80.00",
      },
      {
        id: 3,
        customerID: "C123",
        customerName: "John Doe",
        purchaseDate: "2024-01-20",
        productName: "Mouse",
        price: "40.00",
      },
    ];

    calculatePoints.mockImplementation((price) => Math.floor(price));

    render(<MonthRewards transactions={transactions} />);

    expect(screen.getByText("User Monthly Rewards")).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  test("handles empty transactions array", () => {
    render(<MonthRewards transactions={[]} />);
    expect(
      screen.getByText("No Monthly Transaction Found")
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("row", { name: /John Doe/i })
    ).not.toBeInTheDocument();
  });

  test("handles negative price values gracefully", () => {
    const transactions = [
      {
        id: 4,
        customerID: "C789",
        customerName: "Alice Johnson",
        purchaseDate: "2024-03-20",
        productName: "Tablet",
        price: "-50",
      },
    ];

    calculatePoints.mockImplementation(() => 0);

    render(<MonthRewards transactions={transactions} />);
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  test("aggregates reward points correctly by month", () => {
    const transactions = [
      {
        id: 5,
        customerID: "C555",
        customerName: "Charlie Brown",
        purchaseDate: "2024-02-01",
        productName: "Keyboard",
        price: "60.00",
      },
      {
        id: 6,
        customerID: "C555",
        customerName: "Charlie Brown",
        purchaseDate: "2024-02-15",
        productName: "Monitor",
        price: "200.00",
      },
    ];

    calculatePoints.mockImplementation((price) => Math.floor(price));

    render(<MonthRewards transactions={transactions} />);
    expect(screen.getByText("Charlie Brown")).toBeInTheDocument();
  });
  test("handles empty purchaseDate gracefully and skips invalid entries", () => {
    const transactions = [
      {
        id: 1,
        customerID: "C1",
        customerName: "Alice",
        purchaseDate: "", // Empty purchaseDate (will be skipped)
        productName: "Item1",
        price: 100,
      },
      {
        id: 2,
        customerID: "C1",
        customerName: "Bob",
        purchaseDate: "2025-02-25", // Valid purchaseDate
        productName: "Item2",
        price: 75.555,
      },
    ];

    render(<MonthRewards transactions={transactions} />);

    // Ensure that the transaction with an empty purchaseDate is skipped
    // and only the valid transaction is considered in the reward calculation
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.queryByText("Alice")).not.toBeInTheDocument();
  });
});
