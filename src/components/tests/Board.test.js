import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import Board from "../Board";

describe('Board behavior', () => {
    let onBoardSelectMock;

    const renderBoard = () => {
      onBoardSelectMock = jest.fn();
      render(
        <Board
          title="Test Board"
          owner="Marcela"
          id={1}
          onBoardSelect={onBoardSelectMock}
        />
      );
    };
  
    beforeEach(() => {
      /* eslint-disable testing-library/no-render-in-setup */
      renderBoard();
    });

    test("renders the Board component with correct title", () => {
        expect(screen.getByText(/Test Board/)).toBeInTheDocument();
      });

    test('calls onBoardSelect with correct arguments when clicked', () => {
      const boardElement = screen.getByText(/Test Board/);
      fireEvent.click(boardElement);

      //Assert
      expect(onBoardSelectMock).toHaveBeenCalledTimes(1);
      expect(onBoardSelectMock).toHaveBeenCalledWith("Test Board", "Marcela", 1)
    });

    test('asserts the Board component is visible', () => {
        const boardElement = screen.getByText(/Test Board/);
        expect(boardElement).toBeVisible();
      });
});

  