import React from 'react'
import './dashboardChatbotLayout.scss'
import { Outlet } from 'react-router-dom'
import Chatbox from '../../admin/Chatbot/Chatbox.jsx/Chatbox'

const DashboardChatbotLayout = () => {
    return (
        <div className='chatbot__container'>
            <div className='chatbot__leftWrapper'>
                <Outlet />
            </div>
            <div className='chatbot__rightWrapper'>
                <Chatbox />
            </div>
        </div>
    )
}

export default DashboardChatbotLayout
