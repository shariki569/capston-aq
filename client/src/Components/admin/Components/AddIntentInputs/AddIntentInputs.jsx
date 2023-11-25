import React from 'react'
import './addIntentinput.scss'
import TextInput from '../../../forms/FormFields/TextInput'
import { BiReply } from 'react-icons/bi'

const AddIntentInputs = ({searchPlaceholder, label, value, onChange, handleButton}) => {
  return (
    <div className='addIntent__InputContainer'>
      <div className='addIntent__Input'>
        <TextInput
          onChange={onChange}
          placeholder='Type Dialogue'
          label={label}
          value={value}
          containerClass={'addIntent__InputField'}
        />
        <button onClick={handleButton} className='addIntent__Btn'><BiReply size={25} /></button>
      </div>
      <div className='addIntent__Search'>
        <TextInput placeholder={searchPlaceholder} />
      </div>
    </div>
  )
}

export default AddIntentInputs
