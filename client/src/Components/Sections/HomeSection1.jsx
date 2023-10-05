import React from 'react'
import TwoSections from './TwoSections'
import Accommodation_Items from '../../pages/Accommodation/Accommodation_Items'
import SectionWithHeading from './SectionWithHeading'

const HomeSection1 = () => {


    return (
        <section className='section-full wrapper'>
            <SectionWithHeading
                main='Escape to Your Perfect Getaway'
                subheading='Welcome to Aqua Cainta Resorts Paradise'
                desc='At Aqua Cainta Resort, we believe in creating more than just vacations; we craft unforgettable staycation experiences. Our pristine haven offers a symphony of relaxation, adventure, and indulgence, making it the ultimate destination for your next retreat.'
            />
            <SectionWithHeading 
                main='Discover Our Oasis'
            />
            <TwoSections
                title="Rooms"
                content="Dip yourself in the perfect blend of comfort and affordability with our meticulously crafted rooms designed to cater to your every need. Whether you're looking for an intimate retreat for a romantic escape or a spacious haven for your family, our accommodations offer a haven of relaxation that's both inviting and budget-friendly"
                images={
                    [
                        `/upload/1695544795142IMG_5986.webp`,
                        `/upload/1695552614728IMG_5967.webp`,
                        `/upload/1696320923569IMG_5979.webp`,

                    ]
                }
            />
            <TwoSections
                inverse={true}
                title="Rejuvenation Haven"
                content="Leave the hustle and bustle of daily life far behind as you immerse yourself in the rejuvenating ambiance of our resort. Our serene surroundings provide the perfect getaway for recharging your mind, body, and soul."
                images={
                    [
                        `/upload/1695544795142IMG_5986.webp`,
                        `/upload/1691649506056Large%20Cottage.webp`,
                        `/upload/16955525828161691565231316Small-cottage.webp`,

                    ]
                }
            />
            {/* <div className='row'>
                <div className='row-title'>
                    <h2>Rooms</h2>
                    <p>Dip yourself in the perfect blend of comfort and affordability with our meticulously crafted rooms designed to cater to your every need. Whether you're looking for an intimate retreat for a romantic escape or a spacious haven for your family, our accommodations offer a haven of relaxation that's both inviting and budget-friendly</p>
                </div>
                <div className='grid-view'>

                </div>
            </div> */}


        </section>
    )
}

export default HomeSection1
