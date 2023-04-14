import React from 'react'
import { X } from 'react-feather'
import './Chip.css'

const Chips = (props) => {
  return (
    <div className='chip' style={{backgroundColor: props.color}}>
        <p>{props.text}</p> 
        {props.close && ( <X onClick ={()=> (props.onClose ? props.onClose() : "" )}/>)}
    </div>
  )
}

export default Chips