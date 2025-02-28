import React from 'react';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand text-primary fw-bold" href="/">Brix Networks</a>

        <button className="navbar-toggler" type="Link" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav nav-underline mx-auto mt-3 mb-0">
            <li className="nav-item mx-2">
              <p className="nav-link" href="#home">Home</p>
            </li>
            <li className="nav-item mx-2">
              <p className="nav-link" href="#about">About</p>
            </li>
            <li className="nav-item mx-2">
              <p className="nav-link" href="#services">Services</p>
            </li>
            <li className="nav-item mx-2">
              <p className="nav-link" href="#contact">Contact</p>
            </li>
          </ul>
          <div className="d-flex">
            <button className="btn btn-primary">Logout</button>
          </div>
        </div>
      </div>

    </nav>
    
  )
}

export default Header