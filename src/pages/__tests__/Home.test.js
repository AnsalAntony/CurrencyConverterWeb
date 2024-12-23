import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../index";

describe("Home Component Tests", () => {
  /* ***************************************************************
   * Test Input Validation for showcasing the automation features
   * Ensure the app shows an error message for invalid inputs.
   *************************************************************** */

  test("shows error message for empty amount input", () => {
    render(<Home />);

    // Find the input field and convert button
    const input = screen.getByPlaceholderText("Enter Amount");
    const convertButton = screen.getByText("Convert");

    // Simulate entering an empty value and clicking Convert
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(convertButton);

    // Verify the error message appears
    const errorMessage = screen.getByText("Please enter a valid amount");
    expect(errorMessage).toBeInTheDocument();
  });

  test("clears error message when a valid amount is entered", () => {
    render(<Home />);

    // Find the input field and convert button
    const input = screen.getByPlaceholderText("Enter Amount");
    const convertButton = screen.getByText("Convert");

    // Simulate entering an empty value and clicking Convert
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(convertButton);

    // Verify the error message appears
    let errorMessage = screen.getByText("Please enter a valid amount");
    expect(errorMessage).toBeInTheDocument();

    // Simulate entering a valid value and clicking Convert
    fireEvent.change(input, { target: { value: "100" } });
    fireEvent.click(convertButton);

    // Verify the error message is cleared
    errorMessage = screen.queryByText("Please enter a valid amount");
    expect(errorMessage).toBeNull();
  });

  /* ***************************************************************
   * Test Fetching Exchange Rates
   * Mock Testing API showcasing the basic features of the testing tool
   *************************************************************** */

  test("fetches and displays exchange rates", async () => {
    // Mock the fetch API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            conversion_rates: {
              INR: 82.5, // Example rate
            },
          }),
      })
    );

    render(<Home />);

    // Find the input field and simulate entering a valid amount
    const input = screen.getByPlaceholderText("Enter Amount");
    fireEvent.change(input, { target: { value: "100" } });

    // Click the Convert button
    const convertButton = screen.getByText("Convert");
    fireEvent.click(convertButton);

    // Wait for the exchange rate to be displayed
    await waitFor(() =>
      expect(
        screen.getByText("100 USD = 8250.00 INR")
      ).toBeInTheDocument()
    );

    // Restore the original fetch
    global.fetch.mockRestore();
  });


});
