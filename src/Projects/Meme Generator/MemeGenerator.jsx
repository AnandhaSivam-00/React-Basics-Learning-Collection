import React from 'react'
import Header from './Header'
import Footer from './Footer'
import MainContentProvider from './MainContentProvider'
import InputForm from './components/InputForm'
import OutputContainer from './components/OutputContainer'

const MemeGenerator = () => {
  return (
    <>
        <Header />
        <MainContentProvider>
          <InputForm />
          <OutputContainer />
        </MainContentProvider>
        <Footer />
    </>
  )
}

export default MemeGenerator