import React, { useState } from 'react'

export const Menu = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
    }

  return (
    <div className=''>
        { children }
    </div>
  )
}

export const MenuDropdown = ({ children }) => {
    return (
        <div className=''>
            { children}
        </div>
    );
}

export const MenuItem = ({ children }) => {
    return (
        <div className=''>
            { children }
        </div>
    );
}