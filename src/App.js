import React, {useState} from 'react';
import BoardList from './components/BoardList.js';
import './App.css';
import NewBoardForm from './components/NewBoardForm.js';

const boardList = [
  {
    id: 1,
    title: "New Board",
    owner: "Marta"
  },
  {
    id: 2,
    title: "Other Board",
    owner: "Jon"
  },
  {
    id: 3,
    title: "My Board",
    owner: "Lauren"
  },
]

function App() {
  const [showPopup, setShowPopup] = useState(false);
  //state to handle the selected board section
  const [selectedBoard, setSelectedBoard] = useState(null);
  //state to handle dropdown menu (hide it after clicking on one board)
  // const [showDropdown, setShowDropdown] = useState(false);

  const handleCreateNewBoard = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleBoardSelection = (title, owner) => {
    setSelectedBoard({title, owner});
    // setShowDropdown(false);
  };
  
  // //Toggle the showDropdown state
  // const handleToggleDropdown = () => {
  //   setShowDropdown(false);
  // };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='slanted-text'>Inspiration Board</h1>
        <div className='menu-container'>
          <div className='menu-item'>
            <BoardList 
              boardData={boardList} 
              onBoardSelect = {handleBoardSelection}
              // hideDropdown = {handleToggleDropdown}
              // showDropdown = {showDropdown}
            />
          </div>
          <div className='menu-item'>
          <button className='dropdown-btn' onClick={handleCreateNewBoard}>Create A New Board</button>
          </div>
        </div>
        {showPopup && (
          <div className='popup'>
            <div className='popup-content'>
              {/* this handleBoardSubmit will be used to pass the post request */}
              <NewBoardForm handleBoardSubmit={handleClosePopup} />
            </div>
          </div>
        )}
      </header>
      <section>
        <div className='selected-board'>
          <h1 className='selected-board-headline'>Selected Board</h1>
        </div>
        {selectedBoard && (
          <div className='board-container'>
            <div className='left-column'>
              <h3>Cards for {selectedBoard.title}</h3>
              <p>By {selectedBoard.owner}</p>
            </div>
            <div className='cards-container'>
                <div className='card'>
                  un mensaje
                </div>
                <div className='card'>
                  otro mensaje
                </div>
                <div className='card'>
                  un mensaje
                </div>
                <div className='card'>
                  otro mensaje
                </div>
                <div className='card'>
                  un mensaje
                </div>
                <div className='card'>
                  otro mensaje
                </div>
            </div>
          </div>
        )}
      </section>
      <footer>
        <h1>footer</h1>
      </footer>
    </div>
  );
}

export default App;
