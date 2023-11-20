import React from 'react'
import TwoSections from './TwoSections'
//images
import home2 from '../../img/Home/home2.webp'
import home1 from '../../img/Home/home_1.jpg'
import home3 from '../../img/Home/home3.webp'
import home4 from '../../img/Home/home4.webp'
//images
import Accommodation_Items from '../../pages/Accommodation/Accommodation_Items'
import SectionWithHeading from './SectionWithHeading'

const HomeSection1 = () => {


    return (
        <section className='section-full wrapper'>
            <SectionWithHeading
                main='Escape to Your Perfect Getaway'
                subheading='Welcome to Aqua Cainta Resorts Paradise'
                desc='At Aqua Cainta Resort, we believe in creating more than just vacations; we craft unforgettable staycation experiences. Our pristine haven offers a symphony of relaxation, adventure, and indulgence, making it the ultimate destination for your next retreat.'
                background={true}
            />
            <SectionWithHeading
                main='Discover Our Oasis'
            />

            <TwoSections
                title="Rooms"
                content="Dip yourself in the perfect blend of comfort and affordability with our meticulously crafted rooms designed to cater to your every need. Whether you're looking for an intimate retreat for a romantic escape or a spacious haven for your family, our accommodations offer a haven of relaxation that's both inviting and budget-friendly"
                images={
                    [
                        home2,
                        home1,
                        home3,

                    ]
                }
                background={true}
            />
            <TwoSections
                inverse={true}
                title="Rejuvenation Haven"
                content="Leave the hustle and bustle of daily life far behind as you immerse yourself in the rejuvenating ambiance of our resort. Our serene surroundings provide the perfect getaway for recharging your mind, body, and soul."
                images={
                    [
                        `/upload/1691565564092Accomodation-Header.jpeg`,
                        home4,
                        `/upload/16955525828161691565231316Small-cottage.webp`,

                    ]
                }
                background={true}
            />


        </section>
    )
}

export default HomeSection1
