import React, { useContext } from 'react'
import { MenuContext } from './Menu'

import '../../styles.css'


const MenuDropdown = ({ children }) => {
    const { isOpen } = useContext(MenuContext);

    return (
        isOpen ? (
            <div 
                className='absolute nav-background-color top-22 right-5 shadow rounded p-2' 
                role='menu'
                aria-label='menu dropdown list'
            >
                { children }
            </div>
        ) : null
    );
}

export default MenuDropdown