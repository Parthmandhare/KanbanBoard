import React, { useEffect, useState } from 'react'
import { Calendar, CheckSquare, List, Tag, Trash, Type } from 'react-feather'
import "./CardInfo.css"
import Modal from './Modal'
import AddCard from './AddCard'
import Chips from './Chips'

const CardInfo = (props) => {
  const colors = [
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
  ];

  const [activeColor, setActiveColor] = useState("");

  const {title, labels, desc, date, tasks} = props.card

  const [values, setValues] = useState({...props.card})

  const calPercent = ()=>{
    if (!values.tasks?.length) return 0;
    const completed = values.tasks?.filter((item) => item.completed)?.length;
    return (completed / values.tasks?.length) * 100;
  }

  useEffect(()=>{
    props.updateCard(props.card.id,props.boardID,values )
  },[values])

  const addLabel = (value, color)=>{
    const index = values.labels?.findIndex(item=>item.text===value);
    if(index>-1) return

    const label ={
      text: value,
      color
    }
    setValues({...values, labels: [...values.labels,label]})
    setActiveColor("")
  }

  const removeLabel =(text) =>{

    const templabels = values.labels?.filter(item=>item.text!==text)

    setValues({...values, labels: templabels})
  }

  const addTask = (value) =>{
    const task = {
      id: Date.now() + Math.random(),
      text: value,
      completed: false
    }

    setValues({...values, tasks:[...values.tasks, task]})
  }

  const removeTask = (id) =>{
    const index = values.tasks?.findIndex(item =>item.id === id)
    if(index<0) return

    const tempTask = values.tasks?.splice(index,1)
    setValues({...values, tasks:tempTask})
  }

  const updateTask = (id, completed)=>{
    const index = values.tasks?.findIndex(item =>item.id === id)
    if(index<0) return

    const tempTask = [...values.tasks]
    tempTask[index].completed = completed;
    setValues({...values, tasks: tempTask})
  }

  return (
    <div>
        <Modal onClose={()=>props.onClose()}>
            <div className="cardinfo">
               <div className="cardinfo_box">
                <div className="cardinfo_box_title">
                  <Type/>
                  Title
                </div>
                <div className="box_boady">
                <AddCard
                text={values.title}
                placeholder="Enter Title"
                className="add_title"
                buttonText="Add Title"
                onSubmit ={(value)=> setValues({...values, title:value})}
                />
                </div>
               </div>


               <div className="cardinfo_box">
                <div className="cardinfo_box_title">
                  <List/>
                  Description
                </div>
                <div className="box_boady">
                <AddCard
                text={values.desc}
                placeholder="Enter Desc"
                buttonText="Add Desc"
                onSubmit ={(value)=> setValues({...values, desc:value})}
                />
                </div>
               </div>


               <div className="cardinfo_box">
                <div className="cardinfo_box_title">
                  <Calendar/>
                  Date
                </div>
                <div className="box_boady">
                <input type="date" defaultValue={values.date ? new Date(values.date).toISOString().substr(0,10): ""}
                onChange={(e)=> 
                setValues({...values, date:e.target.value})}
                />
                </div>
               </div>


               <div className="cardinfo_box">
                <div className="cardinfo_box_title">
                  <Tag/>
                  Lable
                </div>

                <div className="labels">
                  {
                    values.labels?.map((item,index)=> 
                    <Chips close onClose={()=> removeLabel(item.text)} key={item.text + index} 
                    color={item.color}
                    text={item.text}
                    />)
                  }
                </div>

                <div className="colors">
                  {
                    colors.map((item,index)=>
                    <li key={index} style={{backgroundColor: item}}
                    className={item===activeColor?"active": ""}
                    onClick={()=>setActiveColor(item)}
                    
                    >
                    
                  </li>)
                  }
                
                </div>
                <div className="box_boady">
                <AddCard
                text="Add Label"
                placeholder="Enter Label Name"
                buttonText="Add Label"
                onSubmit={(value)=> addLabel(value,activeColor)}
                />
                </div>
               </div>


               <div className="cardinfo_box">
                <div className="cardinfo_box_title">
                  <CheckSquare/>
                  Task
                </div>

                <div className="progress_bar">
                  <div className="progress" style={{width: `${calPercent()}%`}}/>
                </div>

                  <div className="task_list">

                  {
                    values.tasks?.map((item)=> 
                    <div className="task" key={item.id}>
                    <input type="checkbox" defaultChecked={item.completed}
                    onChange={(e)=> updateTask(item.id, e.target.checked)}
                    />
                    <p>{item.text}</p>
                    <Trash onClick={()=>removeTask(item.id)}/>
                  </div>)
                  }
                </div>  

                <div className="box_boady">
                <AddCard
                text="Add New Task"
                placeholder="Enter Task"
                buttonText="Add Task"
                onSubmit ={(value)=>addTask(value)}
                />
                </div>
               </div>

            </div>
        </Modal>
    </div>
  )
}

export default CardInfo