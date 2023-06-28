import React from "react";
import PropTypes from 'prop-types';

const Board = (props) => {
    const handleBoardClick = () => {
        props.onBoardSelect(props.title, props.owner);
    };

    return(
        <li onClick={handleBoardClick}>
            <h3>{props.title}</h3>
        </li>
    )
};

Board.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  onBoardSelect: PropTypes.func,
//   hideDropdown: PropTypes.func,
};

export default Board;