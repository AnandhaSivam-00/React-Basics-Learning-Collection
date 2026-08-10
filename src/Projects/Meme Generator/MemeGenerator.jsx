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
          <main className='w-100 vh-100 container-fluid d-flex flex-column flex-lg-row'>
            <InputForm />
            <OutputContainer />
          </main>
        </MainContentProvider>
        <Footer />
    </>
  )
}

export default MemeGenerator