import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ConfigProvider, Tabs } from 'antd';

import LeaderTable from '../components/leaderboard/LeaderTable';
import UserLogsTable from '../components/leaderboard/UserLogsTable';

import { clearAuthError } from '../redux/features/authSlice';

import '../index.css'

const LeaderBoard = () => {
    const { isAuthenticated, error, credential } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthenticated && !credential?.logout) {
            const redirectUrl = (error instanceof Array && error[1])
                ? error[1]
                : '/tenzies-game/login?message=You must login or create an account first!&redirectTo=/tenzies-game/leaderboard';
            navigate(redirectUrl);
            dispatch(clearAuthError());
        }
    }, [isAuthenticated, credential, error, dispatch, navigate]);


    return (
        <div className='vh-100 w-100 leaderboard-container d-flex flex-column align-items-center '>
            <div className='align-self-start'>
                <Link
                    to='..'
                    className='tenzies-back-btn text-sm'
                >
                    {'< Back to game'}
                </Link>
            </div>
            <h2 className='m-2 text-white'><b>LeaderBoard</b></h2>
            <div className='my-3 w-100 px-3'>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#882cde',
                        },
                        components: {
                            Tabs: {
                                colorPrimary: '#882cde',
                                colorPrimaryHover: '#882cdee2',
                                colorPrimaryActive: '#9b31ff',
                                titleFontSize: '1rem',
                                colorText: '#ffffff'
                            },
                            Button: {
                                colorPrimary: '#882cde',
                                colorPrimaryHover: '#882cdee2',
                                colorPrimaryActive: '#9b31ff',
                            },
                            Table: {
                                headerBg: '#b47aeb66',
                                borderColor: '#6b6b6ba7'
                            }
                        },
                    }}
                >
                    <Tabs
                        animated={{ inkBar: true, tabPane: true }}
                        centered
                        items={[
                            {
                                label: 'My Game Logs',
                                key: '1',
                                children: <UserLogsTable />,
                            },
                            {
                                label: 'Global Leaderboard',
                                key: '2',
                                children: <LeaderTable />,
                            },
                        ]}
                    />
                </ConfigProvider>
            </div>
        </div>
    )
}

export default LeaderBoard