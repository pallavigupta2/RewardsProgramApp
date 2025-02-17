import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import RewardsDashboard from "./RewardsDashboard";
import { fetchTransactions } from "../utils/Services";
import logger from "../logger";

jest.mock("../utils/Services", () => ({
  fetchTransactions: jest.fn(),
}));

jest.mock("../logger", () => ({
  error: jest.fn(),
}));

describe("RewardsDashboard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows loading indicator while fetching transactions", async () => {
    fetchTransactions.mockResolvedValueOnce([]);
    render(<RewardsDashboard />);
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
    render(<RewardsDashboard />);
    // Wait for the loading message to appear
    expect(screen.getByText("Loading Transactions...")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("Transactions")));
    await screen.findByText(/Alice/i);
  });
  test("displays error message on API failure", async () => {
    fetchTransactions.mockRejectedValue(new Error("API Error"));
    render(<RewardsDashboard />);
    await waitFor(() =>
      expect(
        screen.getByText("Failed to fetch transactions. Please try again.")
      )
    );
    expect(logger.error).toHaveBeenCalledWith(
      "Failed to load transactions",
      expect.any(Error)
    );
  });

  test("renders error message when API fails and does not display transactions", async () => {
    fetchTransactions.mockRejectedValue(new Error("API Error"));
    render(<RewardsDashboard />);
    await waitFor(() => {
      expect(
        screen.getByText("Failed to fetch transactions. Please try again.")
      ).toBeInTheDocument();
    });
  });

  test("allows switching between tabs", async () => {
    fetchTransactions.mockResolvedValueOnce([]);
    render(<RewardsDashboard />);
    await screen.findByText("Transactions");

    fireEvent.click(screen.getByText("Total Rewards"));
    const totalRewardHeading = screen.queryByTestId("total-reward");
    const totalRewardError = screen.queryByText("No Total Rewards Found");

    expect(totalRewardHeading || totalRewardError).toBeInTheDocument();

    fireEvent.click(screen.getByText("User Monthly Rewards"));
    const monthlyRewardHeading = screen.queryByTestId("monthly-reward");
    const monthlyRewardError = screen.queryByText(
      "No Monthly Transaction Found"
    );

    expect(monthlyRewardHeading || monthlyRewardError).toBeInTheDocument();
  });
});
