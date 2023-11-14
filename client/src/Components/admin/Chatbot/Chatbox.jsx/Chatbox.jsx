import React from 'react'
import './chatBox.scss'
import { BiBot } from "react-icons/bi";
const Chatbox = () => {
  return (
    <div className='chatbox__container'>
      <div className='chatbox__header'>
        <div className='chatbox__train'>
          <button className='btn'>
            <h3><BiBot size={20} />Train</h3>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chatbox
