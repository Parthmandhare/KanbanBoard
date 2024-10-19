import { Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { CheckSquare, Clock, Trash2, User } from 'react-feather';
import './Card.css';
import CardInfo from './CardInfo';
import Chips from './Chips';

const Card = (props) => {
  // State to manage the visibility of the modal for card details
  const [showModal, setModal] = useState(false);
  
  // State to manage the visibility of the task options modal
  const [showModal2, setShowModal2] = useState(false);

  return (
    <>
      {/* Render CardInfo modal if showModal is true */}
      {showModal && (
        <CardInfo 
          updateCard={props.updateCard} // Function to update the card
          boardID={props.boardID} // Pass the board ID
          card={props.card} // Pass the current card data
          onClose={() => setModal(false)} // Close modal function
        />
      )}
      
      {/* Card container with drag-and-drop functionality */}
      <div 
        className="bg-white rounded-lg px-4 py-3 mt-3 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col gap-5" 
        draggable // Make the card draggable
        onDragEnd={() => props.handelDragEnd(props.card?.id, props.boardID)} // Handle drag end event
        onDragEnter={() => props.handelDragEnter(props.card?.id, props.boardID)} // Handle drag enter event
      >
        <div className="flex justify-between items-center">
          
          {/* Card title that opens the card detail modal */}
          <div className="card_title" onClick={() => setModal(true)}>
            <p className='font-semibold text-lg'>{props.card?.title}</p>
          </div>

          {/* Button to show task options modal */}
          <button
            onClick={() => {setShowModal2(true)}}
            className="text-gray-500 hover:text-gray-700"
          >
            {/* Icon for showing task options */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>

          {/* Render task options modal if showModal2 is true */}
          {showModal2 && (
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Task Options
                  </h3>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    {/* Delete Task button */}
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-500 text-white active:bg-black px-4 py-2 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                      onClick={() => props.removeCard(props.card?.id, props.boardID)} // Call removeCard function
                    >
                      Delete Task
                    </button>
                    {/* Update Task button */}
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                      onClick={() => {setShowModal2(false); setModal(true)}} // Show update modal
                    >
                      Update Task
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
        </div>

        {/* Task details section */}
        <div className="flex justify-between gap-10" onClick={() => setModal(true)}>
          {props.card?.date && (
            <div className='flex gap-3'>
              <Clock />
              <Text>{props.card?.date}</Text> {/* Display the task date */}
            </div>
          )}

          {props.card?.toUser && (
            <div className='flex gap-3'>
              <User />
              <Text>{props.card?.toUser}</Text> {/* Display the assigned user */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
