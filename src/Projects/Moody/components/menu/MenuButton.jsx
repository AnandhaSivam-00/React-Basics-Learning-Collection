import { useContext } from 'react'
import PropTypes from 'prop-types'
import { MenuContext } from './Menu'

const MenuButton = ({ children = null }) => {
  const { toggleMenu } = useContext(MenuContext);
  return (
    <div 
      role='button' 
      tabIndex={0}
      onMouseEnter={toggleMenu} 
      onClick={toggleMenu}
      onKeyDown={(e) => {
        if(e.key === 'Enter' || e.key === ' ') {
          toggleMenu();
        }
      }}
    >
      { children }
    </div>
  )
}

MenuButton.propTypes = {
  children: PropTypes.node,
};

export default MenuButton