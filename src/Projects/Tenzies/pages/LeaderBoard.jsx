import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ConfigProvider, Tabs } from 'antd';

import LeaderTable from '../components/leaderboard components/LeaderTable';
import UserLogsTable from '../components/leaderboard components/UserLogsTable';

import '../index.css'

const LeaderBoard = () => {
  const { isAuthenticated, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && error instanceof Array) {
      navigate(error[1]);

      dispatch(clearAuthError());
    }
  }, [dispatch]);


  return (
    <div className='100vh d-flex flex-column justify-content-center align-items-center px-md-2 px-0'>
      <div className='align-self-start'>
        <Link
          to='..'
          className='tenzies-back-btn text-sm'
        >
          {'< Back to game'}
        </Link>
      </div>
      <h2 className='m-2'><b>LeaderBoard</b></h2>
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