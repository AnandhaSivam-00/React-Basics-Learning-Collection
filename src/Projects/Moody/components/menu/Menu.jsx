import React, { createContext, useState } from 'react'
import useToggle from '../../../../custom hooks/useToggle';

const MenuContext = createContext();

const Menu = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
        console.log('Menu toggled:', isOpen);
    }
    // const [value, toggleValue] = useToggle({
    //   initialValue: false,
    //   callback: (newValue) => console.log('Menu toggled from Menu:', newValue)
    // });

    // console.log('Menu toggled from Menu:', value);

  return (
    <MenuContext.Provider value={{ isOpen, toggleMenu }}>
      { children }
    </MenuContext.Provider>
  )
}

export default Menu;
export { MenuContext };

