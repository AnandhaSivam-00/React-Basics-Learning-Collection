import { lazy, useState } from 'react'
import { Outlet } from 'react-router-dom'

const FlexNavBar = lazy(() => import('./components/FlexNavBar'))
import { auth } from '../../config/firebaseConfig'

import './styles.css'

const Moody = () => {
  const [userData, setUserData] = useState(auth.currentUser ?? null);

  return (
    <div className='d-flex flex-column justify-content-center align-items-center gap-3 moody-main-container '>
        <FlexNavBar 
          token={userData?.accessToken}
          username={userData?.displayName || userData?.email}
          photoURL={userData?.photoURL} 
          setUserData={setUserData}
        />
        <Outlet context={{ userData, setUserData }} />
    </div>
  )
}

export default Moody