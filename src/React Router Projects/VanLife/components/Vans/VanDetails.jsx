import React, { Suspense } from 'react';
import { 
    useLocation, 
    Link, 
    useLoaderData, 
    Await
} from 'react-router-dom'

import '../../index.css';
import '../../server/server';
import { getVan } from '../../server/ApiCalls';
import { requireAuth } from '../../server/utils';

export const vanDetailsLoader = async ({ params, request }) => {
    await requireAuth(request);
    return {
        vanData: getVan(params.id)
    };
}

const VanDetails = () => {
    const location = useLocation(); // {pathname: "/1", search: "", hash: "", state: undefined, key: "1"}

    const { vanData } = useLoaderData();
    console.log(vanData.imageUrl);

    const renderVanData = (data) => {
        return (
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
        )
    }

  return (
    <section className='container-fluid van-details' style={{marginTop: "100px"}}>
          <div className='mt-5 p-2'>
              <Link
                  to={`..?${location.state?.search || ''}`} // ? --> important to note this
                  // I used the conditional chaining operator to avoid an error if location.state is undefined
                  // that's equal to location.state && location.state.search
                  relative='path'
                  className='text-black text-decoration-underline'
              >
                  &lt; Back to {location.state?.type || 'all'} vans
              </Link>
          </div>
          <Suspense fallback={<p className="text-center my-5">Loading van details...</p>}>
            <Await resolve={vanData}>
                {renderVanData}
            </Await>
          </Suspense>
    </section>
  )
}

export default VanDetails