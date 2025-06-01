import React from 'react'
import { Link } from 'react-router-dom'

import '../index.css'

const LeaderBoard = () => {
  return (
    <div className='100vh d-flex flex-column justify-content-center align-items-center p-2'>
      <div className='align-self-start'>
        <Link 
            to='..'
            className='tenzies-back-btn text-sm'
        >
          {'< Back to game'}
        </Link>
      </div>
      <h2 className=''><b>LeaderBoard</b></h2>
      <div className=''>
        
      </div>
    </div>
  )
}

export default LeaderBoard