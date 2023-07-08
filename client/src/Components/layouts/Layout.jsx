import React from 'react'
import Nav from '../common/Nav'
import Footer from '../common/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <Nav/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout
