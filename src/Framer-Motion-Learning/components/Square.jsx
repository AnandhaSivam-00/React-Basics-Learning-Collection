import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion';

const Square = () => {
  const [isMounted, setIsMounted] = useState(true);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsMounted(false), 5000);
  }, []);

  return (
    <>
      <motion.div 
        className='w-[100px] h-[100px] bg-blue-500'
        initial={{
            x: 0,
            y: 0,
            scale: 1
        }}
        animate={{
            x: 200,
        }}
        transition={{
            duration: 2,
            ease: 'easeOut',
            repeat: Infinity,
            repeatType: 'reverse'
        }}
      ></motion.div>
      <div className='mt-[100px]'></div>
      <AnimatePresence>
        {isMounted && (
            <motion.div
            className='w-[100px] h-[100px] rounded'
            initial={{
              x: 0,
              y: 0,
              scale: 1,
              backgroundColor: 'rgb(193, 8, 240)'
            }}
            animate={{
              x: 250,
              y: 50,
              backgroundColor: 'rgb(241, 119, 26)',
            }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            exit={{
              opacity: 0,
            }}
          >
          </motion.div>
        )}
      </AnimatePresence>
      <div className='mt-[100px] w-full flex flex-row justify-between items-center gap-4'>
        <motion.div
          className='w-[100px] h-[100px] bg-rose-700'
          animate={{
            scale: [1, 1.5, 2, 1.5, 1],
            rotate: [0, 90, 180, 360, 180],
            borderRadius: ['0%', '50%', '100%', '50%', '0%'],
          }}
          transition={{
            duration: 3,
            ease: 'easeInOut',
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1,
            repeatType: 'loop',
          }}
        ></motion.div>
        <button 
          className={`w-22 h-13 p-2 bg-violet-400 rounded-4xl flex flex-row ${toggle ? 'justify-end' : 'justify-start'} items-center`}
          onClick={() => setToggle(prev => !prev)}
        >
          <motion.div
            className={`w-10 h-10 bg-violet-700 rounded-full cursor-pointer`}
            layout
            transition={{
              type: 'spring',
              visualDuration: 0.4,
              bounce: 0.5,
            }}
            // whileHover={{
            //   scale: 0.9,
            //   transition: { duration: 0.2 },
            // }}
            whileTap={{
              scale: 0.8,
              transition: { duration: 0.2 },
              backgroundColor: '#8b5cf6'
            }}
          ></motion.div>
        </button>
      </div>
    </>
  )
}

export default Square