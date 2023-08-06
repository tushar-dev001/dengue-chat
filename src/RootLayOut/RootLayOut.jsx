
import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const RootLayOut = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default RootLayOut