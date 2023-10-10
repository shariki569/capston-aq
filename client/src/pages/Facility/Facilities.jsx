import React from 'react'
import Header from '../../Components/ui/Header'
import headerImage from '/upload/387577234_1355996281988666_1495644695872826884_n.jpg'
import SectionWithHeading from '../../Components/Sections/SectionWithHeading'
import TwoSectionsWithGallery from '../../Components/Sections/TwoSectionsWithGallery'

const Facilities = () => {
  return (
    <>
      <Header
        imageUrl={headerImage}
        title='Facilities'
      />
      <div className='wrapper'>
        <SectionWithHeading main="Explore Our Facilities" />
          <TwoSectionsWithGallery/>
      </div>
    </>
  )
}

export default Facilities
