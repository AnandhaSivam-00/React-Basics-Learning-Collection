import React, { useState, useRef, useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti-boom';
import { notification, message } from 'antd';

import Die from '../components/Die'
import Header from '../components/Header'
import CountModal from '../components/CountModal';
import FeaturesBar from '../components/FeaturesBar';

import store from '../redux/app/store';
import { formatTimeDuration } from '../utils/TimeFormatting';
import '../index.css'

import { clearUserError, fetchUserSettingData } from '../redux/features/userSlice';
import { addUserLog, updateUserLogStatistics, fetchUserGameHistory, clearUserLogError } from '../redux/features/userLogSlice';
import { clearAuthError } from '../redux/features/authSlice';
// import Timer from './components/Timer';

const MainContentComponent = () => {
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

    const { credential, isAuthenticated, error } = useSelector((state) => state.auth);
    const { settingsData } = useSelector((state) => state.user);
    const { loading, error:logerror } = useSelector((state) => state.userlog);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [api, contextHolder] = notification.useNotification();
    const [messageApi, messageContextHolder] = message.useMessage();

    const [diceNumbers, setDiceNumbers] = useState(() => generateNewDice());
    /**
     * Lazy initialization means that the function passed to `useState` will run only once, 
     * during the initial render of the component. This is particularly useful if the state 
     * initialization is expensive, as it avoids recalculating the initial state on every re-render.
    */

    const [gameStartTime, setGameStartTime] = useState(null);
    const [gameDuration, setGameDuration] = useState(0);

    const [showModal, setShowModal] = useState(false); // New state for modal visibility
    const [buttonClickCount, setButtonClickCount] = useState(0);
    const buttonRef = useRef(null);

    useEffect(() => {
        if(!isAuthenticated && error instanceof Array) {
            navigate(error[1]);

            dispatch(clearAuthError());
        }

        if(logerror) {
            api.error({
                placement: 'bottomRight',
                message: 'Error occurred while fetching data',
                description: error,
            })

            dispatch(clearUserError());
            dispatch(clearUserLogError());
        }

        if (isAuthenticated && credential && !settingsData.length) {
            dispatch(fetchUserSettingData(credential.uid || credential.user_id));
        }

    }, [credential, isAuthenticated, dispatch]);

    // Check every time the game is finished or not when the changes happened
    const isGameWon = diceNumbers.every(die => die.value === diceNumbers[0].value) &&
        diceNumbers.every(die => die.isClicked)

    useEffect(() => {
        if (isGameWon && gameStartTime) {
            const finishedTime = Date.now();
            const elapsedSeconds = ((finishedTime - gameStartTime) / 1000).toFixed(2);

            // Taking gameStartTime and finishedTime, calculate the total time taken to finish the game in 'HH:MM:SS'
            const formattedTime = formatTimeDuration(gameStartTime, finishedTime);

            setGameDuration(elapsedSeconds);

            // Focus the button as before
            buttonRef.current.focus();

            dispatch(clearUserLogError());

            if(!settingsData.trail_mode && isAuthenticated && credential) {
                dispatch(addUserLog({
                    user_id: credential?.uid || credential?.user_id,
                    show_on_lb: settingsData.show_on_lb,
                    total_roll_clicks: buttonClickCount,
                    time_taken: parseFloat(elapsedSeconds),
                    time_taken_formatted: formattedTime,
                    start_time: new Date(gameStartTime).toLocaleTimeString(),
                    end_time: new Date(finishedTime).toLocaleTimeString(),
                    dice_final_value: diceNumbers[0].value
                }))
                    .unwrap()
                    .then((addedLogData) => {
                        return dispatch(fetchUserGameHistory(credential.uid || credential.user_id))
                            .unwrap()
                            .then((fetchedGameHistory) => {
                                dispatch(updateUserLogStatistics({
                                    userId: credential.uid || credential.user_id,
                                    gameHistory: fetchedGameHistory,
                                    currentGameLog: addedLogData,
                                }))
                                console.log(addedLogData);
                            })
                    })
                    .catch((error) => {
                        console.error("Failed to fetch game history:", error);
                    })
            }

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
    }, [isGameWon, dispatch, credential])

    const rollDice = () => {
        if (isGameWon) {
            setDiceNumbers(generateNewDice());
            setButtonClickCount(0);
            setGameStartTime(null);
            setGameDuration(0);
            return;
        }
        setDiceNumbers(oldDice => oldDice.map((die) => (
            !die.isClicked ? { ...die, value: Math.ceil(Math.random() * 9) } : die
        )
        ));
        setButtonClickCount((prevCount) => prevCount + 1);
    }

    const holdDie = (id) => {
        if (!gameStartTime) {
            setGameStartTime(Date.now());
        }
        setDiceNumbers(oldDice => oldDice.map((die) => (
            die.id === id ? { ...die, isClicked: !die.isClicked } : die
        )
        ));
    }

    const generateRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const extraColors = new Array(20).fill(0).map(generateRandomColor);
    const confettiColors = ['#ff577f', '#ff884b', '#ffd700', '#00fa9a', '#1e90ff', '#ff69b4', ...extraColors];

    // New handler to close the modal when 'X' is clicked
    const handleCloseModal = () => {
        setShowModal(false);
        setButtonClickCount(0);
        setGameStartTime(null);
        setGameDuration(0);
    }

    // useEffect(() => {
    //     messageApi.open({
    //         key: 'updatable',
    //         type: loading ? 'loading' : 'success',
    //         content: loading ? 'syncing data...' : 'Data synced!',
    //     })
    // }, [loading]);


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
                    <FeaturesBar />
                    <Header />
                    <div className='row row-cols-5 gy-4 die-container'>
                        {diceNumbers.map((numObj) => (
                            <div className='col' key={numObj.id}>
                                <Die
                                    id={numObj.id}
                                    dieNumber={numObj.value}
                                    isClicked={numObj.isClicked}
                                    holdDie={holdDie}
                                />
                            </div>
                        ))}
                    </div>
                    <div className='mt-5 game-btn-container'>
                        <button
                            className='btn focus-ring focus-ring-primary shadow die-roll-btn'
                            onClick={rollDice}
                            ref={buttonRef}
                            aria-label={isGameWon ? 'Start new game' : 'Roll'}
                            data-bs-toggle='modal'
                            data-bs-target='#staticBackdrop'
                            disabled={loading}
                        >
                            {isGameWon ? 'Start New Game' : 'Roll'}
                        </button>
                    </div>
                </main>
            </div>
            <CountModal
                show={showModal}
                buttonClickCount={buttonClickCount}
                timeTaken={gameDuration}
                onClose={handleCloseModal}
            />
            {contextHolder}
            {messageContextHolder}
        </>
    )
}

const MainContent = () => {
    return (
        <Provider store={store}>
            <MainContentComponent />
        </Provider>
    )
}

export default MainContent