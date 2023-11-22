import React from 'react'
import './faqs.scss'
import Header from '../../Components/ui/Header'
import ScrollToTop from '../../Components/Hoc/ScrollToTop'
import SEO from '../../Components/SEO/SEO'
import imageFaq from '../../img/FAQs Header.webp'
import SectionWithHeading from '../../Components/Sections/SectionWithHeading'
import { faqsItems } from './faqsItems'
const FAQs = () => {

  // const firstHalf = faqsItems.slice(0, 6)
  // const secondHalf = faqsItems.slice(6, 11)



  // console.log(secondHalf)

  // console.log(firstHalf)
  return (
    <>
      <SEO
        title="FAQs | Aqua Cainta Resort"
        type="webiste"
        name="Aqua Cainta Resort"
      />
      <div className='faqs'>
        <Header
          title="FAQ's"
          small={true}
          imageUrl={imageFaq}
        />
        <div className='faqs__container'>
          <SectionWithHeading
            main="Frequently Asked Questions"
            subheading="Aqua Cainta Resort"
          />
          <div className='faqs__list'>

            <ol type="1" className='faqs__left'>
              {faqsItems.map((item) => (
                <li key={item.id}>
                  {item.question}
                  <ul>
                    <li>
                      {item.answer}
                    </li>
                  </ul>
                </li>
              ))
            }
            </ol>
            {/* <li>Can we bring our pets to Aqua Cainta Resort?</li>
              <li>Is there Wi-Fi at the resort? How is the cellular signal at the resort?</li>
              <li>How do we make a reservation?</li>
              <li>Can we bring our own food inside?</li> */}
{/* 
            <ol type='7' className='faqs__right'>
             {secondHalf.map((item) => (
                <li key={item.id}>
                  {item.question}
                  <ul>
                    <li>
                      {item.answer}
                    </li>
                  </ul>
                </li>
              ))
            }
            </ol> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default ScrollToTop(FAQs)
