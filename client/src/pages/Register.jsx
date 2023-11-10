import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import TextInput from '../Components/forms/FormFields/TextInput'

const Register = () => {
  const [inputs, setInputs] = useState({
    username:"",
    password:"",
    email:"",

  })
  
const [err, setError] = useState(null)

const navigate = useNavigate()

const handleChange = e =>{
  setInputs(prev=> ({...prev, [e.target.name]: e.target.value}))
}

const handleSubmit = async e =>{
  e.preventDefault()
  try {
    
    await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/auth/register`, inputs)
    navigate("/login");
  } catch (err) {
    setError(err.response.data);
  }
}


  return (
    <div className='auth'>
      <h1>Register</h1>
      <form>
        <TextInput required type="text" placeholder='Username' name='username' onChange={handleChange}/>
        <TextInput required type="email" placeholder='Email' name='email' onChange={handleChange}/>
        <TextInput required type="password" placeholder='Password' name='password' onChange={handleChange}/>
        <button className='btn' onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>Do you you have an account?<Link to="/Login"> Login</Link></span>
      </form>
    </div>
  )
}

export default Register
