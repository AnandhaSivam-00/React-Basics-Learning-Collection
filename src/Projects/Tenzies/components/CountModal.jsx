import React from 'react'

const CountModal = (props) => {

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    let formattedTime = '';
    
    if(hours > 0) { 
      formattedTime = ( 
        <>
          <p className='fs-4 text-primary mb-auto'><strong>{hours}</strong></p>
          <p className='text-secondary'>{hours > 1 ? 'Hours' : 'Hour'}</p>
        </>
      )  
    }
    else if(minutes > 0) {
      formattedTime = ( 
        <>
          <p className='fs-4 text-primary mb-auto'><strong>{minutes}</strong></p>
          <p className='text-secondary'>{minutes > 1 ? 'Minutes' : 'Minute'}</p>
        </>
      )  
    }
    else {
      formattedTime = ( 
        <>
          <p className='fs-4 text-primary mb-auto'><strong>{seconds}</strong></p>
          <p className='text-secondary'>{seconds !== 1 ? 'Seconds' : 'Second'}</p>
        </>
      )  
    }
    
    return formattedTime;

  };

  return (
    <div
      className={`modal fade ${props.show ? 'show' : ''} `}
      style={{ display: props.show ? 'block' : 'none' }}
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden={!props.show}
    >
      <div className="modal-dialog">
        <div className="modal-content text-white bg-dark">
          <div className="modal-header">
            <h1 className="modal-title fs-5 me-3" id="staticBackdropLabel">Total Clicks! </h1>
            <h3 className="modal-title fs-2">{props.buttonClickCount}</h3>
            <button
              type="button"
              className="btn-close bg-white"
              aria-label="Close"
              onClick={props.onClose} // Close only with this button
            ></button>
          </div>
          <div className="modal-body d-flex flex-column justify-content-center align-items-center">
            <h3 className='fs-5 mb-3'>Time Taken</h3>
            {formatTime(props.timeTaken)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountModal