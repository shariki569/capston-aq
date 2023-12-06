import React, { useState } from 'react'
import Nav from '../common/Nav'
import Footer from '../common/Footer'
import { Outlet } from 'react-router-dom'
import Chatbot from '../ui/Chatbot'
import MessengerChat from '../ui/MessengerChat/MessengerChat'

const Layout = () => {
  // const [switchChat, setSwitchChat] = useState(false)

  // const toggleChat = () => {
  //   setSwitchChat(!switchChat)
  // }
  return (
    <>
      <Nav />
      <Outlet />

      <Chatbot />
      <MessengerChat />

      <Footer />

    </>
  )
}

export default Layout
