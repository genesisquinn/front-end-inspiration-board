import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

const CardList = (props) => {
    return (
        <section className='cards-container'>
            {props.cardData.map((card) => (
                <Card
                    key={card.id}
                    message={card.message}
                    id={card.id}
                    likes={card.likes}
                    onLike={props.onLike} 
                    board_id= {props.boardId}
                    onDeleteCard={props.onDeleteCard}
                    // need to add both these functions to App.js
                    />
            ))}
        </section>
    )
};

CardList.propTypes = {
    cardData: PropTypes.arrayOf(
      PropTypes.shape(
        {
          id: PropTypes.number.isRequired,
          message: PropTypes.string.isRequired,
          likes: PropTypes.number.isRequired,
          board_id: PropTypes.number.isRequired,
        }
      )
    ).isRequired,
};



export default CardList;