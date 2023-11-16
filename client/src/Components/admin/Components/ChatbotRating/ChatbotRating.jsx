import { HiTrendingUp } from 'react-icons/hi'
import './chatBotRating.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { MoonLoader } from 'react-spinners'

const ChatbotRating = () => {
  const [rating, setRating] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/feedback/rating`)
        setRating(res.data[0])
        console.log(res.data)
        setLoading(false)
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    }
    fetchData()
  }, [])


  return (
    <div className='chatbotRating__container'>
      <h4 className='chatbotRating__rating'>{loading ? <MoonLoader color="#03335b" size={30}/> : `${Number(rating.TotalRating).toFixed(1)}` }</h4>
      <h3 className='chatbotRating__title'>Rating</h3>
    </div>
  )
}

export default ChatbotRating
