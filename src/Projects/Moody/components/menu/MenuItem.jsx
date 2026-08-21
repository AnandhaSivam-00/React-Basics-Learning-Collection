import PropTypes from 'prop-types'

const MenuItem = ({ children = null }) => {
    return (
        <div className='mt-3' role='menuitem'>
            { children }
        </div>
    );
}

MenuItem.propTypes = {
    children: PropTypes.node,
};

export default MenuItem