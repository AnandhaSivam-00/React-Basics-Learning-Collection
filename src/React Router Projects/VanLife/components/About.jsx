import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <section className='about' style={{marginTop: "80px"}}>
      <div className='row m-0 p-0'>
          <img
            src='src/React Router Projects/VanLife/assets/Images/van-camp.png'
            alt='van with a camp image'
            className='img-fluid col-12 col-sm-12 col-md-6 m-0 p-0'
          />
        <div className='col-12 col-sm-12 col-md-6 mt-3'>
          <h3>Don’t squeeze in a sedan when you could relax in a van.</h3>
          <p>Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch.<br /> (Hitch costs extra 😉)</p>
          <p>Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.</p>
        </div>
      </div>
      <div className='d-flex justify-content-center align-items-center mb-3'>
        <div className='mt-3 p-4 shadow rounded explore-section'>
          <h4>Your destination is waiting.<br /> Your van is ready.</h4>
          <Link to="/vans" className='btn text-white mt-2'>Explore our vans</Link>
        </div>
      </div>
    </section>
  )
}

export default About