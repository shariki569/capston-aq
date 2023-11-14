import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
// import TextInput from '../Components/forms/FormFields/TextInput'
import { BiLogoFacebook, BiLogoGmail } from "react-icons/bi";
import { MoonLoader } from 'react-spinners';
const Login = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    loading: false
  })

  const [err, setError] = useState(null)

  const navigate = useNavigate()

  const { login } = useContext(AuthContext);

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setInputs(prev => ({ ...prev, loading: true }));
    try {
      await login(inputs)
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    } finally {
      setInputs(prev => ({ ...prev, loading: false }));
    }
  }


  return (
    <div className='auth'>
      <h1>Login</h1>
      <form action="">

        <input required type="text" placeholder='Username' name='username' onChange={handleChange} />
        <input required type="password" placeholder='Password' name='password' onChange={handleChange} />
        <button className='btn ' onClick={handleSubmit} disabled={inputs.loading}>
         {
          inputs.loading ? <MoonLoader size={20}/> : "Login"
         }
        </button>
        {err && <p>{err}</p>}
        <span>Don't you have an account?<Link to="/register"> Register</Link></span>
      </form>
      <div className="alternative">
        <p>Or Login With</p>
        <div className="icons">
          <button className="facebook">
            <BiLogoFacebook size={20} />
            Facebook
          </button>
          <button className="google">
            <BiLogoGmail className='icon' size={20} />
            Google
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
