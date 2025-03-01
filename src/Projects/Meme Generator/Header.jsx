import React from 'react'
import './meme_generator.css'

const Header = () => {
  return (
    <header className='d-flex justify-content-center align-items-center sticky-top p-2 meme-header'>
        <img 
            src='http://www.pngall.com/wp-content/uploads/2016/05/Trollface.png' 
            alt='meme generator logo' 
            width={40} 
            height={40} 
            className='me-2'
        />
        <h1 className='text-white'>Meme Generator</h1>
    </header>
  )
}

export default Header;