import React, { useEffect, useState } from 'react'
import { useMemeDataContext } from '../MainContentProvider';

const InputForm = () => {
    const { setMeme } = useMemeDataContext();
    const [fetchedMemeData, setFetchedMemeData] = useState([]);

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(data => setFetchedMemeData(data.data.memes));
    }, []);

    const handleInputChange = (event) => {
        const { value, name } = event.currentTarget;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        })) // Changing the value based on the which input field is changing
    }

    const getMemeImage = (event) => {
        event.preventDefault();

        const randomNumber = Math.floor(Math.random() * fetchedMemeData.length);
        const getMemeURL = fetchedMemeData[randomNumber].url;

        setMeme(prevMeme => ({
            ...prevMeme,
            imgUrl: getMemeURL
        }));

        console.log("Submitted");
    }

  return (
      <form onSubmit={getMemeImage}>
          <div className='row justify-content-center border rounded p-2 m-2'>
              <div className='col-12 col-md-6 col-sm-6 mt-2'>
                  <label htmlFor='topText' className='fw-bold'>Top Text</label>
                  <input
                      type='text'
                      placeholder='Type here...'
                      name='topText'
                      className='form-control mt-2'
                      onChange={handleInputChange}
                  />
              </div>
              <div className='col-12 col-md-6 col-sm-6 mt-2'>
                  <label htmlFor='bottomText' className='fw-bold'>Bottom Text</label>
                  <input
                      type='text'
                      placeholder='Type here...'
                      name='bottomText'
                      className='form-control mt-2'
                      onChange={handleInputChange}
                  />
              </div>
              <div className='col-12 mt-2'>
                  <button className='btn btn-primary w-100 mt-2'>Get a new Meme</button>
              </div>
          </div>
      </form>
  )
}

export default InputForm