import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
// import { MoonLoader } from 'react-spinners'
// import  './totalFeedback.scss' 
import Container from '../../Container/Container'

const TotalFeedback = () => {
    const [rating, setRating] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
       const fetchData = async () => {
         try {
           const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/feedback/rating`)
           setRating(res.data[0])
           setLoading(false)
         } catch (err) {
           console.log(err)
           setLoading(false)
         }
       }
       fetchData()
    })


  return (
    <>
      <Container title={'Total Feedback'} data={(rating.TotalFeedBack)} loading={loading} />
    </>
  )
}

export default TotalFeedback
