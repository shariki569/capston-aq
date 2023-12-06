import React, { useContext, useEffect, useState } from 'react'
import './profile.scss'
import ImageUploader from '../../util/ImageUploader'
import TextInput from '../../forms/FormFields/TextInput'
import axios from 'axios'
import { toast } from 'sonner'
import { AuthContext } from '../../../context/authContext'
import { upload } from '../../../Hooks/imageHandling'
import { MoonLoader } from 'react-spinners'
const Profile = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [profile, setProfile] = useState(null)
  const [image, setImage] = useState(profile?.img || '')
  const [email, setEmail] = useState(profile?.email || '')
  const [name, setName] = useState(profile?.display_name || '')
  const [username, setUsername] = useState(profile?.username || '')
  const [previewImage, setPreviewImage] = useState(null)
  const [file, setFile] = useState(null)
  const { currentUser } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/users/${currentUser.id}`)
        setProfile(res.data[0])
        setEmail(res.data[0].email)
        setName(res.data[0].display_name)
        setUsername(res.data[0].username)
        setImage(res.data[0].img)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])


  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));

    }
  }


  const removeSelectedImage = () => {
    setFile(null);
    setPreviewImage(null);
  }


  const handleUpdate = async (e) => {
    e.preventDefault()
    const imgUrl = file ? await upload(file) : image;
    try {
      setLoading(true)
      await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/api/users/${currentUser.id}`, {
        display_name: name,
        username: username,
        email: email,
        img: file ? imgUrl : image,
      }, {
        withCredentials: true
      })
      toast.success('Profile updated')
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred';
      toast.error(errorMessage);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className='profile__heading'>
        <div>
          <h2>User Profile</h2>
        </div>
      </div>

      <div className='profile__container'>
        <div className='grid1'>
          <ImageUploader
            file={file}
            existingImage={image}
            previewImage={previewImage}
            handleImageChange={handleImageChange}
            removeSelectedImage={removeSelectedImage}
          />
        </div>
        <div className='grid2'>
          <TextInput
            placeholder='Name'
            label='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            placeholder='Username'
            label='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextInput
            placeholder='Email'
            label='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className='profile__btn'>
          {loading ?
            <button className='btn_flat flat_success flat_loading'><MoonLoader size={20} />Saving...</button> :
            <button onClick={handleUpdate} className='btn_flat flat_success'>Save</button>
          }
          </div>
        </div>

        <div className='grid3'>
       
        </div>
        <div className='grid4'>
         
        </div>
        <div className='grid5'>

        </div>
      </div>


    </div>
  )
}

export default Profile
