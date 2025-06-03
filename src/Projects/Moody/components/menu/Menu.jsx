import React, { createContext, useState } from 'react'

const MenuContext = createContext();

const Menu = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
        console.log('Menu toggled:', isOpen);
    }

  return (
    <MenuContext.Provider value={{ isOpen, toggleMenu }}>
      { children }
    </MenuContext.Provider>
  )
}

export default Menu;
export { MenuContext };

