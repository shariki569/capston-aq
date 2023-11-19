import { HiTrendingUp } from 'react-icons/hi'
// import './chatBotRating.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { MoonLoader } from 'react-spinners'
import StarRating from '../../../ui/FeedbackForm/StarRating/StarRating'
import Container from '../Container/Container'

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
  // const roundedRating = Math.round(parseFloat(rating.TotalRating));
  // console.log(roundedRating)
  return (
    <>
      <Container title='Rating' data={Number(rating.TotalRating).toFixed(1)} loading={loading} />
    </>
  )
}

export default ChatbotRating
