import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './React Router Projects/VanLife/components/Home.jsx'
import About from './React Router Projects/VanLife/components/About.jsx'
import NavBar from './React Router Projects/VanLife/components/NavBar.jsx'
import Footer from './React Router Projects/VanLife/components/Footer.jsx'
import MainContainer from './React Router Projects/VanLife/MainContainer.jsx'

const RouterApp = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<MainContainer />} />
                <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
        </>
    )
}

export default RouterApp