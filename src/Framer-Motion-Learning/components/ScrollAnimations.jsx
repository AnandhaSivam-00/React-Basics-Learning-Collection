import React, { useEffect, useRef } from 'react';
import {
    motion,
    useScroll,
    useTransform,
} from 'framer-motion'

const ScrollAnimations = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        offset: ["start end", "end start"]
    });

    const backgroundColorChange = useTransform(
        scrollYProgress,
        [0, 0.5, 1], 
        [
            "linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
            "linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)",
            "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)",
        ]
    );

    const cardTexts = [
        'Tomato', 
        'Potato', 
        'Onion', 
        'Cabbage', 
        'Ladiesfinger', 
        'Background', 
        'Watermelon', 
        'Sause', 
        'Chilli', 
        'Carrot', 
        'Pumpkin', 
        'Cucumber', 
        'Spinach', 
        'Broccoli', 
        'Cauliflower', 
        'Radish', 
        'Turnip', 
        'Garlic', 
        'Ginger', 
        'Beet'
    ];

    return (
        <div
            ref={containerRef}
            className='w-full h-full relative flex flex-wrap justify-center items-center px-1 gap-y-15 gap-x-9'
        >
            {cardTexts.map((text, index) => {
                return (
                    <motion.div
                        key={index}
                        style={{ background: backgroundColorChange }}
                        className='w-50 h-70 relative flex justify-center items-center font-bold text-3xl rounded-xl'
                        // variants={{
                        //     hidden: {
                        //         opacity: 0
                        //     },
                        //     visible: {
                        //         opacity: 1
                        //     }
                        // }}
                        initial={{
                            opacity: 0,
                            scale: 0.8,
                            filter: "blur(8px)",
                        }}
                        // exit={{
                        //     opacity: 0,
                        //     scale: 0.8,
                        //     filter: "blur(5px)",
                        //     transition: {
                        //         duration: 3,
                        //         type: "spring",
                        //         bounce: 0.4,
                        //     }
                        // }}
                        whileInView={{
                            opacity: 1,
                            scale: 1.05,
                            filter: "blur(0px)",
                            transition: {
                                duration: 3,
                                type: "spring",
                                bounce: 0.4,
                            }
                        }}
                        whileHover={{
                            y: -20,
                            transition: {
                                duration: 0.5,
                                type: "spring",
                                bounce: 0.1,
                            }
                        }}
                        viewport={{
                            // once: false,
                            amount: "some",
                            margin: '-200px'
                        }}
                    >
                        <motion.div className='relative'>
                            {text}
                        </motion.div>
                        <motion.div
                            key={text + index}
                            variants={{
                                hidden: {
                                    left: 0
                                },
                                visible: {
                                    left: "100%",
                                    transition: {
                                        duration: 0.5,
                                        delay: 1,
                                        ease: "easeIn",
                                    }
                                }
                            }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: false,
                                amount: "0.6",
                            }}
                            className='absolute top-25 bottom-25 left-0 right-0 z-1 bg-white/30 backdrop-invert backdrop-opacity-20' 
                        />
                    </motion.div>
                )
            })}
        </div>
    )
}

export default ScrollAnimations