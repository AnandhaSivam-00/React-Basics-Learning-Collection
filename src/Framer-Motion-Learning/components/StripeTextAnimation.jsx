import React from 'react'
import { motion } from 'framer-motion';

const StripeTextAnimation = ({ text }) => {
  return (
    <div className='w-full'>
            {text.split('').map((letter, index) => {
                return (
                    <motion.span 
                        key={index} 
                        className='relative'
                    >
                        <motion.span 
                            className='p-0'
                            initial={{
                                opacity: 0
                            }}
                            animate={{
                                opacity: 1
                            }}
                            transition={{
                                duration: 0.15, 
                                delay: index * 0.05,
                            }}
                        >
                            {letter}
                        </motion.span>
                        <motion.span 
                            className='absolute inset-0 bg-neutral-100'
                            initial={{
                                opacity: 0
                            }}
                            animate={{
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                duration: 0.15, 
                                delay: index * 0.05, //0.025
                                times: [0, 0.1, 1],
                                ease: 'easeInOut'
                            }}
                        />
                    </motion.span>
                )
            })}
    </div>
  )
}

export default StripeTextAnimation