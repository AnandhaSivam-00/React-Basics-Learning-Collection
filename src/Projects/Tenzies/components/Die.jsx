import React from 'react'
import '../index.css';

const Die = (props) => {
    const styles = {
        backgroundColor: props.isClicked ? "#59E391": "gray"
    }

  return (
    <button 
        className='d-inline-flex m-0 btn rounded text-white shadow die-outer'
        style={styles}
        onClick={() => props.holdDie(props.id)}
        aria-label={`Die with a value of ${props.dieNumber},
        click to ${props.isClicked ? 'unfreeze' : 'freeze'} this die.`}
        aria-pressed={props.isClicked} // Improving the accessablity of the button
    >
        {props.dieNumber}
    </button>
  )
}

export default Die