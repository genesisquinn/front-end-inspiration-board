import React, {useState} from 'react';
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
        <button className='dropdown-btn' onClick={toggleDropdown}>Board</button>
        <ul className={`dropdown-menu ${showList}`}>
          {props.boardData.map((board) => (
            <Board
              key = {board.id}
              title = {board.title}
              owner = {board.owner}
              id= {board.id}
            />
          ))}
        </ul>
      </div>
    )
}

export default BoardList;