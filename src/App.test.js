import React from "react";
// import axios from "axios";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

// jest.mock("axios");

describe("App Component", () => {
//   beforeEach(() => {
//     axios.get.mockResolvedValueOnce({ data: [] }); // Mock an empty response for axios.get
//   });

  beforeEach(() => {
    /* eslint-disable testing-library/no-render-in-setup */
    render(<App />)
  });

  // Test the rendering of the "Create A New Board" button
  test('renders the "Create A New Board" button', () => {
    
    const createBoardButton = screen.getByText('Create A New Board');
    expect(createBoardButton).toBeInTheDocument();
  });

  // Test the rendering of the "Inspiration Board" headline
  test('renders the "Inspiration Board" headline', () => {
   
    const headline = screen.getByText('Inspiration Board');
    expect(headline).toBeInTheDocument();
  });

  // Test the initial state of showPopup, showCardPopup, showDeletePopup, selectedBoard, boardData, and cardData
  test('initializes state correctly', () => {
    
    expect(screen.getByText('Boards')).toBeInTheDocument();
    expect(screen.queryByText('Selected Board')).not.toBeInTheDocument();
    expect(screen.queryByText('Create A New Card')).not.toBeInTheDocument();

  });
});
