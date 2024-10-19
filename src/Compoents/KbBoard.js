import React, { useEffect, useState } from 'react';

// Importing styles and components
import './kanbanboard.css'
import Board from './Board';
import AddCard from './AddCard';
import Navbar from './Navbar';

function KanbanBoard() {
  // State to store board data (initializing with data from localStorage or an empty array)
  const [boards, setBoards] = useState(JSON.parse(localStorage.getItem('Kanban')) || []);

  // State to track the target card being dragged (includes card id and board id)
  const [target, setTarget] = useState({
    cid: "",  // Card ID
    bid: "",  // Board ID
  });

  // Function to add a new card to a specific board
  const addCard = (title, bid) => {
    const card = {
      id: Date.now() + Math.random(), // Unique ID for the card
      title,  // Card title
      date: "",
      desc: "",
      toUser: ""
    };

    // Find the board index where the card should be added
    const index = boards.findIndex(item => item.id == bid);
    if (index < 0) return;  // Exit if no board is found

    // Create a copy of boards, add the card to the selected board
    const tempBoards = [...boards];
    tempBoards[index].cards.push(card);
    setBoards(tempBoards);  // Update boards state
  };

  // Function to remove a card from a specific board
  const removeCard = (cid, bid) => {
    const bIndex = boards.findIndex((item) => item.id === bid);
    if (bIndex < 0) return;  // Exit if board not found

    const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid);
    if (cIndex < 0) return;  // Exit if card not found

    const tempBoards = [...boards];
    tempBoards[bIndex].cards.splice(cIndex, 1);  // Remove the card
    setBoards(tempBoards);  // Update boards state
  };

  // Function to add a new board
  const addBoard = (title) => {
    setBoards([
      ...boards,
      {
        id: Date.now() + Math.random(),  // Unique ID for the board
        title,  // Board title
        cards: [],  // Empty array for cards in this board
      }
    ]);
  };

  // Function to update the title of a board
  const upDateBoard = (bid, title) => {
    let currBoard = boards.map((item) => {
      if (item.id == bid) {
        item.title = title;  // Update the title
        return item;
      }
      return item;
    });

    setBoards(currBoard);  // Update boards state
  };

  // Function to remove a board
  const removeBoard = (bid) => {
    const tempBoards = boards.filter((item) => item.id != bid);  // Filter out the board by ID
    setBoards(tempBoards);  // Update boards state
  };

  // Function to handle drag enter event for a card
  const handelDragEnter = (cid, bid) => {
    setTarget({
      cid,  // Card ID being dragged
      bid,  // Board ID being dragged into
    });
  };

  // Function to handle the drop event when a card is dragged and dropped
  const handelDragEnd = (cid, bid) => {
    let s_bIndex, s_cIndex, t_bIndex, t_cIndex;

    // Source board and card index
    s_bIndex = boards.findIndex(item => item.id === bid);
    if (s_bIndex < 0) return;
    s_cIndex = boards[s_bIndex].cards?.findIndex(item => item.id === cid);
    if (s_cIndex < 0) return;

    // Target board and card index
    t_bIndex = boards.findIndex(item => item.id === target.bid);
    if (t_bIndex < 0) return;
    t_cIndex = boards[t_bIndex].cards?.findIndex(item => item.id === target.cid);
    if (t_cIndex < 0) return;

    // Move the card from the source board to the target board
    const tempboards = [...boards];
    const tempcards = tempboards[s_bIndex].cards[s_cIndex];
    tempboards[s_bIndex].cards.splice(s_cIndex, 1);  // Remove from source
    tempboards[t_bIndex].cards.splice(t_cIndex, 0, tempcards);  // Insert into target

    setBoards(tempboards);  // Update boards state
  };

  // Function to update a card's details
  const updateCard = (cid, bid, card) => {
    const bIndex = boards.findIndex((item) => item.id === bid);
    if (bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid);
    if (cIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[bIndex].cards[cIndex] = card;  // Update card details
    setBoards(tempBoards);  // Update boards state
  };

  // Use effect hook to save boards state in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('Kanban', JSON.stringify(boards));
  }, [boards]);

  return (
    <div>
      <Navbar />

      {/* Main content area where the Kanban boards and cards are displayed */}
      <div className="mx-10 my-10 flex gap-10">
        {
          boards.map((item) => (
            <Board
              removeBoard={removeBoard}
              key={item.id}
              board={item}
              addCard={addCard}
              removeCard={removeCard}
              handelDragEnd={handelDragEnd}
              handelDragEnter={handelDragEnter}
              updateCard={updateCard}
              upDateBoard={upDateBoard}
            />
          ))
        }
        {/* Add new board section */}
        <div className="boards_add_board">
          <AddCard
            buttonText="Add Section"
            placeholder="Enter Section title"
            onSubmit={(value) => addBoard(value)}
          />
        </div>
      </div>
    </div>
  );
}

export default KanbanBoard;
