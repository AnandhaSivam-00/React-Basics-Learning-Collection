import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Avatar } from 'antd'
import { AvatarDefaultIcon } from '../../../assets/Icons'

import { handleLoggedOut } from '../dataFetchFunctions'

import '../styles.css'

const FlexNavBar = (props) => {
    const [pictureURL, setPictureURL] = useState(null);
    const handleOut = () => {
        handleLoggedOut()
        props.setUserData(null)
        setPictureURL(null)
    }

    useEffect(() => { // For handling the picture loading
        if(props.photoURL) {
            setPictureURL(props.photoURL)
        }
    }, [props.photoURL]);

  return (
    <nav className='d-inline-flex justify-content-center align-items-center gap-3 p-0 moody-nav-container'>
        <NavLink 
            to='.' 
            className='text-decoration-none text-black p-2 px-3 rounded nav-btn-hover'
        >
            Home
        </NavLink>
        <NavLink 
            to='about' 
            className='text-decoration-none text-black p-2 px-3 rounded nav-btn-hover'
        >
            About
        </NavLink>
        {props.token ? (
                <button 
                    className='btn text-decoration-none text-black p-2 px-2 nav-btn-hover'
                    onClick={handleOut}
                >
                    Sign Out
                </button>
            ) : (
                <NavLink 
                    to='/login' 
                    className='text-decoration-none text-black p-2 px-2 rounded nav-btn-hover'
                >
                    Login
                </NavLink>
            )
        }
        <div className='d-flex justify-content-center align-items-center mx-1 p-1 px-3 rounded nav-btn-hover'>
            <NavLink to='profile-update' className='text-decoration-none text-black'>
            <span className='text-secondary me-2'>{props.username}</span>
            {pictureURL ? (
                    <Avatar 
                        size={40} 
                        src={pictureURL}
                        alt='Profile Picture'
                    />
                ) : (<Avatar size={40} icon={<AvatarDefaultIcon width={28} height={25}/>} />)
            } 
            </NavLink>
        </div>
        
    </nav>
  )
}

export default FlexNavBar