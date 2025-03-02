import React from 'react'
import '../index.css'
import clsx from 'clsx'

const Card = (props) => {
  const className = clsx({
    'badge-simple': props.type === 'simple',
    'badge-luxury': props.type === 'luxury',
    'badge-rugged': props.type === 'rugged'
  }) 

  return (
    <div className='card shadow'>
        <img 
            src={props.imageUrl} 
            className='card-img-top rounded' 
            alt={`Image of ${props.name}`}
        />
        <div className='card-body'>
            <div className='row'>
                <div className='col-9'>
                    <h5 className='card-title'>{props.name}</h5>
                </div>
                <div className='col-3'>
                    <div className='float-end'>
                        <span className='d-block' style={{fontWeight: "600", fontSize: "20px"}}>${props.price}</span>
                        <span className='d-block float-end'>/day</span>
                    </div>
                </div>
            </div>
            <span className={`badge ${className} text-black`}>{
                props.type === 'simple' ? "Simple" : props.type === 'luxury' ? "Luxury" : 
                props.type === 'rugged' ? "Rugged" : null
            }</span>
        </div>
    </div>
  )
}

export default Card