import {
    useState,
    useRef,
} from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Avatar } from 'antd'
import { motion } from 'framer-motion'

import { AvatarDefaultIcon } from '../../../assets/Icons'
import { handleLoggedOut } from '../dataFetchFunctions'
import '../styles.css'
import Menu from '../components/menu/index'

const NavTab = ({ children = null, setPosition = () => {} }) => {
    const navRef = useRef(null);

    return (
        <div
            ref={navRef}
            onMouseEnter={() => {
                if (!navRef?.current) return;

                const { width } = navRef.current.getBoundingClientRect();

                setPosition({
                    left: navRef.current.offsetLeft,
                    width: width,
                    opacity: 1,
                })
            }}
        >
            {children}
        </div>
    )
}

NavTab.propTypes = {
    children: PropTypes.node,
    setPosition: PropTypes.func,
};

const CursorTracker = ({ position = { left: 0, width: 0, opacity: 0 } }) => {
    return (
        <motion.div
            animate={{
                ...position
            }}
            className='absolute z-[-1] rounded-sm h-10 bg-amber-300/50'
        />
    )
}

CursorTracker.propTypes = {
    position: PropTypes.shape({
        left: PropTypes.number,
        width: PropTypes.number,
        opacity: PropTypes.number,
    }),
};

const FlexNavBar = ({
    token = null,
    username = '',
    photoURL = '',
    setUserData = () => {}
}) => {
    const [position, setPosition] = useState({
        left: 0,
        width: 0,
        opacity: 0,
    });

    const handleOut = () => {
        handleLoggedOut()
        setUserData(null)
    }

    const pictureURL = photoURL || null;

    return (
        <motion.div
            className='fixing-top'
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            whileHover={{
                scale: 1.03,
                transition: {
                    duration: 0.3,
                    ease: 'easeInOut',
                    bounce: 0.3,
                },
            }}
        >
            <Menu className='relative'>
                <nav
                    className='d-inline-flex justify-content-center align-items-center nav-background-color rounded shadow gap-3 mt-3 p-2'
                    onMouseLeave={() => {
                        setPosition((prev) => ({
                            ...prev,
                            opacity: 0,
                        }))
                    }}
                >
                    <NavTab setPosition={setPosition}>
                        <NavLink
                            to='.'
                            className={({ isActive }) =>
                                isActive ? 'text-decoration-none text-black p-2 px-3 rounded nav-active' : 'text-decoration-none text-black p-2 px-3 rounded'
                            }
                            end
                        >
                            Home
                        </NavLink>
                    </NavTab>
                    <NavTab setPosition={setPosition}>
                        <NavLink
                            to='post-feeds'
                            className={({ isActive }) =>
                                isActive ? 'text-decoration-none text-black p-2 px-3 rounded nav-active' : 'text-decoration-none text-black p-2 px-3 rounded'
                            }
                            end
                        >
                            Feeds
                        </NavLink>
                    </NavTab>
                    <NavTab setPosition={setPosition}>
                        <NavLink
                            to='about'
                            className={({ isActive }) =>
                                isActive ? 'text-decoration-none text-black p-2 px-3 rounded nav-active' : 'text-decoration-none text-black p-2 px-3 rounded'
                            }
                            end
                        >
                            About
                        </NavLink>
                    </NavTab>
                    {token ? null : (
                        <NavTab setPosition={setPosition}>
                            <NavLink
                                to='/moody/login'
                                className={({ isActive }) =>
                                    isActive ? 'text-decoration-none text-black p-2 px-3 rounded nav-active' : 'text-decoration-none text-black p-2 px-3 rounded'
                                }
                            >
                                Login
                            </NavLink>
                        </NavTab>
                    )}
                    <Menu.Button>
                        <NavTab setPosition={setPosition}>
                            <div className='d-flex justify-content-center align-items-center p-2 px-3 rounded hover:cursor-pointer'>
                                <span className='text-secondary me-2' id='nav-bar-username'>{username}</span>
                                {pictureURL ? (
                                    <Avatar
                                        size={40}
                                        src={pictureURL}
                                        alt='Profile Picture'
                                    />
                                ) : (<Avatar size={40} icon={<AvatarDefaultIcon width={28} height={25} />} />)}
                            </div>
                        </NavTab>
                    </Menu.Button>
                    <CursorTracker position={position} />
                </nav>
                <Menu.Dropdown>
                    <Menu.Item>
                        <NavTab setPosition={setPosition}>
                            <NavLink 
                                to='profile-update' 
                                className={({ isActive }) =>
                                    isActive ? 'text-decoration-none text-black p-2 px-3 rounded nav-active' : 'text-decoration-none text-black p-2 px-3 rounded'
                                }
                                end
                            >
                                Profile
                            </NavLink>
                        </NavTab>
                    </Menu.Item>
                    {token ? (
                        <>
                            <hr />
                            <Menu.Item>
                                <button
                                    className='btn text-decoration-none text-black p-2 px-2'
                                    onClick={handleOut}
                                >
                                    Sign Out
                                </button>
                            </Menu.Item>
                        </>
                    ) : null}
                </Menu.Dropdown>
            </Menu>
        </motion.div>
    )
}

FlexNavBar.propTypes = {
    token: PropTypes.string,
    username: PropTypes.string,
    photoURL: PropTypes.string,
    setUserData: PropTypes.func,
};

export default FlexNavBar