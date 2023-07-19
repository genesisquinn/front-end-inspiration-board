import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BoardList from "../BoardList";

describe("BoardList component", () => {
  const boardData = [
    { id: 1, title: "Board 1", owner: "John" },
    { id: 2, title: "Board 2", owner: "Jane" },
  ];
  
  let onBoardSelectMock;

  beforeEach(()=> {
    onBoardSelectMock = jest.fn();
    /* eslint-disable testing-library/no-render-in-setup */
    render(
      <BoardList
        boardData={boardData}
        onBoardSelect={onBoardSelectMock}
      />
    )
  });

  afterEach(() => {
    // Reset the DOM after each test
    jest.clearAllMocks();
  });

  test("opens the dropdown menu when the button is clicked", () => {
    // render(<BoardList boardData={boardData} />);

    const buttons = screen.queryAllByRole("button", { name: /Boards/i });
    fireEvent.click(buttons[0]); // Click the first button with the name "Boards"

    const dropdownMenu = screen.getByTestId("dropdown-menu");
    expect(dropdownMenu).toBeInTheDocument();
  });

  test("calls onBoardSelect with correct arguments when a board is clicked", () => {
    // const onBoardSelectMock = jest.fn();
    // render(<BoardList boardData={boardData} onBoardSelect={onBoardSelectMock} />);

    const buttons = screen.queryAllByRole("button", { name: /Boards/i });
    fireEvent.click(buttons[0]); // Click the first button with the name "Boards"

    const boardElement = screen.getAllByText(/Board 1/i)[0];
    fireEvent.click(boardElement);

    expect(onBoardSelectMock).toHaveBeenCalledTimes(1);
    expect(onBoardSelectMock).toHaveBeenCalledWith("Board 1", "John", 1);
  });
});
