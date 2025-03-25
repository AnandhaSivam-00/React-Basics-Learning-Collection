import React from 'react'

const Header = () => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center tenzies-header'>
        <h1 className='mb-2 heading'>TENZIES</h1>
        <p className='p-3 text-center text-secondary'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    </div>
  )
}

export default Header