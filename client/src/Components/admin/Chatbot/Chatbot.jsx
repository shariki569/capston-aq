import React from 'react'
import './chatbot.scss'

// import Chatbox from './Chatbox'
import Chatbox from './Chatbox.jsx/Chatbox.jsx'
import { Link } from 'react-router-dom'
import Intents from './Intents/Intents.jsx'
import { BiCommentAdd } from 'react-icons/bi'


const Chatbot = () => {
    return (
        <>
            <div className='chatbot__header'>
                <h1>AquaBot</h1>
                <Link to='add-intent' className='btn'><BiCommentAdd size={20} />Create Intent</Link>
            </div>
            <div className='chatbot__Intent'>
                <Intents />
            </div>
        </>
    )
}

export default Chatbot
