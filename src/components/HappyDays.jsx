import React from 'react';
import { Link } from 'react-router-dom';

const HappyDays = () => {
    const time = new Date();
    const day = time.toLocaleDateString('en-US', { weekday: 'long'}); // weekday: 'long' returns the full name of the day of the week
    console.log(day);
    let dayMessage = '';

    switch(day.toLowerCase()) {
        case 'monday':
            dayMessage = `Happy ${day}!`;
            break;
        case 'tuesday':
            dayMessage = `Happy ${day}!`;
            break;
        case 'wednesday':
            dayMessage = `Happy ${day}!`;
            break;
        case 'thursday':
            dayMessage = `Happy ${day}!`;
            break;
        case 'friday':
            dayMessage = `Happy ${day}!`;
            break;
        default:
            dayMessage = 'Enjoy your Holidays!!!';
    }

  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-12 text-center'>
                <h1>{dayMessage}</h1>
            </div>
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center mt-3">
            <Link to="/chief-mistral">
                <button className="btn btn-primary me-3">Chief Mistral</button>
            </Link>
            <Link to="/reactfacts">
                <button className="btn btn-primary me-3">React Facts</button>
            </Link>
            <Link to="/travel-journal">
                <button className="btn btn-primary me-3">Travel Journal</button>
            </Link>
            <Link to="/tenzies-game">
                <button className="btn btn-primary me-3">Tenzies Game</button>
            </Link>
            <Link to="/assembly-endgame">
                <button className="btn btn-primary me-3">Assembly Endgame</button>
            </Link>
            <Link to="/vanslife">
                <button className="btn btn-primary">VansLife</button>
            </Link>
            <Link to="/moody/login">
                <button className="btn btn-primary ms-3">Moody</button>
            </Link>
        </div>
    </div>
  )
}

export default HappyDays