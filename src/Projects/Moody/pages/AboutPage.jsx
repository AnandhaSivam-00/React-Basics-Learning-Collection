import React from 'react'
import TextRevealAnimation from '../components/TextRevealAnimation'

import '../styles.css'
import PageTransition from '../components/PageTransition'

const AboutPage = () => {
  // Created using Tailwind CSS

  return (
    <PageTransition>
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
    </PageTransition>
  )
}

export default AboutPage