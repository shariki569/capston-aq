import React, { useEffect, useState } from 'react'
import PostHeading from '../../Components/PostComponents/PostHeading'
import PostItems from '../Posts/PostItems'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pagination from '../../Components/ui/Pagination/Pagination';

const CategoryPost = () => {
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search)
    const page = Number(searchParams.get('page')) || 1;
    const cat = searchParams.get('cat');
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Corrected URL construction with '?' before 'page'
                const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/posts/?cat=${cat}&page=${page}&limit=3`);
                setPosts(res.data.posts);
                setTotalPages(res.data.totalPages);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [cat, page]);

    const handlePrev = () => {
        if (page > 1) {
            const prevPage = page - 1;
            // Corrected navigation to include '?' before 'page'
            navigate(`/category/?cat=${cat}&page=${prevPage}`);
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            const nextPage = page + 1;
            // Corrected navigation to include '?' before 'page'
            navigate(`/category/?cat=${cat}&page=${nextPage}`);
        }
    };
    return (
        <div className='posts'>
            <PostHeading
                title={'Category'}
            />
            <div className="post__container">
                <div className="left">
                    <PostItems posts={posts} />
                    <Pagination page={page} totalPages={totalPages} next={handleNext} prev={handlePrev} />
                </div>
                <div className="right">

                </div>
            </div>


        </div>
    )
}

export default CategoryPost
