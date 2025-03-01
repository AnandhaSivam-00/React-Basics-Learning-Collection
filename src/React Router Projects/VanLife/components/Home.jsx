import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css';

const Home = () => {
  return (
    <main className='container-fluid d-flex flex-column justify-content-center align-items-center text-white home-container'>
      <h1 className='mb-5'>You got the travel plans, we got the travel vans.</h1>
      <p>Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.</p>
      <div className='text-white'>
        <Link to='/vans' className='btn btn-lg rounded mt-5'>Find your van</Link>
      </div>
    </main>
  )
}

export default Home