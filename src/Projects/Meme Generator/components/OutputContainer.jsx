import React from 'react'
import { useMemeDataContext } from '../MainContentProvider'

const OutputContainer = () => {
    const { meme } = useMemeDataContext();

    return (
        <section className='w-100 h-100 justify-content-center border rounded p-2 m-2'>
            {(meme.topText && meme.bottomText && meme.imgUrl !== '') ? (
                <article className='position-relative w-100 h-100'>
                    <img 
                        src={meme.imgUrl} 
                        alt='Meme' 
                        className='w-100 h-100 img-fluid' 
                    />

                    <h1 className='position-absolute start-50 top-10 bg-white'>{meme.topText}</h1>
                    <h1 className='position-absolute start-50 bottom-10 bg-white'>{meme.bottomText}</h1>
                </article>
            ) : (
                <article className='d-flex justify-content-center align-items-center h-100'>
                    <h3>Output will be displayed here...</h3>
                </article>
            )}
        </section>
    )
}

export default OutputContainer;