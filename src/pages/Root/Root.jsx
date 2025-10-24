import React from 'react'
import Navbar from '../../pages/Shared/Header/Navbar'
import { Outlet } from 'react-router'
import Footer from '../../pages/Shared/Footer/Footer'

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default Root
