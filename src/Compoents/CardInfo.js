import React, { useEffect, useState } from 'react';
import { Calendar, CheckSquare, List, Tag, Trash, Type } from 'react-feather';
import "./CardInfo.css";
import Modal from './Modal';
import AddCard from './AddCard';
import Chips from './Chips';

const CardInfo = (props) => {
  // Initialize state with card details from props
  const [values, setValues] = useState({ ...props.card });

  // Effect to update the card whenever 'values' changes
  useEffect(() => {
    props.updateCard(props.card.id, props.boardID, values);
  }, [values]);

  // Function to add a new task to the card
  const addTask = (value) => {
    const task = {
      id: Date.now() + Math.random(), // Unique ID for the task
      text: value, // Task text
      completed: false // Initial state as incomplete
    };

    // Update state with the new task
    setValues({ ...values, tasks: [...values.tasks, task] });
  };

  // Function to remove a task by its ID
  const removeTask = (id) => {
    const index = values.tasks?.findIndex(item => item.id === id);
    if (index < 0) return; // Return if task not found

    // Remove the task from the tasks array
    const tempTask = values.tasks?.splice(index, 1);
    setValues({ ...values, tasks: tempTask });
  };

  // Function to update the completion status of a task
  const updateTask = (id, completed) => {
    const index = values.tasks?.findIndex(item => item.id === id);
    if (index < 0) return; // Return if task not found

    const tempTask = [...values.tasks]; // Create a copy of tasks
    tempTask[index].completed = completed; // Update completion status
    setValues({ ...values, tasks: tempTask }); // Update state
  };

  return (
    <div>
      {/* Modal to display card information */}
      <Modal onClose={() => props.onClose()}>
        <div className="cardinfo">
          {/* Card Title Section */}
          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <Type />
              Title
            </div>
            <div className="box_boady">
              <AddCard
                text={values.title} // Current title
                placeholder="Enter Title"
                className="add_title"
                buttonText="Add Title"
                onSubmit={(value) => setValues({ ...values, title: value })} // Update title on submit
              />
            </div>
          </div>

          {/* Card Description Section */}
          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <List />
              Description
            </div>
            <div className="box_boady">
              <AddCard
                text={values.desc} // Current description
                placeholder="Enter Desc"
                buttonText="Add Desc"
                onSubmit={(value) => setValues({ ...values, desc: value })} // Update description on submit
              />
            </div>
          </div>

          {/* Card Date Section */}
          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <Calendar />
              Date
            </div>
            <div className="box_boady">
              <input
                type="date"
                defaultValue={values.date ? new Date(values.date).toISOString().substr(0, 10) : ""}
                onChange={(e) => setValues({ ...values, date: e.target.value })} // Update date on change
              />
            </div>
          </div>

          {/* Card Assign To Section */}
          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <List />
              Assign to
            </div>
            <div className="box_boady">
              <AddCard
                text={values.toUser} // Current assigned user
                placeholder="Assign to"
                buttonText="Add User"
                onSubmit={(value) => setValues({ ...values, toUser: value })} // Update assigned user on submit
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CardInfo;
