import React, { useContext, useState } from 'react'
import './adminNav.scss'
import { AuthContext } from '../../../context/authContext'
import { FiChevronDown, FiLogOut, FiUser } from 'react-icons/fi'
const AdminNav = () => {
  const { currentUser } = useContext(AuthContext)
  const [showDropdown, setShowDropdown] = useState(false)

  const handleClick = () => {
    setShowDropdown(!showDropdown)
  }

  return (
    <div className='admin__nav__container'>
      <div className="admin__nav__user">
        <div onClick={handleClick} className="admin__nav__imageWrap">
          {currentUser?.img ? (<img src={currentUser?.img} alt="" />) : (<img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' alt="" />)}
        </div>

        <div className={showDropdown ? 'admin__nav__dropdown active' : 'admin__nav__dropdown'}>
          <h3 className='admin__nav__username'>{currentUser?.username}</h3>
          <ul>
            <li><FiUser />Profile</li>
            <li><FiLogOut />Logout</li>
          </ul>
        </div>
        {/* <h2>{currentUser?.username}</h2> */}
      </div>
    </div>
  )
}

export default AdminNav
