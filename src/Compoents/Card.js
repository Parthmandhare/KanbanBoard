import { Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { CheckSquare, Clock, Trash2 } from 'react-feather';
import './Card.css';
import CardInfo from './CardInfo';
import Chips from './Chips';

const Card = (props) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const[showModal, setModal] = useState(false)

  return (
    <>
    {
        showModal && <CardInfo 
        updateCard ={props.updateCard}
        boardID = {props.boardID}
        card={props.card}
        onClose={()=>setModal(false)}/>
      }
      
    <div className="card" draggable
    onDragEnd={()=> props.handelDragEnd(props.card?.id, props.boardID)}
    onDragEnter={()=> props.handelDragEnter(props.card?.id, props.boardID)}
    onClick={()=> setModal(true)}
    >
      <div className="card_top">
        <div className="card_labels">
          {props.card?.labels?.map((item, index) => (
            <Chips key={index} text={item.text} color={item.color} />
          ))}
        </div>
        <div className="card_top_more" onClick={() => setShowDropDown(true)}>
          <Trash2 onClick={()=> props.removeCard(props.card?.id,props.boardID )}/>
        </div>
      </div>

      <div className="card_title">
        <Text>{props.card?.title}</Text>
      </div>
      <div className="card_footer">
        {props.card?.date && (
          <p>
            <Clock />
            <Text>{props.card?.date}</Text>
          </p>
        )}

        {
          props.card?.tasks?.length>0 &&
          (<p>
          <CheckSquare />
          <Text>{props.card?.tasks?.filter(item=>item.completed).length}/{props.card?.tasks?.length}</Text>
        </p>)}
      </div>
    </div>
    </>
  );
};

export default Card;
