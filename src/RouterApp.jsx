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
import Login, { loginAction, loginLoader } from './React Router Projects/VanLife/components/Login.jsx'

import VansList, { vansLoader } from './React Router Projects/VanLife/components/Vans/VansList.jsx'
import VanDetails, { vanDetailsLoader } from './React Router Projects/VanLife/components/Vans/VanDetails.jsx'

import MainLayout from './React Router Projects/VanLife/components/Layouts/MainLayout.jsx'
import HostLayout from './React Router Projects/VanLife/components/Layouts/HostLayout.jsx'

import Dashboard from './React Router Projects/VanLife/components/Host/Dashboard.jsx'
import Income from './React Router Projects/VanLife/components/Host/Income.jsx'
import Reviews from './React Router Projects/VanLife/components/Host/Reviews.jsx'
import HostVans, { hostVansLoader } from './React Router Projects/VanLife/components/Host/HostVans.jsx'
import HostVansDetails, { hostVanDetailLoader } from './React Router Projects/VanLife/components/Host/HostVansDetails.jsx'
import { 
    HostVanDetail, 
    HostVanPhoto, 
    HostVanPricing 
} from './React Router Projects/VanLife/components/Host/HostVansDetails.jsx'

import { requireAuth } from './React Router Projects/VanLife/server/utils.js'

// For creating the Loaders, we use this method to create a Router
// and then we pass the router to the RouterProvider
const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<MainLayout />} >
        <Route index element={<Home />} />
        <Route 
            path='login' 
            element={<Login />} 
            loader={loginLoader}
            action={loginAction}
            errorElement={<Errors />}
        />
        <Route path="about" element={<About />} />
        <Route 
            path="vans" 
            element={<VansList />}
            errorElement={<Errors />}
            loader={vansLoader} 
        />
        <Route 
            path='vans/:id' 
            element={<VanDetails />} 
            loader={vanDetailsLoader}
            errorElement={<Errors />}
        />

        <Route 
            path='host' 
            element={<HostLayout />}
            errorElement={<Errors />} 
        >
            <Route 
                index 
                element={<Dashboard />}
                loader={async ({ request }) => await requireAuth(request)} 
                errorElement={<Errors />}
            />
            <Route 
                path="income" 
                element={<Income />}
                loader={async ({ request }) => await requireAuth(request)}
                errorElement={<Errors />} 
            />
            <Route 
                path="vans" 
                element={<HostVans />}
                loader={hostVansLoader}
                errorElement={<Errors />} 
            />
            <Route 
                path="reviews" 
                element={<Reviews />}
                loader={async ({ request }) => await requireAuth(request)}
                errorElement={<Errors />} 
            />
            <Route 
                path="vans/:id" 
                element={<HostVansDetails />}
                loader={hostVanDetailLoader}
                errorElement={<Errors />} 
            >
                <Route 
                    index 
                    element={<HostVanDetail />}
                    loader={async ({ request }) => await requireAuth(request)} 
                />
                <Route 
                    path="pricing" 
                    element={<HostVanPricing />}
                    loader={async ({ request }) => await requireAuth(request)} 
                />
                <Route 
                    path='photos' 
                    element={<HostVanPhoto />}
                    loader={async ({ request }) => await requireAuth(request)} 
                />
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