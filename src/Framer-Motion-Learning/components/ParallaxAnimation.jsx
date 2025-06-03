import React, { useRef } from 'react'
import {
    motion,
    useMotionTemplate,
    useMotionValueEvent,
    useScroll,
    useTransform
} from 'framer-motion'

const SECTION_HEIGHT = 1500;

const ParallaxAnimation = () => {
    const containerRef = useRef(null);

    return (
        <>
            <div
                ref={containerRef}
                className='w-screen relative'
                style={{
                    height: `calc(${SECTION_HEIGHT}px + 100vh)`
                }}
            >
                <CenterImage containerRef={containerRef} />
                <div className='absolute h-75 bottom-0 left-0 right-0 bg-gradient-to-b from-zinc-950/0 to-neutral-800' />
                <ParallaxImages />
            </div>
            <div className='h-screen'></div>
        </>
    )
}

const CenterImage = ({ containerRef }) => {
    const { scrollY } = useScroll({
        target: containerRef
    });

    const opacityControl = useTransform(
        scrollY,
        [SECTION_HEIGHT, SECTION_HEIGHT + 500],
        [1, 0]
    );
    const backgroundImageSize = useTransform(
        scrollY,
        [0, SECTION_HEIGHT + 500],
        ["50%", "102%"]
    );
    const clip1 = useTransform(
        scrollY,
        [0, SECTION_HEIGHT],
        [25, 0]
    );
    const clip2 = useTransform(
        scrollY,
        [0, SECTION_HEIGHT],
        [75, 100]
    );
    const combinedClips = useMotionTemplate(`
        polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)
    `);

    return (
        <motion.div
            className='sticky top-0 h-screen w-full'
            style={{
                opacity: opacityControl,
                backgroundSize: backgroundImageSize,
                clipPath: combinedClips,
                backgroundImage: "url(https://images.unsplash.com/photo-1744740606260-1881836349d2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNnx8fGVufDB8fHx8fA%3D%3D)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                // backgroundSize: "cover",
            }}
        />
    )
}

const ParallaxImages = () => {
    return (
        <div className='relative mx-auto z-10 max-w-5xl px-4 pt-[200px]'>
            <ParallaxImage
                className='w-1/3 my-10'
                src="https://images.unsplash.com/photo-1741807083060-39c641cd97fa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM4fEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D"
                alt=""
                start={-200}
                end={200}
            />
            <ParallaxImage
                className='mx-auto my-10 w-2/3'
                src="https://images.unsplash.com/photo-1743102821158-314fc4c16d32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D"
                alt=""
                start={200}
                end={-250}
            />
            <ParallaxImage
                className='ml-24 w-5/12'
                src="https://images.unsplash.com/photo-1742943892627-f7e4ddf91224?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQyfEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D"
                alt=""
                start={0}
                end={-500}
            />
        </div>
    )
}

const ParallaxImage = ({ className, src, alt, start, end }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: [`${start}px end`, `${end + -1}px`]
    });

    
    const ImageOpacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
    const ImageScale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);
    const ImageTranslateY = useTransform(scrollYProgress, [0, 1], [start, end]);
    const ImageTransform = useMotionTemplate(`translate(${ImageTranslateY}px) scale(${ImageScale})`);
    
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        console.log(latest);
    });

    return (
        <motion.img 
            ref={ref}
            className={className}
            style={{
                opacity: ImageOpacity,
                transform: ImageTransform,
                // translateY: useTransform(scrollYProgress, [0, 1], [start, end])
            }}
            src={src}
            alt={alt}
        />
    )
}

export default ParallaxAnimation