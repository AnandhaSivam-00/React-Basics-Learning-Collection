import React from 'react'
import { motion } from 'framer-motion' 

const PageTransition = ({ children }) => {
  const pageVariansts = {
    pageIn: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }, 
    pageOut: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  return (
    <motion.div
      variants={pageVariansts}
      initial={{
        opacity: 0,
        y: 20
      }}
      animate="pageIn"
      exit="pageOut"
      className='overflow-hidden'
    >
      { children }
    </motion.div>
  )
}

export default PageTransition