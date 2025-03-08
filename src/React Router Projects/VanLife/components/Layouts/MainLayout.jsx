import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar';
import Footer from '../Footer';

import '../../index.css';

const MainLayout = () => {
  return (
    <>
      <div className='main-layout'>
        <NavBar />
        <main className='content'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default MainLayout