import React, { useEffect, useState } from 'react';
import {
  
  Text,
  
} from '@chakra-ui/react';
import './kanbanboard.css'
import Board from './Board';
import AddCard from './AddCard';

function KanbanBoard() {

  const [boards, setBoards]= useState(JSON.parse(localStorage.getItem('Kanban')) || [
    // {
    //   id:Date.now() + Math.random()*2,
    //   title: "To Do",
    //   cards:[
    //     {
    //       id:Date.now() + Math.random(),
    //       title:"Card1",
    //       tasks:[],
    //       labels:[{
    //         text:"frontend",
    //         color:"blue",
    //       }],
    //       desc:"nothing is here",
    //       date:""
    //     },
    //     {
    //       id:Date.now() + Math.random(),
    //       title:"Card2",
    //       tasks:[],
    //       labels:[{
    //         text:"backend",
    //         color:"red"
    //       }],
    //       desc:"everything is here",
    //       date:""
    //     },
    //   ]
    // }
  ])

  const [target, setTarget] = useState({
    cid:"",
    bid:"",
  })

  // bid is board id

  const addCard = (title, bid) =>{
    const card = {
      id:Date.now() + Math.random(),
      title,
      labels:[],
      tasks:[],
      date:"",
      desc:"",
    }

    const index = boards.findIndex(item => item.id==bid)

    if(index<0) return;

    const tempBoards=[...boards]
    tempBoards[index].cards.push(card);
    setBoards(tempBoards)
  }

  // for removing card

  const removeCard =(cid, bid) =>
  {
    const bIndex = boards.findIndex((item)=> item.id === bid);
    if(bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex((item)=> item.id === cid);
    if(cIndex < 0) return;

    const tempBoards=[...boards];
    tempBoards[bIndex].cards.splice(cIndex,1);
    setBoards(tempBoards);

  }

  const addBoard=(title) =>{
    setBoards([
      ...boards,
      {
        id:Date.now() + Math.random(),
        title,
        cards:[],
      }
    ])
  }

  const removeBoard = (bid) =>{
  const tempBoards = boards.filter((item) => item.id != bid);

  setBoards(tempBoards);
  }


  const handelDragEnter=(cid,bid)=>{
    setTarget({
      cid,
      bid,
    })
  }
  const handelDragEnd=(cid, bid)=>{
    let s_bIndex, s_cIndex, t_bIndex, t_cIndex

    s_bIndex =boards.findIndex(item=> item.id===bid)
    if(s_bIndex<0) return

    s_cIndex=boards[s_bIndex].cards?.findIndex(item=> item.id===cid)
    if(s_cIndex<0) return

    t_bIndex =boards.findIndex(item=> item.id===target.bid)
    if(t_bIndex<0) return

    t_cIndex=boards[t_bIndex].cards?.findIndex(item=> item.id===target.cid)
    if(t_cIndex<0) return


    const tempboards = [...boards]
    const tempcards = tempboards[s_bIndex].cards[s_cIndex]


    tempboards[s_bIndex].cards.splice(s_cIndex,1)
    tempboards[t_bIndex].cards.splice(t_cIndex,0,tempcards)


    setBoards(tempboards);
 
  }

  const updateCard = (cid, bid, card)=>{
    const bIndex = boards.findIndex((item)=> item.id === bid);
    if(bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex((item)=> item.id === cid);
    if(cIndex < 0) return;

    const tempBoards = [...boards]
    tempBoards[bIndex].cards[cIndex] = card;
    setBoards(tempBoards);
  }

  useEffect(()=>{
    localStorage.setItem('Kanban',JSON.stringify(boards))
  }, [boards])

  return (
    <div className='kanbanboard'>
      <div className="kanbanboard_navbar">
      <Text fontSize='4xl' as='b' ml ='8' >Kanban Board</Text>
      </div>

      <div className="kanbanboard_outer">
        <div className="kanbanboard_boards">
          {
            boards.map((item) => <Board
            removeBoard ={removeBoard}
            key={item.id}
            board={item}
            addCard={addCard}
            removeCard={removeCard}
            handelDragEnd ={handelDragEnd}
            handelDragEnter ={handelDragEnter}
            updateCard ={updateCard }
            />)
          }
          <div className="boards_add_board">

          <AddCard
          text="Add Board"
          placeholder = "Enter board title"
          onSubmit ={(value)=> addBoard(value) }
          />
          </div>
        </div>
      </div>

    </div>
  );
}

export default KanbanBoard;
