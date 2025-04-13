import React from 'react'
import { 
    Route, 
    createBrowserRouter, 
    createRoutesFromElements,
    RouterProvider, 
} from 'react-router-dom'
import Wallet from './SampleReducer/Wallet';
import HappyDays from './components/HappyDays';

import Undrilling from '../src/MealsListView/Undrilling'
import ReactFacts from './Projects/React Facts/ReactFacts';
import TravelJournal from './Projects/Travel Journal/TravelJournal';
import ChiefMistral from './Projects/Chief Mistral/ChiefMistral';
import MemeGenerator from './Projects/Meme Generator/MemeGenerator';

import MainContent from './Projects/Tenzies/MainContent';
import MainGamePage from './Projects/Assembly EndGame/MainGamePage';
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
import MoodyLogin, { moodyBasicAction, moodyLoginLoader } from './Projects/Moody/pages/MoodyLogin.jsx'
import Moody from './Projects/Moody/Moody.jsx'
import UpdateProfile, { moodyUpdateProfileAction, moodyUpdateProfileLoader } from './Projects/Moody/pages/UpdateProfile.jsx';

import { requireAuth } from './React Router Projects/VanLife/server/utils.js'
import AboutPage from './Projects/Moody/pages/AboutPage.jsx';
import MoodyHome, { moodyPostAction, moodyPostLoader } from './Projects/Moody/pages/MoodyHome.jsx';
import { requireFirebaseAuth } from './Projects/Moody/requireFirebaseAuth.js';

// For creating the Loaders, we use this method to create a Router
// and then we pass the router to the RouterProvider
const router = createBrowserRouter(createRoutesFromElements(
  <>
    {/* <Route path="/" element={<HappyDays />} />
    <Route path="/chief-mistral" element={<ChiefMistral />} />
    <Route path="/reactfacts" element={<ReactFacts />} />
    <Route path="/travel-journal" element={<TravelJournal />} />
    <Route path='/meme-generator' element={<MemeGenerator />} />
    <Route path='/tenzies-game' element={<MainContent />} />
    <Route path='/assembly-endgame' element={<MainGamePage />} />
    <Route path='/vanslife' element={<MainLayout />} >
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
    </Route> */}
    <Route 
        path='/login' 
        element={<MoodyLogin />} 
        loader={moodyLoginLoader}
        action={moodyBasicAction}
        errorElement={<Errors />}
    />
    <Route
        path='/home'
        element={<Moody />}
        loader={async ({ request }) => await requireFirebaseAuth(request)}
        errorElement={<Errors />}
    >
        <Route
            index
            element={<MoodyHome />}
            loader={moodyPostLoader}
            action={moodyPostAction}
            errorElement={<Errors />}
        />
        <Route
            path='profile-update'
            element={<UpdateProfile />}
            errorElement={<Errors />}
            loader={moodyUpdateProfileLoader}
            action={moodyUpdateProfileAction}
        />
        <Route
            path='about'
            element={<AboutPage />}
            loader={async ({ request }) => await requireFirebaseAuth(request)}
            errorElement={<Errors />}
        />
    </Route>
  </>
))

const App = () => {
    return (
      <RouterProvider router={router} />
    )
}

export default App