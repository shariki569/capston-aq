import React from 'react'
import RatingsComponent from './components/RatingsComponent'
import Feedback from './components/Feedback'
// import Chatbox from './Chatbox'
import Chatbox from './components/Chatbox.jsx'

const Chatbot = () => {
    return (
        <div className='chatbot__container'>
            <div className='chatbot__wrapper'>
                <div className='chatbot__header'>
                    <h1>Live Chatbot</h1>
                    <Link>Train Chatbot</Link>
                </div>

                <RatingsComponent />
                <Feedback />
            </div>
            <div className='chatbot__wrapper'>
                <Chatbox />
            </div>
        </div>
    )
}

export default Chatbot
