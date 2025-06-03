import React, { useEffect, useRef } from 'react'
import { 
  motion, 
  AnimatePresence, 
  useScroll,
  useTransform,
  useSpring, 
  spring
} from 'framer-motion'
import './App.module.css'
import ProgressBar from './components/ProgressBar'
import Square from './components/Square'
import DraggableCircle from './components/DraggableCircle'
import ScrollAnimations from './components/ScrollAnimations'
import ParallaxAnimation from './components/ParallaxAnimation'
import StripeTextAnimation from './components/StripeTextAnimation'

function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef
  });
  const progressBarStyle = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "rgb(211, 9, 225)",
      "rgb(3, 209, 0)"
    ]
  );
  const springYScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001
  });

  // useEffect(() => {
  //   console.log(scrollYProgress);
  // }, [scrollYProgress]);

  return (
    <>
        <motion.div 
          className='w-full h-1 fixed top-0 z-1 rounded-tr-lg rounded-br-lg' 
          style={{ 
            transformOrigin: "left",
            scaleX: springYScrollProgress,
            backgroundColor: progressBarStyle
          }}
        />
        <div 
          className='min-h-[200vh] relative'
          ref={containerRef}
        >
          {/* <div className='h-[50vh] flex justify-center items-center text-7xl font-bold'>
            <h1>Scroll Animations</h1>
          </div> */}
          <div className='h-[50vh] flex justify-center items-center text-5xl font-bold'>
            <StripeTextAnimation text={"Parallax Animation"} />
          </div>
          <AnimatePresence>
            <ParallaxAnimation />
          </AnimatePresence>
        </div>
    </>
  )
}

export default App
