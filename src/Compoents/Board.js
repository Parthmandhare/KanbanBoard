import React, { useState } from 'react';
import './Board.css';
import Card from './Card';
import AddCard from './AddCard';

const Board = props => {
  
  // State to manage the visibility of the modal for updating the section title
  const [showModal2, setShowModal2] = useState(false);

  // State to hold the new title for the board
  const [newTitle, setNewTitle] = useState("");

  return (
    <div className="h-screen flex flex-col gap-5 min-w-64">
      <div className="board_top">
        <div className='flex justify-between gap-10'>
          <p className="font-bold"> {props.board?.title} </p>

          <div className="flex gap-2 align-middle">
            <div className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="grey"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>

              {showModal2 ? ( // Conditional rendering for the modal
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-full h-full max-w-lg p-4 md:h-auto">
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                          <h3 className="text-xl font-bold">
                            Update Section
                          </h3>
                          <button
                            className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModal2(false)} // Close modal on button click
                          >
                            <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                              ×
                            </span>
                          </button>
                        </div>
                        {/* Modal body */}
                        <div className="relative p-6 flex-auto">
                          <form>
                            <div className="pb-6">
                              <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                  <label
                                    htmlFor="Title"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Section Title
                                  </label>
                                  <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus:ring-gray-100">
                                      <input
                                        type="text"
                                        name="Title"
                                        id="Title"
                                        autoComplete="Title"
                                        className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 px-2"
                                        placeholder="Enter title..."
                                        value={newTitle} // Bind input value to newTitle state
                                        onChange={(e) => { setNewTitle(e.target.value) }} // Update newTitle state on input change
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        {/* Modal footer */}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b gap-3">
                          <button
                            className="text-black background-transparent font-bold uppercase px-4 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 border-2 rounded"
                            type="button"
                            onClick={() => props.removeBoard(props.board?.id)} // Remove board on button click
                          >
                            Delete Section
                          </button>
                          <button
                            className="bg-gray-500 text-white active:bg-black font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => props.upDateBoard(props.board?.id, newTitle)} // Update section title on button click
                          >
                            Update Section
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}
            </div>

            <div className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="grey"
                className="size-4"
                onClick={() => setShowModal2(true)} // Show modal on icon click
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="board_cards">
        {props.board?.cards?.map(item => (
          <Card
            key={item.id}
            card={item} // Pass current card data as a prop
            removeCard={props.removeCard} // Pass removeCard function as a prop
            boardID={props.board?.id} // Pass board ID as a prop
            handelDragEnd={props.handelDragEnd} // Pass drag end handler as a prop
            handelDragEnter={props.handelDragEnter} // Pass drag enter handler as a prop
            updateCard={props.updateCard} // Pass updateCard function as a prop
          />
        ))}
        <AddCard
          displayClass="board_cards_add" // Class for styling the Add Card component
          text="Add Card" // Text for the Add Card button
          placeholder="Enter Card Title" // Placeholder for input field
          onSubmit={value => props.addCard(value, props.board?.id)} // Call addCard on submit
        />
      </div>
    </div>
  );
};

export default Board;
