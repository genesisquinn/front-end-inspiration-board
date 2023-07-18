import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Card from '../Card';

describe('Card Component', () => {
  const mockCardData = {
    id: 1,
    message: 'Test Card',
    likes_count: 5,
    onLike: jest.fn(),
    onDeleteCard: jest.fn(),
  };
  beforeEach(() =>{
    /* eslint-disable testing-library/no-render-in-setup */
    render(<Card {...mockCardData} />);
  });
  test('renders the card with correct data', () => {
    const cardElement = screen.getByTestId('card-component');
    const messageElement = screen.getByText('Test Card');
    const likeCountElement = screen.getByText('5');

    expect(cardElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
    expect(likeCountElement).toBeInTheDocument();
  });

  test('calls onLike function when like button is clicked', () => {
    const likeButton = screen.getByText('⬆️');
    fireEvent.click(likeButton);

    expect(mockCardData.onLike).toHaveBeenCalledTimes(1);
    expect(mockCardData.onLike).toHaveBeenCalledWith(1); 
  });

  test('calls onDeleteCard function when delete button is clicked', () => {
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);

    expect(mockCardData.onDeleteCard).toHaveBeenCalledTimes(1);
    expect(mockCardData.onDeleteCard).toHaveBeenCalledWith(1); 
  });
});
