import React from 'react'

const SectionWithHeading = ({subheading, main, desc, textColor}) => {
    const textArea = {color: textColor};
    
    return (
        <div className='centered-heading large-padding-inline-x'>
            {subheading && <h2 style={textArea}>{subheading}</h2>}
            <h4 className='sub-heading' style={textArea}>{main}</h4>
            { desc && <p className='l-font large-line-height' style={textArea}>{desc}</p>}
        </div>
    )
}

export default SectionWithHeading
