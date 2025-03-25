import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import '../../index.css'

const HostLayout = () => {
  return (
    <>
       <div className='container-fluid mt-5' style={{paddingTop: '3rem'}}>
            <nav className='col-12 col-md-6 col-sm-6 m-0 p-1'>
                <NavLink to="." className={({ isActive }) => isActive ? 'nav-active me-4' : 'me-4'}>Dashboard</NavLink>
                <NavLink to="income" className={({ isActive }) => isActive ? 'nav-active mx-4' : 'mx-4'}>Income</NavLink>
                <NavLink to="vans" className={({ isActive }) => isActive ? 'nav-active mx-4' : 'mx-4'}>Vans</NavLink>
                <NavLink to="reviews" className={({ isActive }) => isActive ? 'nav-active ms-4' : 'ms-4'}>Reviews</NavLink>
            </nav>
            <Outlet />
       </div>
    </>
  )
}

export default HostLayout