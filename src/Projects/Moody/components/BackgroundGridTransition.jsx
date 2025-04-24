import React from 'react'

import '../styles.css'

const BackgroundGridTransition = () => {
  return (
    <div className='flex h-100vh z-100 overflow-hidden'>
        {
            [...Array(20)].map((_, index) => {
                return (
                    <div key={index} className='w-5vw h-full'></div>
                )
            })
        }
    </div>
  )
}

export default BackgroundGridTransition