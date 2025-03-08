import React from 'react'
import { 
    Route, 
    createBrowserRouter, 
    createRoutesFromElements,
    RouterProvider, 
} from 'react-router-dom'
import Home from './React Router Projects/VanLife/components/Home.jsx'
import About from './React Router Projects/VanLife/components/About.jsx'
import Errors from './React Router Projects/VanLife/components/Errors.jsx'
import Login from './React Router Projects/VanLife/components/Login.jsx'

import VansList, {vansLoader} from './React Router Projects/VanLife/components/Vans/VansList.jsx'
import VanDetails from './React Router Projects/VanLife/components/Vans/VanDetails.jsx'

import MainLayout from './React Router Projects/VanLife/components/Layouts/MainLayout.jsx'
import HostLayout from './React Router Projects/VanLife/components/Layouts/HostLayout.jsx'

import Dashboard from './React Router Projects/VanLife/components/Host/Dashboard.jsx'
import Income from './React Router Projects/VanLife/components/Host/Income.jsx'
import Reviews from './React Router Projects/VanLife/components/Host/Reviews.jsx'
import HostVans from './React Router Projects/VanLife/components/Host/HostVans.jsx'
import HostVansDetails from './React Router Projects/VanLife/components/Host/HostVansDetails.jsx'
import { 
    HostVanDetail, 
    HostVanPhoto, 
    HostVanPricing 
} from './React Router Projects/VanLife/components/Host/HostVansDetails.jsx'

// For creating the Loaders, we use this method to create a Router
// and then we pass the router to the RouterProvider
const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<MainLayout />} >
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path="about" element={<About />} />
        <Route 
            path="vans" 
            element={<VansList />}
            errorElement={<Errors />}
            loader={vansLoader} 
        />
        <Route path='vans/:id' element={<VanDetails />} />

        <Route path='host' element={<HostLayout />} >
            <Route index element={<Dashboard />} />
            <Route path="income" element={<Income />} />
            <Route path="vans" element={<HostVans />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="vans/:id" element={<HostVansDetails />} >
                <Route index element={<HostVanDetail />} />
                <Route path="pricing" element={<HostVanPricing />} />
                <Route path='photos' element={<HostVanPhoto />} />
            </Route>
        </Route>
        <Route path='*' element={<h1>404 - Not Found</h1>} />
    </Route>
))

const RouterApp = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default RouterApp