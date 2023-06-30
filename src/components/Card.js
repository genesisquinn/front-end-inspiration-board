import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faHeart } from "@fortawesome/free-solid-svg-icons";
import './Card.css'
import PropTypes from 'prop-types';

const Card = (props) => {
    return (
        <div className="card">
            <h2>{props.message}</h2>
            <section>
                <div className="heart-container">
                    <FontAwesomeIcon
                        icon={faHeart}
                        className="heart-icon"
                        size="2x" />
                    <span className="heart-count">{props.likes}</span>
                </div>
                <button onClick={(event) => props.onLike(props.id)}>⬆️</button>
                <button onClick={(event) => props.onDeleteCard(props.id)}>
                    <FontAwesomeIcon icon={faTrashCan} className="trash-icon" size="2x" />
                </button>
            </section>
        </div>
    )
};

Card.propTypes = {
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    onLike: PropTypes.func.isRequired,
    onDeleteCard: PropTypes.func.isRequired
}

export default Card;