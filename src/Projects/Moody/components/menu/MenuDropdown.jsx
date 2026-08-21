import { useContext } from 'react'
import PropTypes from 'prop-types'
import { MenuContext } from './Menu'

import '../../styles.css'

const MenuDropdown = ({ children = null }) => {
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

MenuDropdown.propTypes = {
    children: PropTypes.node,
};

export default MenuDropdown