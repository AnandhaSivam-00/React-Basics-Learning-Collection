import React, { Suspense } from 'react'
import {
  NavLink,
  Link,
  Outlet,
  useOutletContext,
  useLoaderData,
  Await
} from 'react-router-dom';
import '../../index.css'

import { getHostVan } from '../../server/ApiCalls';
import { requireAuth } from '../../server/utils';

export const hostVanDetailLoader = async ({ params, request }) => {
  await requireAuth(request);
  return {
    hostVanData: await getHostVan(params.id)
  }
}

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
  const { hostVanData } = useLoaderData();

  const hostVanRender = (vanData) => {

    return (
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
        <div className='col-6 col-md-6 col-sm-6 d-flex flex-column justify-content-start align-items-start'>
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
          <Outlet context={{ currentVan: vanData }} />
        </div>
      </div>
    )
  }

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
          backgroundColor: "wheat",
          minWidth: "300px",
          maxWidth: "600px"
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={hostVanData}>
            {hostVanRender}
          </Await>
        </Suspense>
      </article>
    </section>
  )
}

export default HostVansDetails