import React from 'react'

import Feedback from './components/Feedback'
// import Chatbox from './Chatbox'
import Chatbox from './components/Chatbox.jsx'
import { Link } from 'react-router-dom'
import RatingsComponent from '../../ui/RatingsComponent'

const Chatbot = () => {
    return (
        <div className='chatbot__container'>
            <div className='chatbot__leftWrapper'>
                <div className='chatbot__header'>
                    <h1>Live Chatbot</h1>
                    <Link className='btn'>Train Chatbot</Link>
                </div>
                <RatingsComponent />
                <Feedback />
            </div>
            <div className='chatbot__rightWrapper'>
                <Chatbox />
            </div>
        </div>
    )
}

export default Chatbot
