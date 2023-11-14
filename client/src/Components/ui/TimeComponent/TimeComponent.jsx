import { useEffect, useState } from 'react'
import './timeComponent.scss'
import { BiTimeFive } from "react-icons/bi";

const TimeComponent = () => {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className='time__container'>
      <div><BiTimeFive size={25} /></div>
      <div className='time__text'>
        <h4>{date.toLocaleDateString()}</h4>
        <h4>{date.toLocaleTimeString()}</h4>
      </div>

    </div>
  )
}

export default TimeComponent
