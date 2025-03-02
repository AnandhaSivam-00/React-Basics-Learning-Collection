import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './server/server';
import Card from './components/Card';

const VansList = () => {
    const [vansData, setVansData] = useState([]);

    useEffect(() => {
        fetch("/api/vans")
            .then(response => response.json())
            .then(data => setVansData(data.vans));
    }, [])

    const vansList = vansData.map((items) => (
        <div className='col-6 col-sm-4 col-md-3 mb-4' key={items.id}>
            <Link 
                to={`/vans/${items.id}`}
                aria-label={`View details for ${items.name}, priced at $${items.price} per day`}
            >
                <Card
                    key={items.id}
                    name={items.name}
                    price={items.price}
                    imageUrl={items.imageUrl}
                    type={items.type}
                />
            </Link>
        </div>
    ))

  return (
    <section className='container-fluid' style={{marginTop: "100px"}}>
        <div className='mt-5 p-2'>
            <h2 className='mt-4' style={{fontWeight: "700"}}>Explore our van options</h2>
        </div>
        <div className='d-flex justify-content-between m-1'>
            <button className='btn rounded btn-filter m-2'>Simple</button>
            <button className='btn rounded btn-filter m-2'>Luxury</button>
            <button className='btn rounded btn-filter m-2'>Rugged</button>
            <button className='btn rounded btn-filter m-2'>Clear filters</button>
        </div>
        <div className='row mt-3 p-2'>
            {vansList.length > 0 ? vansList : <p>No vans available</p>}
        </div>
    </section>
  )
}

export default VansList