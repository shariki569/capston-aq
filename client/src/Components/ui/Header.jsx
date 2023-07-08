import React from 'react'
// import EditableText from '../util/EditableText'

const Header = ({imageUrl, title}) => {
  
 return (
    <div className='header'>
        <picture>
            <source srcSet={`${imageUrl}`} />
            <img className="header-background" src={`${imageUrl}`} alt="" />
        </picture>
        <div className='header-title'>
            <h1>{title}</h1>
            
        </div>
    </div>
  )
}

export default Header
