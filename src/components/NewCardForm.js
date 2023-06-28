import React, {useState} from "react";
import PropTypes from 'prop-types';
import './NewCardForm.css';

const NewCardForm = ({handleCardSubmit}) => {
    const[message, setMessage] = useState('');
    // const[owner, setOwner] = useState('');
    const[showForm, setShowForm] = useState(true);

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    }

    // const handleOwnerChange = (event) => {
    //     setOwner(event.target.value);
    //   };
    
    const handleFormSubmit = (event) => {
        event.preventDefault();

        const newCard = {
            message: message,
        }

        setMessage("");
        handleCardSubmit();
    };
    
    const handleClose =(event) =>{
        setShowForm(false);
    };
    return (
        <form className='new-board-form' onSubmit={handleFormSubmit}>
            <div>
              <button className="close-button" onClick={handleClose}>X</button>
            </div>
            <div>
              <h2>Create A New Card</h2>
            </div>
            <div className="form-group">
                <label htmlFor="message">Message</label>
                <input type = "text" id="message" name="boardTitle" value={message} onChange={handleMessageChange} />
            </div>
            {/* <div className="form-group">
                <label htmlFor="owner">Owner's name</label>
                <input type = "text" id="owner" name="boardOwner" value={owner} onChange={handleOwnerChange} />
            </div> */}
            <div className="preview-section">
                <h4>Preview:</h4>
                <p>{message}</p>
                {/* <p>{owner}</p> */}
            </div>
            <input type="submit" value="Submit"/>
        </form>
    )

};

NewCardForm.propTypes = {
    handleCardSubmit: PropTypes.func.isRequired,
};

export default NewCardForm;