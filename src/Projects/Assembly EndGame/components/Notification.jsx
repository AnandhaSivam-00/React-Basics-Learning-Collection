import React from 'react'
import { getFarewellText } from '../assets/farewell_messages';
import { languages } from '../assets/languages';
import '../index.css';
import clsx from 'clsx';

const Notification = (props) => {
  const isGameLost = props.isGameOver && !props.isGameWon;
  const showFarewell = props.isLatestGuessWrong && !props.isGameOver && !props.isGameWon;

  const notificationClass = clsx({
    'game-won': props.isGameWon,
    'game-lost': isGameLost,
    'wrong-selection': showFarewell
  });

  if(!props.isGameWon && !isGameLost && !showFarewell) {
    /**
     * If no notification should be shown (e.g. correct guess in middle of game)
     * we return a visually hidden empty section to maintain layout height or just empty.The original didn't 
     * mount unless guessedLetters.length > 0 but we might have a correct first guess.Let's render 
     * an invisible spacer to keep UI from jumping, or just nothing.The original just rendered the section with no content inside 
     * if it wasn't wrong, won, or lost.
     * */
    return (
      <section className='d-flex flex-column justify-content-center align-items-center m-1 p-2 notification-container' style={{ visibility: 'hidden' }}></section>
    );
  }

  return (
      <section 
        className={`d-flex flex-column justify-content-center align-items-center text-white m-1 p-2 notification-container ${notificationClass}`}
        aria-live='polite'
        role='status'
      >
        {props.isGameWon ? ( 
          <>
            <h3 className='p-2 m-0'>You win!</h3>
            <p className='m-0 pb-2'>Well done! 🥳</p>
          </> 
        ) : isGameLost ? ( 
          <>
            <h3 className='p-2 m-0'>Game over!</h3> 
            <p className='m-0 pb-2'>You lose! Better start learning Assembly 😭</p>
          </>
        ) : showFarewell ? (
          <p className='p-2 m-0 fst-italic'>{getFarewellText(languages[props.lostLanguageIndex].name)}</p>
        ) : null}
      </section>
  )
}

export default Notification 