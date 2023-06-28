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

  const handleCreateNewBoard = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='slanted-text'>Inspiration Board</h1>
        <div className='menu-container'>
          <div className='menu-item'>
            <BoardList boardData={boardList}/>
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
        <h1>Selected Board Section</h1>
      </section>
      <footer>
        <h1>footer</h1>
      </footer>
    </div>
  );
}

export default App;
