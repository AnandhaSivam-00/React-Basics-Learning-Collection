import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
    return (
        <div className='container-fluid d-flex flex-column justify-content-center align-items-center' style={{ height: '100vh' }}>
            <div className='row'>
                <div className='col-12 text-center'>
                    <h1>Welcome to the Sample Training Sets</h1>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 d-flex justify-content-center'>
                    <Link to="/undrilling" className="btn btn-primary m-1 p-2">Undrilling</Link>
                    <Link to="/wallet" className="btn btn-primary m-1 p-2">Wallet</Link>
                </div>
            </div>
        </div>
    )
}

export default Welcome