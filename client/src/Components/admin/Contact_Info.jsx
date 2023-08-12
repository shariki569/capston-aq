import React from 'react'
import TextInput from '../forms/FormFields/TextInput'

const Contact_Info = () => {
  return (
    <div className='add'>
        <div className="content">
            <TextInput
                type='text'
                placeholder='Email'
            />
            <TextInput
                type='number'
                placeholder='Cel No.'
            />
            <TextInput
                type='text'
                placeholder='Email'
            />
            
        </div>
    </div>
  )
}

export default Contact_Info
