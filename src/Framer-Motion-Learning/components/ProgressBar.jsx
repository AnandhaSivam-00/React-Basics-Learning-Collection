import React from 'react'
import { motion } from 'framer-motion';

const ProgressBar = () => {
    return (
        <div>
            <div
                className='w-90 h-5 bg-yellow-200 rounded-full'
            >
                <motion.div 
                    className='w-1/2 h-full bg-blue-500 rounded-full'
                    initial={{ 
                        width: 0, 
                        backgroundColor: 'blue', 
                        opacity: 0.5
                    }}
                    animate={{ 
                        width: '100%', 
                        opacity: 1, 
                        backgroundColor: 'orange', 
                        scaleY: 1.2
                    }} 
                    transition={{ 
                        duration: 10, 
                        ease: 'easeInOut' 

                    }}
                ></motion.div>
            </div>
            <div className='w-full h-full mt-3'>

            </div>
        </div>
    )
}

export default ProgressBar