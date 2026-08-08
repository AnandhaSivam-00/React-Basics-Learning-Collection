import React, { useState, useEffect } from 'react'
import { Button, ConfigProvider, Modal, theme } from 'antd';

const CountModal = (props) => {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if(props.show) {
            setCountdown(5);

            const interval = setInterval(() => {
                setCountdown((prevCount) => {
                    if(prevCount <= 1) {
                        clearInterval(interval);
                        if(props.onClose) {
                            props.onClose();
                        }
                        return 0;
                    }
                    return prevCount - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [props.show, props.onClose]);

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = Math.floor(timeInSeconds % 60);

        let formattedTime = '';

        if (hours > 0) {
            formattedTime = (
                <>
                    <p className='fs-4 text-primary mb-auto'><strong>{hours}</strong></p>
                    <p className='text-secondary'>{hours > 1 ? 'Hours' : 'Hour'}</p>
                </>
            )
        }
        else if (minutes > 0) {
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
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
            }}
        >
            <Modal
                title="Current Game Stats"
                open={props.show}
                // closable={false}
                footer={
                    <div className='text-center text-secondary py-1'>
                        This modal will automatically close in <strong>{countdown}</strong> sec{countdown !== 1 ? 's' : ''}.
                    </div>
                }
            >
                <div className='d-flex flex-column justify-content-center align-items-start mt-3'>
                    <p className='mb-1'>Total Clicks: <strong>{props.buttonClickCount}</strong></p>
                    <p>Total Time Taken: <strong>{formatTime(props.timeTaken)}</strong></p>
                </div>
            </Modal>
        </ConfigProvider>
    )
}

export default CountModal