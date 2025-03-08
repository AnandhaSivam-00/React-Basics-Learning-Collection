import React from 'react'
import { useRouteError } from 'react-router-dom'

const Errors = () => {
    const error = useRouteError();
    console.log(error);

    return (
        <div className='' style={{marginTop: '300px'}}>
            <h3 className='text-italic text-center text-3xl'>Opsss....😥</h3>
            <p className='text-center text-xl'>Please try again later</p>
        </div>
    )
}

export default Errors