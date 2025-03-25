import React, { Suspense } from 'react'
import {
  Link,
  useLoaderData,
  Await
} from 'react-router-dom'

import { getHostVans } from '../../server/ApiCalls';
import { requireAuth } from '../../server/utils';

// import { addVansToFirestore } from '../../server/ApiCalls';

export const hostVansLoader = async ({ request }) => {
  await requireAuth(request);
  return {
    hostVansData: getHostVans()
  }
}

const HostVans = () => {
  const { hostVansData } = useLoaderData();

  const hostVansRender = (hostVans) => {
    const hostVansList = hostVans.map((van, index) => (
      <div className='col-12 col-sm-6 col-md-4 mb-4' key={index}>
        <Link to={van.id}>
          <div className='card shadow' key={van.id}>
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
      <div className='row'>
        {hostVansList}
      </div>
    )
  }

  // In a React component or other entry point
// const importData = async () => {
//   const result = await addVansToFirestore();
//   if (result) {
//     alert("Vans data has been successfully imported to Firestore!");
//   } else {
//     console.log("Failed to import vans data to Firestore. Check console for errors.");
//   }
// };


  return (
    <div className='mt-3'>
      <h2 className='py-3'>Your listed vans</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={hostVansData} >
          {hostVansRender}
        </Await>
      </Suspense>
      {/* <button onClick={importData}>Import Vans Data</button> */}
    </div>
  )
}

export default HostVans