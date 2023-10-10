import React from 'react'
import headerImage from '/upload/387577234_1355996281988666_1495644695872826884_n.jpg'
const TwoSectionsWithGallery = () => {
    return (
        <div className='two-sections-container h-60'>
            <div className='image-container'>
                <div className="image-wrapper">
                    <img src={headerImage} alt="" />
                </div>
            </div>
            <div className="content-wrapper">
                <div className="content">
                    <h4 className='xxl-font'>Grilling</h4>
                    <p>Unleash your inner grill master in our well-equipped grilling area, perfect for delicious outdoor feasts.</p>
                </div>
            </div>
        </div>
    )
}

export default TwoSectionsWithGallery
