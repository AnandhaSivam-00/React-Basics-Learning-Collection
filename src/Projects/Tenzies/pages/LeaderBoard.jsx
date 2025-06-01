import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import '../index.css'

const LeaderBoard = () => {
  const { isAuthenticated, error } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && error instanceof Array) {
      navigate(error[1]);

      dispatch(clearAuthError());
    }
  }, [dispatch]);


  return (
    <div className='100vh d-flex flex-column justify-content-center align-items-center p-2'>
      <div className='align-self-start'>
        <Link 
            to='..'
            className='tenzies-back-btn text-sm'
        >
          {'< Back to game'}
        </Link>
      </div>
      <h2 className=''><b>LeaderBoard</b></h2>
      <div className=''>
        
      </div>
    </div>
  )
}

export default LeaderBoard