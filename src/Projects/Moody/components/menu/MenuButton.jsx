import React, { useContext } from 'react'
import { MenuContext } from './Menu'

const MenuButton = ({ children }) => {
  const { toggleMenu } = useContext(MenuContext);
  return (
    <div 
      role='button' 
      onMouseEnter={toggleMenu} 
      onClick={toggleMenu}
    >
      { children }
    </div>
  )
}

export default MenuButton