import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BoardList from './components/BoardList.js';
import CardList from './components/CardList.js';
import NewBoardForm from './components/NewBoardForm.js';
import NewCardForm from './components/NewCardForm.js';
import SortCards from './components/SortCards.js';
import './App.css';

const creators = ['Alyssa', 'G', 'Aisha', 'Theffy'];

// const {REACT_APP_BACKEND_URL} = process.env;
const REACT_APP_BACKEND_URL = 'https://gaat-inspiration-board.onrender.com';

const convertCard = ({ likes_count, ...card }) => ({
  ...card,
  likes_count: likes_count,
});

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [showCardPopup, setShowCardPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  //state to handle the selected board section
  const [selectedBoard, setSelectedBoard] = useState(null);
  //state to handle board Data
  const [boardData, setBoardData] = useState([]);
  const [cardData, setCardData] = useState([]);
  //state to sort cards Data
  const [sortingOption, setSortingOption] = useState('id');

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
  
  useEffect(() => {
    if(selectedBoard){
      fetchCards(selectedBoard.id);
    }
  },); //[selectedBoard]);

  const fetchCards = async (id) => {
    console.log('Board ID:', id);
    try{
      if(selectedBoard) {
        const response = await 
          axios.get(`${REACT_APP_BACKEND_URL}/boards/${id}/cards`);
          setCardData(response.data);
      }
    } catch(error){
      console.log(error);
    }
  };

  const handleCreateNewCard = (data) => {
    axios
      .post(`${REACT_APP_BACKEND_URL}/boards/${selectedBoard.id}/cards`, data)
      .then((res) => {
        const newCard = res.data;
        setCardData((prev) => [newCard, ...prev]);
        console.log(newCard); 
        fetchCards(selectedBoard.id);// Refetch cards data after creating a new card
      })
      .catch((err) => console.log(err));
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleOpenCardPopup = () => {
    setShowCardPopup(true);
  };

  const handleCloseCardPopup = () => {
    setShowCardPopup(false);
  };
  
  const handleOpenDeletePopup = () => {
      setShowDeletePopup(true);
  };


  const handleCloseDeletePopup = () => {
    setShowDeletePopup(false);
    // setSelectedBoard(null);
    // setCardData([]);
};

  const handleBoardSelection = (title, owner, id) => {
    setSelectedBoard({title, owner, id});
    console.log(selectedBoard);
    fetchCards(id);
  };

  const handleLike = (id) => {
    return axios
      .patch(`${REACT_APP_BACKEND_URL}/cards/${id}/like`)
      .then((res) => {
        // console.log(res.data);
        const updatedCard = convertCard(res.data);
        setCardData((prev) => {
          return prev.map((card) => {
            if (id === card.id) {
              return updatedCard;
            } else {
              return card;
            }
          });
        });
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteCard = (id) => {
    axios
      .delete(`${REACT_APP_BACKEND_URL}/cards/${id}`)
      .then((res) => {
        setCardData((prev) => prev.filter((card) => card.id !== id));
      })
      .catch((err) => console.log(err));
  };
    
  const handleDeleteBoard = (id) => {
    axios
      .delete(`${REACT_APP_BACKEND_URL}/boards/${id}`)
      .then((res) => {
        setBoardData((prev) => prev.filter((board) => board.id !== id));
        setSelectedBoard(null); // Reset selected board after deletion
        setCardData([]); // Reset card data after deletion
        handleCloseDeletePopup(); //Close the delete board popup after deletion
      })
      .catch((err) => console.log(err));
  };
  // Function to sort cards based on ID
  const sortCardsById = (cards) => {
    return cards.slice().sort((a, b) => a.id - b.id);
  };
  
  // Function to sort cards alphabetically
  const sortCardsAlphabetically = (cards) => {
    return cards.slice().sort((a, b) => a.message.localeCompare(b.message));
  };
  
  //Function to sort cards based on the number of likes
  const sortCardsByLikes = (cards) => {
    return cards.slice().sort((a, b)=> b.likes_count - a.likes_count);
  };
  // Function to sort cards based on the selected sorting option
  const sortCards = (cards) => {
    if (sortingOption === 'id') {
      return sortCardsById(cards);
    } else if (sortingOption === 'alphabetical') {
      return sortCardsAlphabetically(cards);
    } else if (sortingOption === 'likes'){
      return sortCardsByLikes(cards);
    }
    return cards; // Return the original cards if no sorting option matches
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
              <SortCards sortingOption={sortingOption} setSortingOption={setSortingOption}/>
              <div className='menu-item menu-card'>
                <button onClick={handleOpenCardPopup}>Create A New Card</button>
              </div>
              {/* this handleCardSubmit will be used to pass the post request */}
              {showCardPopup && (
                <div className='popup'>
                  <div className='popup-content'>
                    {/* this handleCardSubmit will be used to pass the post request */}
                    <NewCardForm  handleCardSubmit={handleCreateNewCard} onClose={handleCloseCardPopup}/>
                  </div>
                </div>
              )}
              <div className='menu-item delete-menu'>
                <button onClick={handleOpenDeletePopup}>delete current board?</button>
              </div>
              {showDeletePopup&& (
                <div className='popup delete-board-popup'>
                  <div className='popup-content delete-board-content'>
                    <p> Are you sure you want to delete this board?</p>
                    <button className="delete-button" onClick={() => handleDeleteBoard(selectedBoard.id)}>Yes, delete</button>
                    <button className="cancel-button" onClick={handleCloseDeletePopup}>Cancel</button> 
                  </div>
                </div>
              )}
            </div>
            <CardList 
              cardData = {sortCards(cardData)} 
              boardId= {selectedBoard.id} 
              onLike={handleLike} 
              onDeleteCard={handleDeleteCard}/>
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
