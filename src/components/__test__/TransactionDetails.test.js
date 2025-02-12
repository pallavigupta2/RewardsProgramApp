import React from "react";
import { render, screen } from "@testing-library/react";
import TransactionDetails from "../TransactionDetails";
import { calculatePoints } from "../../utils/rewardspoints";

jest.mock("../../utils/rewardspoints", () => ({
  calculatePoints: jest.fn(),
}));

describe("TransactionDetails Component", () => {
  test("renders transactions correctly", () => {
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
    ];

    calculatePoints.mockImplementation((price) => Math.floor(price));

    render(<TransactionDetails transactions={transactions} />);

    expect(screen.getByText("Transactions")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("$120.5")).toBeInTheDocument();
    expect(screen.getByText("$80")).toBeInTheDocument();
    expect(screen.getByText("120")).toBeInTheDocument();
    expect(screen.getByText("80")).toBeInTheDocument();
  });

  test("handles empty transactions array", () => {
    render(<TransactionDetails transactions={[]} />);
    expect(screen.getByText("No Transaction Found")).toBeInTheDocument();

    expect(
      screen.queryByRole("row", { name: /John Doe/i })
    ).not.toBeInTheDocument();
  });

  test("handles incorrect price values gracefully", () => {
    const transactions = [
      {
        id: 3,
        customerID: "C789",
        customerName: "Alice Johnson",
        purchaseDate: "2024-03-20",
        productName: "Tablet",
        price: "invalid",
      },
    ];

    calculatePoints.mockImplementation(() => 0);

    render(<TransactionDetails transactions={transactions} />);
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("Tablet")).toBeInTheDocument();
    expect(screen.getByText("$0")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
