import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Board from './Board';
import './BoardList.css';


const BoardList = (props) =>{
    //lift the state up to handle the dropdown menu with the list of boards.
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState(null);
    
    const toggleDropdown = () => {
        setIsOpen((prevState) => !prevState);
        console.log(props.boardData);
      };
    
    const handleBoardSelection = (title, owner, id) => {
        setSelectedBoard({ title, owner, id });
        setIsOpen(false); // Hide the dropdown menu
        if (props.onBoardSelect) {
          props.onBoardSelect(title, owner, id);
        }
    };

    const showList = isOpen ? 'open': '';

    return(
      <div className='dropdown'>
        <button className='dropdown-btn' onClick={toggleDropdown}>
          Boards
        </button>
        <ul className={`dropdown-menu dropdown-scroll-menu ${showList}`} data-testid = 'dropdown-menu'>
          {props.boardData.map((board) => (
            <Board
              key = {board.id}
              title = {board.title}
              owner = {board.owner}
              id= {board.id}
              onBoardSelect={handleBoardSelection}
            />
          ))}
        </ul>
      </div>
    )
};

BoardList.propTypes = {
  boardData: PropTypes.arrayOf(
    PropTypes.shape(
      {
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        owner: PropTypes.string.isRequired,
      }
    )
  ).isRequired,
  onBoardSelect: PropTypes.func,
};

export default BoardList;