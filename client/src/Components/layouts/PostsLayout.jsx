import React from 'react'
import { Outlet } from 'react-router-dom'

const PostsLayout = () => {
  return (
    <div>
      <h2 className="dashboard-header">Posts</h2>
      <Outlet/>
    </div>
  )
}

export default PostsLayout
