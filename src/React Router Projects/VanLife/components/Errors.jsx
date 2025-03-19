import React, { useEffect } from 'react'
import { useRouteError, useNavigate } from 'react-router-dom'

const Errors = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    useEffect(() => {
        if(error instanceof Response && error.status === 302) {
            const location = error.headers.get('Location');
            if(location) {
                navigate(location, { replace: true });
            }
        }
    }, [error, navigate]);

    if(error instanceof Response && error.status === 302) {
        return <span>Redirecting...</span>
    }

    return (
        <div className='d-flex flex-column' style={{marginTop: '300px'}}>
            <h3 className='text-italic text-center text-3xl'>Opsss....😥</h3>
            <p className='text-center text-xl'>Please try again later</p>
            <span className="text-center display-3">{error.status || "Error"}</span>
            <p className="text-center">{error.message || "An error occurred"}</p>
        </div>
    )
}

export default Errors