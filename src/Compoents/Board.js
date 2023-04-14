import React, { useState } from 'react'
import './Board.css'
import {Trash2} from 'react-feather'
import { Text } from '@chakra-ui/react'
import Card from './Card'
import AddCard from './AddCard'

const Board = (props) => {

  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <div className='board'>
        <div className="board_top">
        <Text fontSize='3xl'> 
        <p className="board_top_title"> {props.board?.title} </p></Text>

            <div className="board_top_more" onClick={() => setShowDropDown(true)}>

              <Trash2 onClick={()=> props.removeBoard(props.board?.id)}/>

            </div>

        </div>

        <div className="board_cards">

          {props.board?.cards?.map((item)=>(
              <Card key={item.id}
              card={item} 
              removeCard={props.removeCard} boardID ={props.board?.id}
              handelDragEnd={props.handelDragEnd}
              handelDragEnter={props.handelDragEnter}
              updateCard ={props.updateCard}
              />
            ))}
            <AddCard 
            displayClass="board_cards_add"
            text="Add Card"
            placeholder ="Enter Card Title"
            onSubmit ={(value) => props.addCard(value, props.board?.id)}
          
            
            />
        </div>
    </div>
  )
}

export default Board