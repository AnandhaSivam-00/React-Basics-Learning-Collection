import React from 'react'
import '../index.css'

const Card = () => {
  return (
    <div className='card shadow w-50'>
        <img 
            src='src\React Router Projects\VanLife\assets\Images\van-camp.png' 
            className='card-img-top rounded' 
            alt='van' 
        />
        <div className='card-body'>
            <div className='row'>
                <div className='col-6'>
                    <h5 className='card-title'>Van Name</h5>
                </div>
                <div className='col-6'>
                    <div className='float-end'>
                        <span className='d-block' style={{fontWeight: "600", fontSize: "20px"}}>$100</span>
                        <span className='d-block float-end'>/day</span>
                    </div>
                </div>
            </div>
            <span className='badge text-bg-primary text-black'>Simple</span>
        </div>
    </div>
  )
}

export default Card