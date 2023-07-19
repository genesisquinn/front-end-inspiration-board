import React from 'react';
import './SortCards.css';
const SortCards = ({sortingOption, setSortingOption}) => {
    return(
        <div className='sorting-selection'>
            <span>Sort Cards by</span>
            <select value={sortingOption} onChange={(e)=> setSortingOption(e.target.value)}>
                <option value="id">ID</option>
                <option value="alphabetical">Alphabetically</option>
                <option value="likes">Number of likes</option>
            </select>
        </div>
    );
};

export default SortCards;