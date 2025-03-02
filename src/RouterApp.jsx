import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './React Router Projects/VanLife/components/Home.jsx'
import About from './React Router Projects/VanLife/components/About.jsx'
import NavBar from './React Router Projects/VanLife/components/NavBar.jsx'
import Footer from './React Router Projects/VanLife/components/Footer.jsx'
import MainContainer from './React Router Projects/VanLife/MainContainer.jsx'
import VansList from './React Router Projects/VanLife/VansList.jsx'
import VanDetails from './React Router Projects/VanLife/components/VanDetails.jsx'

const RouterApp = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/vans" element={<VansList />} />
                <Route path='/vans/:id' element={<VanDetails />} />
            </Routes>
            <Footer />
        </>
    )
}

export default RouterApp