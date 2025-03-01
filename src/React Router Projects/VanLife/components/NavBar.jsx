import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css';

const NavBar = () => {
  return (
    <header>
      <nav className='navbar fixed-top py-3'>
        <div className='container-fluid'>
          <div className='col-6 col-md-4 col-lg-3 d-flex justify-content-start'>
            <Link to="/" className='navbar-brand'>
              <img 
                src="src/React Router Projects/VanLife/assets/Images/vanlife-logo.png" 
                alt="brand-logo" 
                height="24" 
              />
            </Link>
          </div>
          <div className='col-6 col-md-8 col-lg-9 d-flex justify-content-end align-items-baseline'>
            <Link to="/" className='mx-4 p-2'>Home</Link>
            <Link to="/about" className='mx-4 p-2'>About</Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default NavBar