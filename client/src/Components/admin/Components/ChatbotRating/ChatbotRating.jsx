import { HiTrendingUp } from 'react-icons/hi'
import './chatBotRating.scss'

const ChatbotRating = () => {
  return (
    <div className='chatbotRating__container'>
      <h4 className='chatbotRating__rating'> <span><HiTrendingUp size={30} /></span>4.35% </h4>
      <h3 className='chatbotRating__title'> Chatbot Rating</h3>
    </div>
  )
}

export default ChatbotRating
