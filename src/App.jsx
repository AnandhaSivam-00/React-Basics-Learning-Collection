import React, { lazy, Suspense } from 'react'
import { 
    Route, 
    createBrowserRouter, 
    createRoutesFromElements,
    RouterProvider, 
} from 'react-router-dom'


// Authentication Functions for Firebase and React Router
import { requireAuth } from './React Router Projects/VanLife/server/utils.js'
import { requireFirebaseAuth } from './Projects/Moody/requireFirebaseAuth.js';

// Components Importing (Lazy Loading)
const Wallet = lazy(() => import('./SampleReducer/Wallet'));

const HappyDays = lazy(() => import('./components/HappyDays'));

const Undrilling = lazy(() => import('../src/MealsListView/Undrilling'));

const ReactFacts = lazy(() => import('./Projects/React Facts/ReactFacts'));

const TravelJournal = lazy(() => import('./Projects/Travel Journal/TravelJournal'));

const ChiefMistral = lazy(() => import('./Projects/Chief Mistral/ChiefMistral'));

const MemeGenerator = lazy(() => import('./Projects/Meme Generator/MemeGenerator'));

const MainContent = lazy(() => import('./Projects/Tenzies/MainContent'));

const MainGamePage = lazy(() => import('./Projects/Assembly EndGame/MainGamePage'));

const Home = lazy(() => import('./React Router Projects/VanLife/components/Home.jsx'));
const About = lazy(() => import('./React Router Projects/VanLife/components/About.jsx'));
const MainLayout = lazy(() => import('./React Router Projects/VanLife/components/Layouts/MainLayout.jsx'));
const HostLayout = lazy(() => import('./React Router Projects/VanLife/components/Layouts/HostLayout.jsx'));
const Dashboard = lazy(() => import('./React Router Projects/VanLife/components/Host/Dashboard.jsx'));
const Income = lazy(() => import('./React Router Projects/VanLife/components/Host/Income.jsx'));
const Reviews = lazy(() => import('./React Router Projects/VanLife/components/Host/Reviews.jsx'));
const Errors = lazy(() => import('./React Router Projects/VanLife/components/Errors.jsx'))
const Login = lazy(() => import('./React Router Projects/VanLife/components/Login.jsx'))
const VansList = lazy(() => import('./React Router Projects/VanLife/components/Vans/VansList.jsx'))
const VanDetails = lazy(() => import('./React Router Projects/VanLife/components/Vans/VanDetails.jsx'))
const HostVans = lazy(() => import('./React Router Projects/VanLife/components/Host/HostVans.jsx'))
const HostVansDetails = lazy(() => import('./React Router Projects/VanLife/components/Host/HostVansDetails.jsx'))
const HostVanDetail = lazy(() => import('./React Router Projects/VanLife/components/Host/HostVansDetails.jsx'))
const HostVanPhoto = lazy(() => import('./React Router Projects/VanLife/components/Host/HostVansDetails.jsx'))
const HostVanPricing = lazy(() => import('./React Router Projects/VanLife/components/Host/HostVansDetails.jsx'))

const AboutPage = lazy(() => import('./Projects/Moody/pages/AboutPage.jsx'))
const MoodyHome = lazy(() => import('./Projects/Moody/pages/MoodyHome.jsx'))
const Feeds = lazy(() => import('./Projects/Moody/pages/Feeds.jsx'))
const UpdateProfile = lazy(() => import('./Projects/Moody/pages/UpdateProfile.jsx'))
const Moody = lazy(() => import('./Projects/Moody/Moody.jsx'))
const MoodyLogin = lazy(() => import('./Projects/Moody/pages/MoodyLogin.jsx'))


// Loader and Action Importing
import { loginAction, loginLoader } from './React Router Projects/VanLife/components/Login.jsx'
import { vansLoader } from './React Router Projects/VanLife/components/Vans/VansList.jsx'
import { vanDetailsLoader } from './React Router Projects/VanLife/components/Vans/VanDetails.jsx'
import { hostVansLoader } from './React Router Projects/VanLife/components/Host/HostVans.jsx'
import { hostVanDetailLoader } from './React Router Projects/VanLife/components/Host/HostVansDetails.jsx'

import { moodyBasicAction, moodyLoginLoader } from './Projects/Moody/pages/MoodyLogin.jsx'
import { moodyPostAction, moodyPostLoader } from './Projects/Moody/pages/MoodyHome.jsx';
import { moodyUpdateProfileAction, moodyUpdateProfileLoader } from './Projects/Moody/pages/UpdateProfile.jsx';
import { moodyFeedsLoader } from './Projects/Moody/pages/Feeds.jsx';



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
            path='post-feeds'
            element={<Feeds />}
            loader={moodyFeedsLoader}
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
        <Suspense fallback={<h1 className='text-center'>Loading...</h1>}>
            <RouterProvider router={router} />
        </Suspense>
    )
}

export default App