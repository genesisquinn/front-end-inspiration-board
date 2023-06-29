import React, {useState} from "react";
import PropTypes from 'prop-types';

const kInitialFormData = {
    title: '',
    owner: '',
  };

const NewBoardForm = ({handleBoardSubmit, onClose}) => {
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

        handleBoardSubmit({ ...formData });
        onClose();
    };
    
    const handleClose =(event) =>{
        onClose();
    };

    return (
        <form className='new-board-form' onSubmit={handleFormSubmit}>
            <div>
              <button className="close-btn" onClick={handleClose}>X</button>
            </div>
            <div>
              <h2>Create A New Board</h2>
            </div>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input 
                  type = "text" 
                  id="title" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="owner">Owner's name</label>
                <input 
                  type = "text" 
                  id="owner" 
                  name="owner" 
                  value={formData.owner} 
                  onChange={handleChange} />
            </div>
            <div className="preview-section">
                <h4>Preview:</h4>
                <p>{formData.title}</p>
                <p>{formData.owner}</p>
            </div>
            <input type="submit" value="Submit"/>
        </form>
    )

};

NewBoardForm.propTypes = {
    handleBoardSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};

export default NewBoardForm;