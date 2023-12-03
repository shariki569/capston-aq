import React from 'react'
import './profile.scss'
import ImageUploader from '../../util/ImageUploader'
import TextInput from '../../forms/FormFields/TextInput'

const Profile = () => {


  
  return (
    <div>
      <h2>User Profile</h2>
      <div className='profile__container'>
        <div className='profile__image'>
          <ImageUploader/>  
        </div>
        <div className='profile__details'>
            <TextInput
              placeholder='Username'
              label='Username'
            />
             <TextInput
              placeholder='Email'
              label='Email'
            />
          </div>
      </div>

    </div>
  )
}

export default Profile
