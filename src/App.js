import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BoardList from './components/BoardList.js';
import CardList from './components/CardList.js';
import NewBoardForm from './components/NewBoardForm.js';
import NewCardForm from './components/NewCardForm.js';
import './App.css';



const initialCardList = [
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
  {
    id:3,
    message: "a new message",
    likes: 3,
    board_id: 1,
  },
  {
    id:4,
    message: "un nuevo mensaje",
    likes: 2,
    board_id: 3,
  },
  {
    id:5,
    message: "another phrase",
    likes: 3,
    board_id: 1,
  },
  {
    id:6,
    message: "otra frase",
    likes: 2,
    board_id: 3,
  },
]
const creators = ['Alyssa', 'G', 'Aisha', 'Theffy'];

const {REACT_APP_BACKEND_URL} = process.env;

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [showCardPopup, setShowCardPopup] = useState(false);
  //state to handle the selected board section
  const [selectedBoard, setSelectedBoard] = useState(null);
  //state to handle board Data
  const [boardData, setBoardData] = useState([]);
  const [cardList, setCardList] = useState(initialCardList);

  useEffect(()=>{
    axios
      .get(`${REACT_APP_BACKEND_URL}/boards`)
      .then((res) => setBoardData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleCreateNewBoard = (data) => {
    axios
      .post(`${REACT_APP_BACKEND_URL}/boards`, data)
      .then((res) => {
        const newBoard = res.data.board;
        setBoardData(prev => [newBoard, ...prev]);
      })
      .catch((err) => console.log(err));
  };
  
  const handleCreateNewCard = () => {
    setShowCardPopup(true);
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
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

  const handleLike = (id) => {
    setCardList((prevCardList) => {
      return prevCardList.map((card) => {
        if (id === card.id) {
          return {
            ...card,
            likes: card.likes + 1,
          };
        } else {
          return card;
        }
      });
    });
  };

const handleDeleteCard = () => {
};
  

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='slanted-text'>Inspiration Board</h1>
        <div className='menu-container'>
          <div className='menu-item'>
            <BoardList 
              boardData={boardData} 
              onBoardSelect = {handleBoardSelection}
            />
          </div>
          <div className='menu-item'>
            <button onClick={handleOpenPopup}>Create A New Board</button>
          </div>
        </div>
        {showPopup && (
          <div className='popup'>
            <div className='popup-content'>
              {/* this handleBoardSubmit will be used to pass the post request */}
              <NewBoardForm 
                handleBoardSubmit={handleCreateNewBoard}
                onClose = {handleClosePopup} />
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
              <div className='menu-item menu-card'>
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
            <CardList cardData = {cardList} onLike={handleLike} onDeleteCard={handleDeleteCard}/>
          </div>
        )}
      </section>
      <footer className='footer'>
        {/*I added this button in case we want to delete them */}
        <button>delete all boards?</button>
        <h1>Created by: {creators.join(', ')}</h1>
      </footer>
    </div>
  );
}

export default App;
