import React from "react";
import './Card.css'

const Card = (props) => {
    return (
        <div className="card">
            <h2>{props.message}</h2>
            <section>
                <p>{props.likes}</p>
                <button onClick={(event) => props.onLike(props.id)}>+1</button>
                <button onClick={(event) => props.onDeleteCard(props.id)}>Delete</button>
            </section>
        </div>
    )
}

export default Card;