import React from 'react';

const SortCards = ({sortingOption, setSortingOption}) => {
    return(
        <div className='sorting-selection'>
            <span>Sort by:</span>
            <select value={sortingOption} onChange={(e)=> setSortingOption(e.target.value)}>
                <option value="id">Sort by ID</option>
                <option value="alphabetical">Sort alphabetically</option>
            </select>
        </div>
    );
};

export default SortCards;