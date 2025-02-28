import React from 'react'
import { useMemeDataContext } from '../MainContentProvider'

const OutputContainer = () => {
  const { meme } = useMemeDataContext();

  return (
    <div className='justify-content-center border rounded p-2 m-2 output-container'>
      {(meme.topText && meme.bottomText) ? (
        <>
          <h1>{meme.topText}</h1>
          <h1>{meme.bottomText}</h1>
          <img src={meme.imgUrl} alt='Meme' className='img-fluid' />
        </>
      ) : null}
    </div>
  )
}

export default OutputContainer;