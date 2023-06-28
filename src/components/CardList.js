import React from 'react';
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
                    onDeleteCard={props.onDeleteCard}
                    // need to add both these functions to App.js
                    />
            ))}
        </section>
    )
}


export default CardList;