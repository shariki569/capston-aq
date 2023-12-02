import React from 'react'
import './faqs.scss'
import Header from '../../Components/ui/Header'
import ScrollToTop from '../../Components/Hoc/ScrollToTop'
import SEO from '../../Components/SEO/SEO'
import imageFaq from '../../img/FAQs Header.webp'
import SectionWithHeading from '../../Components/Sections/SectionWithHeading'
import { faqsItems } from './faqsItems'
const FAQs = () => {
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
          </div>
        </div>
      </div>
    </>
  )
}

export default ScrollToTop(FAQs)
