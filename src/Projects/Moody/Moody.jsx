import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import FlexNavBar from './components/FlexNavBar'

import { auth } from '../../config/firebaseConfig'

import './styles.css'

const Moody = () => {
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const data = auth.currentUser;
    console.log('User data:', data);

    if(data) {
      setUserData(data);
    }
    else {
      navigate('/login', { replace: true });
    }
  }, []);

  return (
    <div className='d-flex flex-column justify-content-center align-items-center gap-3 moody-main-container'>
       <div className='mt-3 p-2 rounded fixing-top shadow'>
        <FlexNavBar 
          token={userData?.accessToken}
          username={userData?.displayName || userData?.email}
          photoURL={userData?.photoURL} 
          setUserData={setUserData}
        />
       </div>
       <Outlet context={{ userData, setUserData }} />
    </div>
  )
}

export default Moody