import React, { useRef } from 'react'
import { motion } from 'framer-motion'

const DraggableCircle = () => {
    const boundaryRef = useRef(null)
  return (
    <div className='mt-[80px] w-full h-full bg-gray-600 p-4 rounded' ref={boundaryRef}>
        <motion.div 
            className='w-15 h-15 rounded-full bg-green-400 cursor-pointer'
            whileHover={{
                scale: 0.9,
                transition: { duration: 0.2 },
            }}
            drag
            dragConstraints={boundaryRef}
            dragElastic={1}
            // dragDirectionLock={true}
            whileDrag={{ cursor: 'grabbing' }}
            dragMomentum={true}
            // dragSnapToOrigin={true}
        ></motion.div>
    </div>
  )
}

export default DraggableCircle