import React from 'react'
import TextRevealAnimation from '../components/TextRevealAnimation'

import '../styles.css'

const AboutPage = () => {
  // Created using Tailwind CSS

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <div className='text-center'>
        <h1>
          <TextRevealAnimation text='About Moody' />
        </h1>
      </div>
      <div className='p-2'>
        <div className=''>

        </div>
        <div className=''>
          
        </div>
      </div>
    </div>
  )
}

export default AboutPage