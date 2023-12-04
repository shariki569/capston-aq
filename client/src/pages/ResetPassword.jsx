import React from 'react'
import TextInput from '../Components/forms/FormFields/TextInput'

const ResetPassword = ({ onChangePassword, onChangeConfirmPassword, handleSubmit, err, password, confirmPassword }) => {



  return (
    <>
      <div className="reset-password-form">
        <TextInput
          type='password'
          placeholder='Password'
          label='Password'
          onChange={onChangePassword}
          value={password}
        />
        <TextInput
          type='password'
          placeholder='Confirm Password'
          label='Confirm Password'
          onChange={onChangeConfirmPassword}
          value={confirmPassword}
        />
        {err && <p>{err}</p>}
        <div className="form-footer">
          <button onClick={handleSubmit} className="btn btn-full">Reset Password</button>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
