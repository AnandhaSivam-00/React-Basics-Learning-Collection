import React, { lazy, useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const FlexNavBar = lazy(() => import('./components/FlexNavBar'))
import PageTransition from './components/PageTransition'
import { auth } from '../../config/firebaseConfig'

import './styles.css'

const Moody = () => {
  const [userData, setUserData] = useState(null);

  // const navigate = useNavigate();

  useEffect(() => {
    const data = auth.currentUser;

    if(data) {
      setUserData(data);
    }
    // else {
    //   navigate('/login', { replace: true });
    // }
  }, []);

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