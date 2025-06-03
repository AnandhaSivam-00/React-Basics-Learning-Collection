import React from 'react'

const MenuItem = ({ children }) => {
    return (
        <div className='mt-3' role='menuitem'>
            { children }
        </div>
    );
}

export default MenuItem