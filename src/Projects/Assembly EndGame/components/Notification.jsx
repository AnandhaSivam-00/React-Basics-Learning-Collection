import React from 'react'
import { getFarewellText } from '../assets/farewell_messages';
import { languages } from '../assets/languages';
import '../index.css';
import clsx from 'clsx';

const Notification = (props) => {
  const notificationClass = clsx({
    'game-won': props.isGameWon,
    'game-lost': props.isGameLost,
    'wrong-selection': props.isLatestGuessWrong
  });

  return (
      <section 
        className={`d-flex flex-column justify-content-center align-items-center text-white m-1 p-2 ${notificationClass}`}
        aria-live='polite'
        role='status'
      >
        {props.isLatestGuessWrong ? ( <h3 className='p-2'>{getFarewellText(languages[props.lostLanguageIndex].name)}</h3> ) : (
          props.isGameWon ? ( 
            <>
              <h3 className='p-2'>You won!</h3>
              <p>Well done! 🥳</p>
            </> 
          ) : props.isGameLost ? ( 
            <>
              <h3 className='p-2'>You lost</h3> 
              <p>Try again... 🤗</p>
            </>
          ) : null
        )}
      </section>
  )
}

export default Notification