import React, { useContext, useEffect, useState } from 'react'
import './totalUserPosts.scss'
import axios from 'axios'
import { AuthContext } from '../../../../context/authContext';
import Container from '../Container/Container';

const TotalUserPosts = () => {
    const {currentUser} = useContext(AuthContext);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true)
              const res =  await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/posts/count/${currentUser.id}`)
                setCount(res.data.posts)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()

    },[])

    return (
        <>
            <Container title='Posts' data={count} loading={loading}/>
        </>
    )
}

export default TotalUserPosts
