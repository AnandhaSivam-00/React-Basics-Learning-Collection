import React, { useState, useRef, useEffect } from 'react'
import './index.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti-boom';
import Header from './components/Header'
import CountModal from './components/CountModal';
// import Timer from './components/Timer';

const MainContent = () => {
    const generateNewDice = () => {
        // const numArray = [];
        // for(let i=0; i<10; i++) {
        //     const rand = Math.ceil(Math.random() * 10);
        //     numArray.push(rand);
        // }

        // return numArray;

        return new Array(10) // Create an new array and Declare the array size
            .fill(0) // Fill a array with an fixed number
            .map(() => ({
                id: nanoid(), // Using this to generator an random id for an dice
                value: Math.ceil(Math.random() * 9),
                isClicked: false
            })) // Change the array elements using map method
    }

    const [diceNumbers, setDiceNumbers] = useState(() => generateNewDice());
    /**
     * Lazy initialization means that the function passed to `useState` will run only once, 
     * during the initial render of the component. This is particularly useful if the state 
     * initialization is expensive, as it avoids recalculating the initial state on every re-render.
    */

    const [showModal, setShowModal] = useState(false); // New state for modal visibility
    const [buttonClickCount, setButtonClickCount] = useState(0);
    const [timeTaken, setTimeTaken] = useState(() => Date.now());


    const buttonRef = useRef(null);

    // Check every time the game is finished or not when the changes happened
    const isGameWon = diceNumbers.every(die => die.value === diceNumbers[0].value) &&
        diceNumbers.every(die => die.isClicked)

    useEffect(() => {
        if (isGameWon) {
            const finishedTime = Date.now();
            const elapsedSeconds = ((finishedTime - timeTaken) / 1000).toFixed(2);
            setTimeTaken(elapsedSeconds);

            // Focus the button as before
            buttonRef.current.focus();
            // Set up the timeout only when isGameWon is true
            setTimeout(() => {
                setShowModal(true);
                console.log('Game Won!');
            }, 4000);
        } 
        else {
            setShowModal(false);
        }
        // return () => {
        //     // Clear the timeout when the effect is cleaned up
        //     if(timeoutId) clearTimeout(timeoutId);
        // };
    }, [isGameWon])

    const rollDice = () => {
        if(isGameWon) {
            setDiceNumbers(generateNewDice());
            setTimeTaken(Date.now())
            return;
        }
        setDiceNumbers(oldDice => oldDice.map((die) => (
                !die.isClicked ? { ...die, value: Math.ceil(Math.random() * 9) } : die
            )
        ));
        setButtonClickCount((prevCount) => prevCount + 1);
    }

    const holdDie = (id) => {
        setDiceNumbers(oldDice => oldDice.map((die) => (
                die.id === id ? { ...die, isClicked: !die.isClicked } : die
            )
        ) )

    }

    const generateRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const extraColors = new Array(20).fill(0).map(generateRandomColor);
    const confettiColors = ['#ff577f', '#ff884b', '#ffd700', '#00fa9a', '#1e90ff', '#ff69b4', ...extraColors];

    // New handler to close the modal when 'X' is clicked
    const handleCloseModal = () => {
        setShowModal(false);
        setButtonClickCount(0);
    }

    return (
        <>
        {isGameWon && (
            <Confetti 
                spreadDeg={90}
                shapeSize={17}
                mode="boom" 
                particleCount={200} 
                colors={confettiColors} 
            />
        )}

        {/* Adding an accessablity improvement to the game */}
        <div aria-live='polite' aria-atomic='true' className='visually-hidden'>
            {isGameWon && <p>Game Won! Click the button to start a new game.</p>}
        </div>

        <div 
            className='tenzies-body d-flex justify-content-center align-items-center'
            style={{ filter: showModal ? 'blur(1.5px)' : 'none' }}
        >
            <main className='d-flex flex-column justify-content-center align-items-center rounded tenzies-main'>
                {/* <div className='ms-auto me-3 mt-3'>
                    <Timer />
                </div> */}
                <Header />
                <div className='row row-cols-5 gy-4 die-container'>
                    { diceNumbers.map((numObj) => (
                        <div className='col' key={numObj.id}>
                            <Die 
                                id={numObj.id}
                                dieNumber={numObj.value} 
                                isClicked={numObj.isClicked} 
                                holdDie={holdDie}
                            />
                        </div>
                    )) }
                </div>
                <div className='mt-5 game-btn-container'>
                    <button 
                        className='btn focus-ring focus-ring-primary shadow die-roll-btn'
                        onClick={rollDice}
                        ref={buttonRef}
                        aria-label={isGameWon ? 'Start new game' : 'Roll'}
                        data-bs-toggle='modal'
                        data-bs-target='#staticBackdrop'
                    >
                        {isGameWon ? 'Start New Game' : 'Roll'}
                    </button>
                </div>
            </main>
        </div>
        <CountModal 
            show={showModal} 
            buttonClickCount={buttonClickCount}
            timeTaken={timeTaken}
            onClose={handleCloseModal}
        />
        </>
    )
}

export default MainContent