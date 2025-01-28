import { render, screen } from "@testing-library/react";
import TransactionDetails from "../TransactionDetails";
describe("TransactionDetails Component", () => {
  const mockTransactions = [
    {
      id: 1,
      customerName: "Alice",
      purchaseDate: "2025-01-15",
      price: 120,
      rewardPoints: 240,
    },
    {
      id: 2,
      customerName: "Bob",
      purchaseDate: "2025-01-20",
      price: 75,
      rewardPoints: 25,
    },
  ];

  test("renders transaction details correctly", () => {
    render(<TransactionDetails transactions={mockTransactions} />);

    expect(screen.getByText(/Transactions/i)).toBeInTheDocument();
    expect(screen.getByText(/Alice/i)).toBeInTheDocument();
    expect(screen.getByText(/2025-01-15/i)).toBeInTheDocument();
    expect(screen.getByText(/120/i)).toBeInTheDocument();
    expect(screen.getByText(/240/i)).toBeInTheDocument();
  });
});
