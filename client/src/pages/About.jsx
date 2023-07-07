import React from 'react'
import Header from '../Components/ui/Header'
import headerImage from '../img/header1.jpg'

const About = () => {


  return (
    <div className='about'>
      <Header
        imageUrl = {headerImage}
        title = "About Us"
      />


    </div>
  )
}

export default About
