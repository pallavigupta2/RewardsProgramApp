import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../Header";

describe("Header Component", () => {
  test("renders Rewardify logo and navigation buttons", () => {
    const setActiveTab = jest.fn();
    render(<Header setActiveTab={setActiveTab} activeTab="transactions" />);

    expect(screen.getByText("Rewardify")).toBeInTheDocument();
    expect(screen.getByText("Transactions")).toBeInTheDocument();
    expect(screen.getByText("Total Rewards")).toBeInTheDocument();
    expect(screen.getByText("User Monthly Rewards")).toBeInTheDocument();
  });

  test("calls setActiveTab when a tab is clicked", () => {
    const setActiveTab = jest.fn();
    render(<Header setActiveTab={setActiveTab} activeTab="transactions" />);

    const totalRewardsButton = screen.getByText("Total Rewards");
    fireEvent.click(totalRewardsButton);

    expect(setActiveTab).toHaveBeenCalledWith("totalRewards");
  });

  test("applies active class to the selected tab", () => {
    const setActiveTab = jest.fn();
    render(<Header setActiveTab={setActiveTab} activeTab="totalRewards" />);

    const activeButton = screen.getByText("Total Rewards");
    expect(activeButton).toHaveClass("active");
  });
});
