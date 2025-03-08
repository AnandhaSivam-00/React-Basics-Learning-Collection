import React, { useEffect, useState } from 'react'
import { useParams, NavLink, Link, Outlet, useOutletContext } from 'react-router-dom';
import '../../index.css'

export const HostVanPricing = () => {
  const { currentVan } = useOutletContext();
  if (!currentVan) return <p>Loading...</p>;
  return (
    <p style={{ fontWeight: "700" }}>${currentVan.price}<span style={{ fontWeight: "300" }}>/day</span></p>
  )
}

export const HostVanPhoto = () => {
  const { currentVan } = useOutletContext();
  if (!currentVan) return <p>Loading...</p>;
  return (
    <img 
      src={currentVan.imageUrl} 
      alt={`Image of ${currentVan.name}`} 
      className='img-fluid rounded' 
      width="100px"
      height="100px"
    />
  )
}

export const HostVanDetail = () => {
  const { currentVan } = useOutletContext();
  if (!currentVan) return <p>Loading...</p>;
  return (
    <div>
      <h2>{currentVan.name}</h2>
      <p>{currentVan.description}</p>
    </div>
  )
}

const HostVansDetails = () => {
  const { id } = useParams();
  const [vanData, setVanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/host/vans/${id}`)
      .then(res => res.json())
      .then(data => {
        setVanData(data.vans[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching van data:", err);
        setError("Failed to fetch van data");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className='container-fluid van-details'>
        <div className='mt-5 p-2'>
            <Link 
              to='..' 
              relative='path'
              className='text-black text-decoration-underline'
            >
              Back to all vans
            </Link>
        </div>
          <article className='m-auto my-3 p-3 rounded' 
            style={{
              backgroundColor: "gray",
              minWidth: "300px",
              maxWidth: "600px"
            }}
          >
              <div className='row g-2'>
                  <div className='col-6 col-md-6 col-sm-6 mx-auto'>
                      <img 
                        src={vanData.imageUrl} 
                        alt={`Image of ${vanData.name}`} 
                        className='img-fluid rounded' 
                        width="197.32px"
                        height="190.35px"
                      />
                  </div>
                  <div className='col-6 col-md-6 col-sm-6 mx-auto'>
                      <span className={`badge badge-${vanData.type} p-2 mt-4`}>{
                          vanData.type === 'simple' ? "Simple" : vanData.type === 'luxury' ? "Luxury" :
                              vanData.type === 'rugged' ? "Rugged" : null
                      }</span>
                      <h3 className='mt-3' style={{ fontWeight: "700" }}>{vanData.name}</h3>
                      <p style={{ fontWeight: "700" }}>${vanData.price}<span style={{ fontWeight: "300" }}>/day</span></p>
                  </div>
                  <div className='col-12 col-md-12 col-sm-12 mx-auto'>
                    <div className='m-2 p-1'>
                      <NavLink to="." className={({ isActive }) => isActive ? 'nav-active me-4' : 'me-4'}>Details</NavLink>
                      <NavLink to="pricing" className={({ isActive }) => isActive ? 'nav-active mx-4' : 'mx-4'}>Pricing</NavLink>
                      <NavLink to="photos" className={({ isActive }) => isActive ? 'nav-active ms-4' : 'ms-4'}>Photo</NavLink>
                    </div>
                    <Outlet context={{ currentVan: vanData }}/>
                  </div>
              </div>
          </article>
    </section>
  )
}

export default HostVansDetails