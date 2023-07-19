import React from "react";
import axios from "axios";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

jest.mock("axios");

describe("App Component", () => {
  beforeEach(() => {
    axios.get.mockResolvedValueOnce({ data: [] }); // Mock a response for axios.get
    axios.post.mockResolvedValueOnce({ data: { board: { id: 2, title: 'New Board', owner: 'Test Owner' } } });
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
    expect(screen.getByText('Selected Board')).toBeInTheDocument();
    expect(screen.queryByText('Create A New Card')).not.toBeInTheDocument();

  });

  test('creates a new board and renders "Create A New Card" button after form submission', async () => {
   
    fireEvent.click(screen.getByText('Create A New Board'));

    // Fill out the form fields 
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New Board' } });
    fireEvent.change(screen.getByLabelText("Owner's name"), { target: { value: 'Test Owner' } });

    fireEvent.click(screen.getByRole('button', {name: 'Submit'}));
    
    
    // await waitFor(() => screen.findByText('New Board'));

    // Check if the button is present somewhere in the document
    const createNewCardButton = await screen.findByText('Create A New Card');
    expect(createNewCardButton).toBeTruthy();
    // Verify is these attributes are now visible
    // expect(screen.getByText('Create A New Card')).toBeInTheDocument();
    expect(screen.getByText('New Board')).toBeInTheDocument();
    expect(screen.getByText('Test Owner')).toBeInTheDocument();
  });
});
