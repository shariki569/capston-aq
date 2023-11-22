import React, { useEffect, useState } from 'react'
import './testimonialSection.scss'
import Slider from '../Slider/Slider'
import axios from 'axios'
import { MoonLoader } from 'react-spinners'
import StarRating from '../../ui/FeedbackForm/StarRating/StarRating'
import SectionWithHeading from '../SectionWithHeading'
// import Slider from "react-slick";
const TestimonialSection = () => {

  const [testimonial, setTestimonial] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/feedback/approved`)
        setTestimonial(res.data)
        setIsLoading(false)
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])



  return (
    <div className='testimonial__container'>
      <SectionWithHeading
        main='Testimonial'
        desc="Welcome to our Testimonial section! This is a space dedicated to sharing the thoughts and experiences of our valued users. Here, you can find a collection of feedback and comments from people who have interacted with our website. Their insights and perspectives provide us with invaluable information that helps us improve and grow. We believe in the power of shared experiences and we’re excited for you to explore what others have to say. Remember, your voice matters too. Feel free to share your own feedback. Thank you for being a part of our community!"
        textColor="White" />,
      {isLoading ? (
        <MoonLoader color="#36d7b7" />
      ) : (

        // <Slider/>
        <Slider>
          {testimonial.map((item) => (
            <div key={item.FeedBack_ID} className='testimonial__item'>
              <div className="testimonial__message">
                <p>{item.FeedBack_Description}</p>
              </div>
              <div className="testimonial__info">
                <div className="testimonial__name">{item.FeedBack_Name}</div>
                <div className="testimonial__rating"><StarRating readOnly={true} totalStars={5} starsSelected={item.FeedBack_Rating} /></div>
              </div>
              {/* <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#03335B" d="M35.6,-54.2C41.2,-44.9,37.5,-27.9,40,-14.4C42.5,-0.8,51.2,9.3,53.5,22C55.7,34.7,51.6,50,41.6,54C31.6,58,15.8,50.7,4.2,44.8C-7.3,39,-14.6,34.6,-23.3,30.2C-32,25.8,-42,21.3,-47,13.5C-51.9,5.7,-51.8,-5.6,-48.8,-16.2C-45.8,-26.9,-40,-37,-31.4,-45.3C-22.8,-53.7,-11.4,-60.4,1.8,-62.9C15,-65.3,29.9,-63.6,35.6,-54.2Z" transform="translate(100 100)" />
              </svg> */}
            </div>
          ))}
        </Slider>
      )}
    </div>
  )
}

export default TestimonialSection

{/* <h1>item1</h1>
<h1>item2</h1>
<h1>item3</h1>
<h1>item4</h1>
<h1>item5</h1>
<h1>item6</h1>
<h1>item7</h1> */}