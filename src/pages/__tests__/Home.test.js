import { render, screen } from "@testing-library/react";
import Home from "../index";

test("renders the Currency Converter header", () => {
  render(<Home />); // Render the Home component

  // Check if the header is displayed
  const headerElement = screen.getByText(/Currency Converter/i);
  expect(headerElement).toBeInTheDocument();
});
