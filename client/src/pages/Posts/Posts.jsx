import axios from "axios";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../../Components/ui/Header";
import Skeleton from "react-loading-skeleton";
import PostHeading from "../../Components/PostComponents/PostHeading";
import PostItems from "./PostItems";
import ScrollToTop from "../../Components/Hoc/ScrollToTop";
import SEO from "../../Components/SEO/SEO";
import { Menu } from "../../Components";
import Pagination from "../../Components/ui/Pagination/Pagination";
import { usefetchPost } from "../../API/fetchPost";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const searchParams = new URLSearchParams(location.search)
 
  const navigate = useNavigate();
  const page = Number(searchParams.get('page')) || 1;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/posts/?page=${page}&limit=3`);
        setPosts(res.data.posts);
        console.log(res.data);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [ page]);

  const handlePrev = () => {
    if (page > 1) {
      const prevPage = page - 1
      navigate(`?page=${prevPage}`)
    } // decrement page number (for previous button to work) and navigate to new page (with updated query stringp)
  }
  const handleNext = () => {
    if (page < totalPages) {
      const nextPage = page + 1
      navigate(`?page=${nextPage}`)
    }
  }
  // const { posts, fetchData, page, totalPages, handleNext, handlePrev, cat} = usefetchPost(3);
  // useEffect(() => {
  //   fetchData()
  // }, [cat, posts])
  return (
    <>
      <SEO
        title="Blog | Aqua Cainta Resort"
      />
      <div className="posts">
        <PostHeading 
          title='Blog Posts'
          description='Unveil the serene beauty of our resort, a haven of tranquility and luxury nestled in nature’s lap. This post is your invitation to experience paradise'
        />
        <div className="post__container">
          <div className="left">
            <PostItems posts={posts} />
            <Pagination page={page} totalPages={totalPages} next={handleNext} prev={handlePrev} />
          </div>
          <div className=" right">
            <div>
              {/* <h4>Suggested Posts</h4> */}
              {/* <PostItems posts={posts} /> */}
              {/* <Menu cat={cat}/> */}
            </div>
          </div>
        </div>


      </div>
    </>
  );
};

export default ScrollToTop(Posts);
