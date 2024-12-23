import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Home from "../index";



///// ************************************************************   ///////
/*
// Test Input Validation for showcase the automation features for the Tool
// Ensure the app shows an error message for invalid inputs.
*/

   test("shows error message for empty amount input", () => {
    render(<Home />);
    
    // Use the placeholder to find the input field
    const input = screen.getByPlaceholderText("Enter Amount");
    const convertButton = screen.getByText("Convert");
  
    // Simulate entering an empty value and clicking Convert
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(convertButton);
  
    // Ensure that the error message is shown
    const errorMessage = screen.getByText("Please enter a valid amount");
    expect(errorMessage).toBeInTheDocument();
  });
  
  test("clears error message when a valid amount is entered", () => {
    render(<Home />);
    
    // Use the placeholder to find the input field
    const input = screen.getByPlaceholderText("Enter Amount");
    const convertButton = screen.getByText("Convert");
  
    // Simulate entering an empty value and clicking Convert
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(convertButton);
  
    // Ensure the error message appears
    let errorMessage = screen.getByText("Please enter a valid amount");
    expect(errorMessage).toBeInTheDocument();
  
    // Simulate entering a valid value
    fireEvent.change(input, { target: { value: "100" } });
    fireEvent.click(convertButton);
  
    // Ensure the error message is cleared
    errorMessage = screen.queryByText("Please enter a valid amount");
    expect(errorMessage).toBeNull();
  });

  ///// ************************************************************   ///////