import React, { useState, useEffect, useCallback } from 'react'
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

const MainGamePage = () => {
  // State variables
  const [currentWord, setCurrentWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [loading, setLoading] = useState(true);

  // Memoized function to fetch a word - prevents recreation on every render
  const fetchWord = useCallback(async () => {
    setLoading(true);
    try {
      // Add a timeout to prevent long waits
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 5000)
      );
      
      // Race the API call against the timeout
      const word = await Promise.race([
        getRandomWordFromAI(),
        timeoutPromise
      ]);
      
      if (word && typeof word === 'string' && word.length > 0) {
        // Clean the word - remove any non-alphabetic characters
        const cleanWord = word.toLowerCase().trim().replace(/[^a-z]/g, '');
        
        // Only use the word if it's valid after cleaning
        if (cleanWord.length >= 3) {
          setCurrentWord(cleanWord);
          return;
        }
      }
      throw new Error('Invalid word received');
    } 
    catch (error) {
      console.error("Error fetching word:", error);
      // Fallback to local word list
      setCurrentWord(getRandomWord());
    }
    finally {
      setLoading(false);
    }
  }, []);

  // Fetch word on component mount
  useEffect(() => {
    fetchWord();
  }, [fetchWord]);

  // Derived values - memoize these if performance becomes an issue
  const wrongGuessedWordCount = guessedLetters.filter(letter => 
    !currentWord.includes(letter)).length;
  const isGameOver = wrongGuessedWordCount >= languages.length - 1;
  const isGameWon = currentWord && 
    currentWord.split("").every(letter => guessedLetters.includes(letter));
  const isLatestGuessWrong = guessedLetters.length > 0 && 
    !currentWord.includes(guessedLetters[guessedLetters.length - 1]);

  // Handle key click
  const handleKeyClick = useCallback((letter) => {
    setGuessedLetters(prevLetters => 
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }, []);

  // Start a new game
  const handleNewGameButton = useCallback(() => {
    setGuessedLetters([]);
    fetchWord();
  }, [fetchWord]);

  // Keyboard element generation
  const keyboardElement = alphabets.split("").map((letter, index) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);

    return (
      <button 
        className={clsx('btn', 'rounded', 'm-1', {
          'correct': isCorrect,
          'wrong': isWrong
        })}
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

  // Generate confetti colors
  const generateRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  const extraColors = new Array(20).fill(0).map(generateRandomColor);
  const confettiColors = ['#ff577f', '#ff884b', '#ffd700', '#00fa9a', '#1e90ff', '#ff69b4', ...extraColors];

  // Constants
  const alphabets = 'abcdefghijklmnopqrstuvwxyz';

  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-black endgame-main'>
        {(isGameWon && !loading) && (
          <Confetti 
              spreadDeg={90}
              shapeSize={17}
              mode="boom" 
              particleCount={200} 
              colors={confettiColors} 
              recycle={false}
          />
        )}
        <Header />
        
        {guessedLetters.length > 0 && (
          <Notification 
            isGameWon={isGameWon} 
            isGameOver={isGameOver}
            isLatestGuessWrong={isLatestGuessWrong}
            lostLanguageIndex={wrongGuessedWordCount - 1}
          />
        )}
        
        <div className='p-2 m-2'>
          <LanguageChips lostCount={wrongGuessedWordCount} />
        </div>
        
        <section className='my-5 p-1'>
            {loading ? (
              <p className='text-white m-2'>
                Wait... I'm loading the word using Gemini AI 🤪
              </p>
            ) : !isGameOver ? (
              currentWord.split("").map((letter, index) => (
                <span key={index} className='text-white m-1 py-2 px-3 letter-box'>
                  {guessedLetters.includes(letter) ? letter.toUpperCase() : "?"}
                </span>
              ))
            ) : (
              currentWord.split("").map((letter, index) => (
                <span 
                  key={index} 
                  className={clsx('m-1', 'py-2', 'px-3', 'letter-box', {
                    'missed-letter-style': !guessedLetters.includes(letter)
                  })}
                >
                  {letter.toUpperCase()}
                </span>
              ))
            )}
        </section>
        
        <section 
          className='d-flex flex-wrap justify-content-center align-items-center border rounded m-2 p-2' 
          style={{maxWidth: '650px'}}
        >
          {keyboardElement}
        </section>
        
        <div className='mt-4'>
          {(guessedLetters.length > 0 || isGameOver || isGameWon) && (
            <button 
              className='btn' 
              style={{backgroundColor: 'lightblue'}}
              onClick={handleNewGameButton}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'New Game'}
            </button>
          )}
        </div>
        
        <Footer />
    </div>
  );
};

export default MainGamePage;