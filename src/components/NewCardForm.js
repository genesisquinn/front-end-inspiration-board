import React, {useState} from "react";
import PropTypes from 'prop-types';
import './NewCardForm.css';

const kInitialFormData = {
    message: '',
  };

const NewCardForm = ({handleCardSubmit, onClose}) => {
    const [formData, setFormData] = useState(kInitialFormData);

    const handleChange = (event) => {
        const value = event.target.value;
        const name= event.target.name;
        setFormData(prev => ({
            ...prev, [name]:value,
        }));
    };
    
    const handleFormSubmit = (event) => {
        event.preventDefault();

        handleCardSubmit({ ...formData });
        onClose();
    };
    
    const handleClose =(event) =>{
        onClose();
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
                <input type = "text" id="message" name="message" value={formData.message} onChange={handleChange} />
            </div>

            <div className="preview-section">
                <h4>Preview:</h4>
                <p>{formData.message}</p>
            </div>
            <input type="submit" value="Submit"/>
        </form>
    )

};

NewCardForm.propTypes = {
    handleCardSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};

export default NewCardForm;