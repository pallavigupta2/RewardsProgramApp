import React from "react";
import { render, screen } from "@testing-library/react";
import TransactionDetails from "../TransactionDetails";
import {
  calculatePoints,
  formatPrice,
} from "../../utils/Utils";

describe("TransactionDetails Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("renders transactions correctly", () => {
    const transactions = [
      {
        id: 1,
        customerID: "C123",
        customerName: "John Doe",
        purchaseDate: "2024-01-15",
        productName: "Laptop",
        price: "120.5044",
      },
      {
        id: 2,
        customerID: "C456",
        customerName: "Jane Smith",
        purchaseDate: "2024-02-10",
        productName: "Phone",
        price: "90.8765",
      },
    ];

    calculatePoints((price) => Math.floor(price));
    formatPrice((price) =>
      isNaN(parseFloat(price)) ? "$0.00" : `$${parseFloat(price).toFixed(2)}`
    );

    render(<TransactionDetails transactions={transactions} />);

    expect(screen.getByText("Transactions")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText(`$${formatPrice(120.5044)}`)).toBeInTheDocument();
    expect(screen.getByText(`$${formatPrice(90.8765)}`)).toBeInTheDocument();
    expect(screen.getByText("$120.50")).toBeInTheDocument();
    expect(screen.getByText("$90.88")).toBeInTheDocument();
  });

  test("handles empty transactions array", () => {
    render(<TransactionDetails transactions={[]} />);
    expect(screen.getByText("No Transaction Found")).toBeInTheDocument();

    expect(
      screen.queryByRole("row", { name: /John Doe/i })
    ).not.toBeInTheDocument();
  });
  test("handles null transactions prop gracefully", () => {
    render(<TransactionDetails transactions={null} />);
    expect(screen.getByText("No Transaction Found")).toBeInTheDocument();
  });
  test("handles undefined transactions prop gracefully", () => {
    render(<TransactionDetails transactions={undefined} />);
    expect(screen.getByText("No Transaction Found")).toBeInTheDocument();
  });
  test("handles invalid transactions prop (non-array value)", () => {
    render(<TransactionDetails transactions={42} />);
    expect(screen.getByText("No Transaction Found")).toBeInTheDocument();
  });
  test("handles transaction with missing fields", () => {
    const transactions = [
      {
        id: 3,
        purchaseDate: "2024-03-20",
        productName: "Tablet",
        price: "200.00",
      },
    ];

    calculatePoints((price) => Math.floor(price));
    formatPrice((price) =>
      isNaN(parseFloat(price)) ? "$0.00" : `$${parseFloat(price).toFixed(2)}`
    );

    render(<TransactionDetails transactions={transactions} />);
    expect(screen.getByText("Tablet")).toBeInTheDocument();
    expect(screen.getByText(`$${formatPrice(200.0)}`)).toBeInTheDocument();
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

    calculatePoints((price) => Math.floor(price));
    formatPrice((price) =>
      isNaN(parseFloat(price)) ? 0 : `$${parseFloat(price).toFixed(2)}`
    );

    render(<TransactionDetails transactions={transactions} />);
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("Tablet")).toBeInTheDocument();
    expect(screen.getByText("$0")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });
  test("handles transaction with negative price", () => {
    const transactions = [
      {
        id: 4,
        customerID: "C789",
        customerName: "Negative Price",
        purchaseDate: "2024-04-01",
        productName: "Faulty Item",
        price: "-50.00",
      },
    ];

    calculatePoints((price) => Math.floor(price));
    formatPrice((price) =>
      isNaN(parseFloat(price)) ? "$0.00" : `$${parseFloat(price).toFixed(2)}`
    );

    render(<TransactionDetails transactions={transactions} />);
    expect(screen.getByText("Negative Price")).toBeInTheDocument();
    expect(screen.getByText("Faulty Item")).toBeInTheDocument();
    expect(screen.getByText(`$${formatPrice(-50.0)}`)).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  test("handles transaction with NaN price", () => {
    const transactions = [
      {
        id: 5,
        customerID: "C999",
        customerName: "NaN Price",
        purchaseDate: "2024-05-10",
        productName: "Unknown Item",
        price: "Not a Number33",
      },
    ];

    calculatePoints((price) => Math.floor(price));
    formatPrice((price) =>
      isNaN(parseFloat(price)) ? 0.0 : `$${parseFloat(price).toFixed(2)}`
    );

    render(<TransactionDetails transactions={transactions} />);
    expect(screen.getByText("NaN Price")).toBeInTheDocument();
    expect(screen.getByText("Unknown Item")).toBeInTheDocument();
    expect(screen.getByText("$0")).toBeInTheDocument(); // Ensuring NaN is replaced
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
