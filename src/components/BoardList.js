import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Board from './Board';
import './BoardList.css';


const BoardList = (props) =>{
    //lift the state up to handle the dropdown menu with the list of boards.
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((prevState) => !prevState);
      };
    
    const showList = isOpen ? 'open': '';

    return(
      <div className='dropdown'>
        <button className='dropdown-btn' onClick={toggleDropdown}>Boards</button>
        <ul className={`dropdown-menu ${showList}`}>
          {props.boardData.map((board) => (
            <Board
              key = {board.id}
              title = {board.title}
              owner = {board.owner}
              id= {board.id}
              onBoardSelect = {props.onBoardSelect}
              // hideDropdown = {props.hideDropdown}
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
  // hideDropdown: PropTypes.func,
};

export default BoardList;