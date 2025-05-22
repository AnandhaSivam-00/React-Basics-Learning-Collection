import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchUserData } from './userSlice';

const UserView = () => {
    const userData = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    if(userData.error) {
        return <div className="product-container border p-3">Error: {userData.error}</div>;
    }
    
  return (
    <div className='d-flex flex-column justify-content-center align-items-center m-0 p-2'>
        {!userData.loading ? (
            userData.data.map((user, index) => (
                <div className="card my-2 px-4" key={index}>
                    <div className='card-body' >
                        <div className='card-title'>
                            <h2>Magic User {index}</h2>
                        </div>
                        <div className="card-text">
                            <p className='text-bold'>Username: <span className="text-secondary">{user.username}</span></p>
                            <p className='text-bold'>Email Id: <span className="text-secondary">{user.email}</span></p>
                            <p className='text-bold'>Password: <span className="text-secondary">{user.password}</span></p>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <div className='d-flex flex-column align-items-center'>
                <span className='text-secondary'>Loading...</span>
            </div>
        )}
    </div>
  )
}

export default UserView