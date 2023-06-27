import React, {useState} from "react";
import PropTypes from 'prop-types';

const NewBoardForm = ({handleBoardSubmit}) => {
    const[title, setTitle] = useState('');
    const[owner, setOwner] = useState('')

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleOwnerChange = (event) => {
        setOwner(event.target.value);
      };
    
    const handleFormSubmit = (event) => {
        event.preventDefault();

        const newBoard = {
            title: title,
            owner: owner,
        }

        setTitle("");
        setOwner('');
        handleBoardSubmit();
    };

    return (
        <form className='new-board-form' onSubmit={handleFormSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type = "text" id="title" name="boardTitle" value={title} onChange={handleTitleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="owner">Owner's name</label>
                <input type = "text" id="owner" name="boardOwner" value={owner} onChange={handleOwnerChange} />
            </div>
            <div className="preview-section">
                <h4>Preview:</h4>
                <p>{title}</p>
                <p>{owner}</p>
            </div>
            <input type="submit" value="Submit"/>
        </form>
    )

};

NewBoardForm.propTypes = {
    handleBoardSubmit: PropTypes.func.isRequired,
};

export default NewBoardForm;