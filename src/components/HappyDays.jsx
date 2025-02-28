import React from 'react'

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
    </div>
  )
}

export default HappyDays