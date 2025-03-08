import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HostVans = () => {
  const [hostVans, setHostVans] = useState([]);

  useEffect(() => {
    fetch('/api/host/vans')
      .then(res => res.json())
      .then(data => setHostVans(data.vans))
  }, []);

  const hostVansList = hostVans.map((van, index) => (
    <div className='col-12 col-sm-6 col-md-4 mb-4' key={index}>
      <Link to={van.id}>
      <div className='card' key={van.id}>
        <div className='row g-0'>
          <div className='col-3'>
            <img src={van.imageUrl} className='img-fluid rounded-start' alt={van.name} width="100px" height="100px" />
          </div>
          <div className='col-8'>
            <div className='card-body'>
              <h5 className='card-title'>{van.name}</h5>
              <p className='card-text'>${van.price} /day</p>
            </div>
          </div>
        </div>
      </div>
      </Link>
    </div>
  ));

  return (
    <div className='mt-3'>
      <h2 className='py-3'>Your listed vans</h2>
      <div className='row'>
        {hostVansList}
      </div>
    </div>
  )
}

export default HostVans