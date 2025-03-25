import React, { useContext, useState, createContext } from 'react'

const MemeDataContent = createContext();

const MainContentProvider = ({ children }) => {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        imgUrl: ""
    })

  return (
    <MemeDataContent.Provider value={{meme, setMeme}}>
      { children }
    </MemeDataContent.Provider>
  )
}

export const useMemeDataContext = () => useContext(MemeDataContent);
// When you call a hook, it must be done inside the body of a function component or a custom hook.

export default MainContentProvider