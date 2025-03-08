import React from 'react'
import { useSearchParams, Link, useLoaderData } from 'react-router-dom'

import '../../server/server';
import { getVans } from '../../server/ApiCalls'
import Card from '../Card';

import '../../index.css';

export const vansLoader = () => {
    return getVans();
}

const VansList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get('type'); 

    const vansData = useLoaderData();

    const filteredVansDetails = !filter ? vansData :
        vansData.filter((vans) => vans.type === filter);

    const handleFilterChange = (key, value) => {
        setSearchParams(prevSearch => {
            if (value === null) {
                prevSearch.delete(key)
            }
            else {
                prevSearch.set(key, value);
            }
            return prevSearch;
        })
    }

    const vansList = filteredVansDetails.map((items) => (
        <div className='col-6 col-sm-6 col-md-3 mb-4' key={items.id}>
            <Link
                to={items.id}
                state={{
                    search: searchParams.toString(),
                    type: filter
                }}
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
    ));

    return (
        <section className='container-fluid' style={{ marginTop: "100px" }}>
            <div className='mt-5 p-2'>
                <h2 className='mt-4' style={{ fontWeight: "700" }}>Explore our van options</h2>
            </div>

            <div className='d-flex justify-content-center m-1'>
                <button
                    className={`btn rounded btn-filter m-2 ${filter === "simple" ? "btn-filter-selected" : ""}`}
                    onClick={() => handleFilterChange("type", "simple")}
                >
                    Simple
                </button>
                <button
                    className={`btn rounded btn-filter m-2 ${filter === "luxury" ? "btn-filter-selected" : ""}`}
                    onClick={() => handleFilterChange("type", "luxury")}
                >
                    Luxury
                </button>
                <button
                    className={`btn rounded btn-filter m-2 ${filter === "rugged" ? "btn-filter-selected" : ""}`}
                    onClick={() => handleFilterChange("type", "rugged")}
                >
                    Rugged
                </button>
                {!filter ? null : (
                    <button className='btn rounded btn-filter-clear m-2' onClick={() => handleFilterChange("type", null)}>Clear filters</button>
                )}
            </div>
            <div className='row mt-3 p-2'>
                {vansList.length > 0 ? vansList : <p>No vans available</p>}
            </div>
        </section>
    )
}

export default VansList