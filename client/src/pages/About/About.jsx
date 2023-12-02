import React, { useEffect, useState } from 'react'

import headerImage from '../../img/header1.jpg'
import { useAboutPageData } from '../../API/fetchPage'
import TwoSections from '../../Components/Sections/TwoSections'
import SEO from '../../Components/SEO/SEO'
import Header from '../../Components/ui/Header'
import AboutSections from './AboutSections/AboutSections'
import SectionWithHeading from '../../Components/Sections/SectionWithHeading'
import ScrollToTop from '../../Components/Hoc/ScrollToTop'
import Modal from '../../Components/ui/Modal/Modal'

const About = () => {

  const [openModal, setOpenModal] = useState(false)
  const missionVision = [
    {
      title: "Mission",
      description: " At Aqua Cainta Resort, we're the heart of community connection, offering an affordable haven for diverse souls. Through warm hospitality and top-notch facilities, we create memorable, inclusive experiences, upholding values of authenticity, compassion, and excellence."
    },
    {
      title: "Vision",
      description: "At Aqua Cainta Resort, our vision is to be the go-to destination for genuine connection, relaxation, and rejuvenation. We aspire to create a diverse haven where camaraderie blends with cool waters, forming an unforgettable tapestry of shared experiences. Guided by innovation, inclusivity, and unity, we aim to be a beacon of joy, leaving an indelible mark on every visitor's heart"
    }
  ]

  const { pageData } = useAboutPageData()

  const handleClick = () => {
    setOpenModal(!openModal)
  }

  return (
    <>
      <SEO
        title='About Us | Aqua Cainta Resort'
        name="Aqua Cainta Resort"
        type="website"
        hashtag="#AquaCaintaResort"
        image={headerImage}
        quote="About Us" />
      <div className='about'>
        <div>
          <Header
            small
            imageUrl={headerImage}
            title='About Us'
          />

            {pageData?.map((section) => (
              <AboutSections key={section.About_Id}
                image={section.About_Img.startsWith('http') ? section.About_Img : `/upload/${section.About_Img}`}
                title={section.About_Heading}
                text={section.About_Content}
              />

            ))}
            {/* {pageData.sections.map((section) => (
                <TwoSections

                  key={section.SectionId}
                  title={section.SectionHeading}
                  content={section.SectionContent}
                  images={
                    [
                      `/upload/${section.SectionImage}`,

                    ]
                  }
                />
              ))} */}
          </div>
  


        <div className='about__misvis'>
          <SectionWithHeading main="Mission and Vision" textColor='#faf7f7' />
          <div className='about__misvis__content'>
            {missionVision.map((item, index) => (
              <div className='about__item' key={index}>
                <h1>{item.title}</h1>
                <p>
                  {item.description}
                </p>
              </div>
            ))
            }
          </div>
        </div>
        <div className='about__rules'>
          <SectionWithHeading main="Pool Rules and Regulations" />
          <div className='about__rules__content'>
            <div className='about__rules__image'>
              <img src={headerImage} alt="" />
            </div>
            <button onClick={handleClick} className='btn btn-about-us'>View Rules</button>
            {openModal && (
              <Modal closeModal={handleClick}>
                <div className='modal__about'>
                  <SectionWithHeading main="Pool Rules and Regulations" />
                  <div className='modal__desc'>

                    <strong style={{ fontSize: '18px', marginBlock: '10px'}}>Please do the following:</strong>

                    <ul>
                      <li>
                        STAY AT HOME IF YOU DON'T FEEL WELL AND IF SOMEONE IN YOUR HOUSEHOLD IS NOT FEELING WELL.
                      </li>
                      <li>PAY FIRST BEFORE GOING INSIDE THE PREMISES.</li>
                      <li>WEAR APPROPRIATE SWIMMING ATTIRE. NO MAONG SHORTS OR ZIPPERIZED SHORTS</li>
                      <li>SHOWER BEFORE YOU SWIM.</li>
                      <li>PREVENT POOL FOULING.</li>
                      <li>STAY 2 METERS AWAY FROM PEOPLE.</li>
                      <li>WEAR FACE COVERING WHEN NOT IN THE WATER.</li>
                      <li>WASH YOUR HANDS OFTEN.</li>
                      <li>BRING YOUR ALCOHOL, HAND SANITIZERS, AND OTHER ESSENTIAL NEEDS.</li>
                      <li>COVER YOUR COUGHS AND SNEEZES.</li>
                      <li>TABLES/COTTAGES ARE GOOD FOR 10 PERSON(S) ONLY.</li>
                      <li><strong>NO SMOKING</strong>  AND <strong>VAPING</strong>.</li>
                      <li><strong>NO LITTERING.</strong> </li>
                      <li>FIXED CORKAGE FEE OF  &#8369;500.00 FOR DRINKS.</li>
                      <li>NO DRINKS, FOOD, PLASTIC BOTTLES OR GLASSWARE IN THE POOL OR ON POOL DECK.</li>
                      <li>INTOXICATED AND UNRULY GUEST WILL BE ASKED TO BE REPRIMANDED BY COMPANY, OR LEAVE THE PREMISES.</li>
                      <li>NO ANIMALS OR PETS IN POOL OR ON POOL DECK.</li>
                      <li>NO DIVING AND RUNNING.</li>
                      <li>NO PEEING ON POOL, RESTROOMS ARE PROVIDED.</li>
                      <li>NO SPITTING, SPOUTING, OR BLOWING OF NOSE IN THE POOL IS PROHIBITED.</li>
                      <li>NO SHOUTING.</li>
                      <li>NO BOISTEROUS, HORSEPLAY, OR ROUGH PLAY.</li>
                      <li>CHILDREN UNDER THE AGE OF 15 YEARS OLD SHALL NOT USE POOL WITHOUT A PARENT OR ADULT GUARDIAN IN ATTENDANCE.</li>
                      <li>BE CAREFUL, WATCH YOUR STEPS ON SLIPPERY AREAS.
                      </li>
                    </ul>
                    <p className='s-margin-y'>
                      TAKING ANYTHING FROM THE PROPERTY, ANY PHYSICAL DAMAGES OF MANAGEMENT'S PROPERTY DONE BY GUEST AND COMPANY WILL BE PAID ACCORDINGLY, AND WITH THE PREROGATIVE OF MANAGEMENT'S EVALUATION ON THE VALUE OR AMOUNT OF THE SAID DAMAGED ITEM.
                    </p>
                    <p className='s-margin-y'>
                      GUEST FULLY UNDERSTAND THAT DESPITE THE BEST DILIGENCE EXPELLED BY AQUA CAINTA RESORT, THE MANAGEMENT CANNOT ASSURE YOUR COMPLETE SAFETY AT ALL TIMES.
                    </p>
                    <p className='s-margin-y'>
                      HENCE, WE COMMIT TO STRICTLY ABIDE AND OBSERVE AQUA CAINTA RESORT RULES AND GUIDELINES.
                    </p>
                    <p className='s-margin-y'>
                      AQUA CAINTA RESORT WILL NOT BE HELD RESPONSIBLE OR RELIABLE FOR ANY LOST OR DAMAGE AND THEFT TO PERSONAL PROPERTY.
                    </p>








                  </div>
                </div>
              </Modal>
            )

            }
          </div>
        </div>
      </div>


      {/* <TwoSections title="Mission" content="Our mission is to provide exceptional service to our guests and clients, bringing them to life through our exceptional resort."/> */}
    </>

  )
}

export default ScrollToTop(About)
