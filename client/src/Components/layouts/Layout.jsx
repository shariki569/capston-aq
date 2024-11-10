import React from 'react'
import Nav from '../common/Nav'
import Footer from '../common/Footer'
import { Outlet } from 'react-router-dom'
import Chatbot from '../ui/Chatbot'

const Layout = () => {
  return (
    <>
    <Nav/>
    <Outlet/>
    <Chatbot/>
    <Footer/>
    
    </>
  )
}

export default Layout
