import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { fetchTransactions } from "../src/utils/service";

jest.mock("../src/utils/service", () => ({
  fetchTransactions: jest.fn(),
}));

jest.mock("./logger", () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

describe("App Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("renders Header component", () => {
    render(<App />);
    expect(screen.getByText("Rewardify")).toBeInTheDocument();
  });

  test("shows loading indicator while fetching transactions", async () => {
    fetchTransactions.mockResolvedValueOnce([]);
    render(<App />);
    expect(screen.getByText("Loading Transactions...")).toBeInTheDocument();
  });

  test("renders transactions after successful fetch", async () => {
    const mockTransactions = [
      {
        id: 1,
        customerID: "123",
        customerName: "Alice",
        purchaseDate: "2024-02-10",
        productName: "Laptop",
        price: 200,
      },
    ];
    fetchTransactions.mockResolvedValueOnce(mockTransactions);
    render(<App />);
    // Wait for the loading message to appear
    expect(screen.getByText("Loading Transactions...")).toBeInTheDocument();

    await screen.findByText(/Alice/i);
  });

  test("handles fetch error and displays error message", async () => {
    fetchTransactions.mockRejectedValueOnce(new Error("Network error"));
    render(<App />);
    await screen.findByText("Failed to fetch transactions. Please try again.");
  });

  test("allows switching between tabs", async () => {
    fetchTransactions.mockResolvedValueOnce([]);
    render(<App />);
    await screen.findByText("Transactions");

    fireEvent.click(screen.getByText("Total Rewards"));
    const totalRewardHeading = screen.queryByTestId("total-reward");
    const totalRewardError = screen.queryByText("No Total Rewards Found");

    expect(totalRewardHeading || totalRewardError).toBeInTheDocument();

    fireEvent.click(screen.getByText("User Monthly Rewards"));
    const monthlyRewardHeading = screen.queryByTestId("monthly-reward");
    const monthlyRewardError = screen.queryByText(
      "No Monhtly Transaction Found"
    );

    expect(monthlyRewardHeading || monthlyRewardError).toBeInTheDocument();
  });
});
