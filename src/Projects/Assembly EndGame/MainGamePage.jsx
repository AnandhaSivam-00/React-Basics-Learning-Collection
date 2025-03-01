import React, { useState, useEffect } from 'react'
import clsx from 'clsx';
import Confetti from 'react-confetti-boom';
import { languages } from './assets/languages';
import Header from './components/Header'
import './index.css';
import Footer from './components/Footer';
import Notification from './components/Notification';
import LanguageChips from './components/LanguageChips';
import { getRandomWord } from './assets/words';
import { getRandomWordFromAI } from './assets/AiRandomWordGenerator';

/**
 * Try to use the useCallBack hook to memoize the function and avoid unnecessary re-renders
 * For API fetching functions, it is better to use the useAsync hook to handle the loading state
 */

const MainGamePage = () => {
  // State variables
  const [currentWord, setCurrentWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch AI word when component mounts
  useEffect(() => {
    async function fetchAIWord() {
      setLoading(true);
      try {
        const word = await getRandomWordFromAI();

        if(word) {
          setCurrentWord(word);
          setLoading(false);
        }
      } 
      catch (error) {
        console.error("Error fetching AI word:", error);
        setAiGeneratedWord("Error loading word");
      }
    }
    
    fetchAIWord();
  }, []);

  // Derived value
  const wrongGuessedWordCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length;
  const isGameOver = wrongGuessedWordCount >= languages.length - 1;
  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter));

  /**
   * To update the notification section, if the use clicks the wrong letter
   * So that lastest clicked letter is compared with the current word to avoid the duplicate comparison 
   * */
  const isLatestGuessWrong = guessedLetters.length > 0 && !currentWord.includes(guessedLetters[guessedLetters.length - 1]);

  // Static value
  const alphabets = 'abcdefghijklmnopqrstuvwxyz';

  const handleKeyClick = (letter) => {
    setGuessedLetters(prevLetters => 
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  const handleNewGameButton = async () => {
    setGuessedLetters([]);
    
    // Optionally use AI word for next game
    try {
      const newWord = await getRandomWordFromAI();
      if (newWord) {
        setCurrentWord(newWord.toLowerCase());
      } 
      else {
        setCurrentWord(getRandomWord());
      }
    } 
    catch (error) {
      console.error("Failed to get AI word:", error);
      setCurrentWord(getRandomWord());
    }
  }

  const keyboardElement = alphabets.split("").map((letter, index) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    /**
     * Iteratively checks the guessed letters against the current word.
     * If the guessed letter is in the current word, it is considered correct.
     * If the guessed letter is not in the current word, it is considered wrong.
     */

    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      // If you make the button as a seperate component, then you cannot use the 'Tab' key to navigate through the buttons
      // So, it is better to keep the button as a single element
      <button 
        className={`btn rounded m-1 ${className}`}
        onClick={() => handleKeyClick(letter.toLowerCase())}
        disabled={isGameOver || isGameWon}
        aria-disabled={guessedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}
        key={index}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const generateRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  const extraColors = new Array(20).fill(0).map(generateRandomColor);
  const confettiColors = ['#ff577f', '#ff884b', '#ffd700', '#00fa9a', '#1e90ff', '#ff69b4', ...extraColors];

  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-black endgame-main'>
        {
          (isGameWon && !loading) && (
            <Confetti 
                spreadDeg={90}
                shapeSize={17}
                mode="boom" 
                particleCount={200} 
                colors={confettiColors} 
                recycle={false}
            />
          )
        }
        <Header />
        { guessedLetters.length > 0 && (
          <Notification 
            isGameWon={isGameWon} 
            isGameOver={isGameOver}
            isLatestGuessWrong={isLatestGuessWrong}
            lostLanguageIndex={wrongGuessedWordCount - 1}
          /> )
        }
        <div className='p-2 m-2'>
          <LanguageChips lostCount={wrongGuessedWordCount} />
        </div>
        <section className='my-5 p-1'>
            {
              loading ? (
                <p className='text-white m-2'>Wait... I'm loading the word using Gemini AI 🤪</p>
              ) : (
                !isGameOver ? (
                  currentWord.split("").map((letter, index) => (
                    <span key={index} className='text-white m-1 py-2 px-3 letter-box'>
                      {guessedLetters.includes(letter) ? letter.toUpperCase() : "?"}
                    </span>
                  ))
                ) : (
                  currentWord.split("").map((letter, index) => {
                    const isMissedLetter = !guessedLetters.includes(letter);

                    const className = clsx({
                      'missed-letter-style': isMissedLetter
                    });

                    return (
                    <span key={index} className={`m-1 py-2 px-3 letter-box ${className}`}>
                      { letter.toUpperCase() }
                    </span>
                  )
                })
              ))
            }
        </section>
        <section 
          className='d-flex flex-wrap justify-content-center align-items-center border rounded m-2 p-2' 
          style={{maxWidth: '650px'}}
        >
          { keyboardElement }
        </section>
        <div className='mt-4'>
          { guessedLetters.length > 0 && (
            <button 
              className='btn' 
              style={{backgroundColor: 'lightblue'}}
              onClick={handleNewGameButton}
            >
              New Game
            </button>
          ) }
        </div>
        <Footer />
    </div>
  )
}

export default MainGamePage