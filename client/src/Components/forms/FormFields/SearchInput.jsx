import React from 'react'
import { BiSearch } from 'react-icons/bi'
import TextInput from './TextInput'

const SearchInput = ({placeholder, iconSize, value, onChange, onClick}) => {
  return (
    <div className='component__searchBar'>
        <div className="component__searchIcon" >
          < BiSearch size={iconSize} onClick={onClick}/>
        </div>
        <div className='component__searchInput'>
          <TextInput placeholder={placeholder} value={value} onChange={onChange}/>
        </div>
      </div>
  )
}

export default SearchInput
