import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import '../index.css';

import '../server/server';

const VanDetails = () => {
    const { id } = useParams(); // {id: "1"}
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`/api/vans/${id}`)
            .then(response => response.json())
            .then(data => setData(data.vans));
    }, [id]);

  return (
    <section className='container-fluid van-details' style={{marginTop: "100px"}}>
        <div className='mt-5 p-2'>
            <Link to='/vans' className='text-black'>Back to all vans</Link>
        </div>
          <article className='my-3'>
              <div className='row'>
                  <div className='col-12 col-md-6 col-sm-12 d-flex justify-content-center'>
                      <img 
                        src={data.imageUrl} 
                        alt={`Image of ${data.name}`} 
                        className='img-fluid rounded' 
                        width="497.32px"
                        height="490.35px"
                      />
                  </div>
                  <div className='col-12 col-md-6 col-sm-12'>
                      <span className={`badge badge-${data.type} p-2 mt-4`}>{
                          data.type === 'simple' ? "Simple" : data.type === 'luxury' ? "Luxury" :
                              data.type === 'rugged' ? "Rugged" : null
                      }</span>
                      <h1 className='mt-3' style={{ fontWeight: "700" }}>{data.name}</h1>
                      <p style={{ fontWeight: "700" }}>${data.price}<span style={{ fontWeight: "300" }}>/day</span></p>
                      <p style={{ fontWeight: "500" }}>{data.description}</p>
                      <button className='btn w-100'>Rent this van</button>
                  </div>
              </div>
          </article>
    </section>
  )
}

export default VanDetails