import React from 'react';
import './ReactFacts.css';

const Header = () => {
  return (
    <header className='row header d-flex align-items-center'>
      <div className='col-6 d-flex align-items-center mt-2 mb-2'>
        <img src='src/assets/react.svg' alt='react-logo' width='50' height='50' className='me-3' />
        <h2 className='text-light m-0'>ReactFacts</h2>
      </div> 
      <div className='col-6 mt-2 mb-2'>
        <nav className='navbar navbar-expand-lg text-light'>
          <ul className='navbar-nav ms-auto d-flex flex-row'>
            <li className='nav-item mx-2 p-1'>Contact</li>
            <li className='nav-item mx-2 p-1'>About</li>
            <li className='nav-item mx-2 p-1'>Location</li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

const MainContent = () => {
  return (
    <main className='m-0 p-0 text-light'>
      <h1 className='mb-4'>Fun facts about React</h1>
        <ul className='main-list-items'>
          <li>Was first released in 2013</li>
          <li>Was originally created by Jordan Walke</li>
          <li>Has well over 200k stars on GitHub</li>
          <li>Is maintained by Meta</li>
          <li>Power thousands of enterprise apps, including mobile apps</li>
        </ul>
    </main>
  )
}

const Footer = () => {
  return (
    <footer className='text-light text-secondary bg-black p-1'>
      <small>@2025 Little Thinker</small>
    </footer>
  )
}

const ReactFacts = () => {
  return (
    <div className='container p-2'>
      <Header />
      <MainContent />
      <Footer />
    </div>
  )
}

export default ReactFacts