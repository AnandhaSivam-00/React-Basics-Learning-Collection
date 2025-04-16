import React, { lazy, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Avatar } from 'antd'

import { AvatarDefaultIcon } from '../../../assets/Icons'
import { handleLoggedOut } from '../dataFetchFunctions'
import '../styles.css'

// const Menu = lazy(() => import('../components/menu/index'))
import Menu from '../components/menu/index'

const FlexNavBar = (props) => {
    const [pictureURL, setPictureURL] = useState(null);
    const handleOut = () => {
        handleLoggedOut()
        props.setUserData(null)
        setPictureURL(null)
    }

    useEffect(() => { // For handling the picture loading
        if (props.photoURL) {
            setPictureURL(props.photoURL)
        }
    }, [props.photoURL]);
    const sample = ['Sample 1', 'Sample 2', 'Sample 3'];

    return (
        <>
            <div className='fixing-top'>
                <Menu className='relative'>
                    <nav className='d-inline-flex justify-content-center align-items-center nav-background-color rounded shadow gap-3 mt-3 p-2'>
                        <NavLink
                            to='.'
                            className={({ isActive }) =>
                                isActive ? 'text-decoration-none text-black p-2 px-3 rounded nav-btn-hover nav-active' : 'text-decoration-none text-black p-2 px-3 rounded nav-btn-hover'
                            }
                            end
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to='post-feeds'
                            className={({ isActive }) =>
                                isActive ? 'text-decoration-none text-black p-2 px-3 rounded nav-btn-hover nav-active' : 'text-decoration-none text-black p-2 px-3 rounded nav-btn-hover'
                            }
                            end
                        >
                            Feeds
                        </NavLink>
                        <NavLink
                            to='about'
                            className={({ isActive }) =>
                                isActive ? 'text-decoration-none text-black p-2 px-3 rounded nav-btn-hover nav-active' : 'text-decoration-none text-black p-2 px-3 rounded nav-btn-hover'
                            }
                            end
                        >
                            About
                        </NavLink>
                        {props.token ? ( null ) : (
                            <NavLink
                                to='/login'
                                className={({ isActive }) =>
                                    isActive ? 'text-decoration-none text-black p-2 px-3 rounded nav-btn-hover nav-active' : 'text-decoration-none text-black p-2 px-3 rounded nav-btn-hover'
                                }
                                end
                            >
                                Login
                            </NavLink>
                        )}
                        <Menu.Button>
                            <div className='d-flex justify-content-center align-items-center p-2 px-3 rounded nav-btn-hover hover:cursor-pointer'>
                                <span className='text-secondary me-2' id='nav-bar-username'>{props.username}</span>
                                {pictureURL ? (
                                    <Avatar
                                        size={40}
                                        src={pictureURL}
                                        alt='Profile Picture'
                                    />
                                ) : (<Avatar size={40} icon={<AvatarDefaultIcon width={28} height={25} />} />)}
                                {/* <NavLink 
                        to='profile-update' 
                        className={({ isActive }) =>
                            isActive ? 'text-decoration-none text-black p-2 px-3 rounded nav-btn-hover nav-active' : 'text-decoration-none text-black p-2 px-3 rounded nav-btn-hover'
                        }
                        end
                        >
                        </NavLink> */}
                            </div>
                        </Menu.Button>
                    </nav>
                    <Menu.Dropdown>
                        <Menu.Item>
                            <NavLink 
                                to='profile-update' 
                                className={({ isActive }) =>
                                    isActive ? 'text-decoration-none text-black p-2 px-3 rounded nav-btn-hover nav-active' : 'text-decoration-none text-black p-2 px-3 rounded nav-btn-hover'
                                }
                                end
                            >
                                Profile
                            </NavLink>
                        </Menu.Item>
                        {props.token ? (
                            <>
                                <hr />
                                <Menu.Item>
                                    <button
                                        className='btn text-decoration-none text-black p-2 px-2 nav-btn-hover'
                                        onClick={handleOut}
                                    >
                                        Sign Out
                                    </button>
                                </Menu.Item>
                            </>
                         ) : ( null )}
                    </Menu.Dropdown>
                </Menu>
            </div>
        </>
    )
}

export default FlexNavBar