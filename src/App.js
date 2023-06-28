import React, {useState} from 'react';
import BoardList from './components/BoardList.js';
import CardList from './components/CardList.js';
import NewBoardForm from './components/NewBoardForm.js';
import NewCardForm from './components/NewCardForm.js';
import './App.css';


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

const cardList = [
  {
    id:1,
    message: "Fake it until you make it",
    likes: 3,
    board_id: 1,
  },
  {
    id:2,
    message: "Fingilo hasta conseguirlo",
    likes: 2,
    board_id: 3,
  },
]

function App() {
  const creators = ['Alyssa', 'G', 'Aisha', 'Theffy'];
  const [showPopup, setShowPopup] = useState(false);
  const [showCardPopup, setShowCardPopup] = useState(false);
  //state to handle the selected board section
  const [selectedBoard, setSelectedBoard] = useState(null);


  const handleCreateNewBoard = () => {
    setShowPopup(true);
  };

  const handleCreateNewCard = () => {
    setShowCardPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCloseCardPopup = () => {
    setShowCardPopup(false);
  };

  const handleBoardSelection = (title, owner) => {
    setSelectedBoard({title, owner});
  };
  

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='slanted-text'>Inspiration Board</h1>
        <div className='menu-container'>
          <div className='menu-item'>
            <BoardList 
              boardData={boardList} 
              onBoardSelect = {handleBoardSelection}
            />
          </div>
          <div className='menu-item'>
            <button onClick={handleCreateNewBoard}>Create A New Board</button>
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
              <div className='board-name-displayed'>
                <h3>Cards for {selectedBoard.title}</h3>
                <p>By {selectedBoard.owner}</p>
              </div>
              <div className='menu-item'>
                <button onClick={handleCreateNewCard}>Create A New Card</button>
              </div>
              {/* this handleCardSubmit will be used to pass the post request */}
              {showCardPopup && (
                <div className='popup'>
                  <div className='popup-content'>
                    {/* this handleCardSubmit will be used to pass the post request */}
                    <NewCardForm  handleCardSubmit={handleCloseCardPopup}/>
                  </div>
                </div>
              )}
            </div>
            <CardList cardData = {cardList}/>
          </div>
        )}
      </section>
      <footer className='footer'>
        <h1>Created by: {creators.join(', ')}</h1>
      </footer>
    </div>
  );
}

export default App;
