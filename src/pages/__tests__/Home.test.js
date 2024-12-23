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

 
  /* ***************************************************************
   * snapshot testing.
   * showcasing snapshot testing features of the testing tool
   *************************************************************** */

  test("Home component snapshot test", () => {
    // Render the component
    const { asFragment } = render(<Home />);
  
    // Generate and compare snapshot
    expect(asFragment()).toMatchSnapshot();
  });

  /* ***************************************************************
   * some basic level of testing.
   * showcasing the basic features of the testing tool
   *************************************************************** */

  test("updates the input value when user types", () => {
    // Render the component
    render(<Home />);
  
    // Find the input field by its placeholder text
    const input = screen.getByPlaceholderText("Enter Amount");
  
    // Simulate typing into the input field
    fireEvent.change(input, { target: { value: "100" } });
  
    // Assert that the input value has been updated
    expect(input.value).toBe("100");
  });

   /* ***************************************************************
   * Test Fetching Exchange Rates advanced level of testing 
   * Mock Testing API showcasing the advanced features of the testing tool
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

  // Mock the countryList module
jest.mock("../../data/countrylist", () => ({
    USD: "US",
    INR: "IN",
  }));

  test("displays correct flag for selected currencies", async () => {
    render(<Home />);
    
    // Check the "from" currency flag
    const usdFlag = screen.getByAltText("from-flag");
    expect(usdFlag).toHaveAttribute("src", "https://flagcdn.com/48x36/us.png");
  
    // Change the 'fromCurrency' to 'INR' and check the "from" flag again
    const fromCurrencySelect = screen.getByDisplayValue("USD");
    fireEvent.change(fromCurrencySelect, { target: { value: "INR" } });
  
  
    await waitFor(() => {
        const inrFlag = screen.getByAltText("from-flag");
        expect(inrFlag).toHaveAttribute("src", "https://flagcdn.com/48x36/in.png");
           // Check the "to" currency flag
    const toFlag = screen.getByAltText("to-flag");
    expect(toFlag).toHaveAttribute("src", "https://flagcdn.com/48x36/in.png");
       
      });
 
  });

});
