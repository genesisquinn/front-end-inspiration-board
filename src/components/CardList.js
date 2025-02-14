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
                    likes_count={card.likes_count}
                    onLike={props.onLike}
                    board_id={props.boardId}
                    onDeleteCard={props.onDeleteCard}
                />
            ))}
        </section>
    )
};

CardList.propTypes = {
    cardData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            likes_count: PropTypes.number.isRequired,
            board_id: PropTypes.number.isRequired,
        })
    ).isRequired,
    onLike: PropTypes.func,
    onDeleteCard: PropTypes.func,
};

export default CardList;