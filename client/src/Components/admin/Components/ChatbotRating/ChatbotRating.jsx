import { HiTrendingUp } from 'react-icons/hi'
import './chatBotRating.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'

const ChatbotRating = () => {
  const  [rating, setRating] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const data = axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/feedback`)
    }
  })
  return (
    <div className='chatbotRating__container'>
      <h4 className='chatbotRating__rating'> <span><HiTrendingUp size={30} /></span>4.35% </h4>
      <h3 className='chatbotRating__title'> Chatbot Rating</h3>
    </div>
  )
}

export default ChatbotRating
