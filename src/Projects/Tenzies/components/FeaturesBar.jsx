import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Tooltip, ConfigProvider, Modal, notification } from 'antd'

import {
    AccountSettingsIcon,
    SettingsIcon,
    LeaderboardIcon,
    LogoutIcon
} from '../assets/Icons/Icons'

import '../index.css'
import SettingsModal from './SettingsModal'
import UserAccountModal from './UserAccountModal'

const FeaturesBar = () => {
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [isUserAccountModalOpen, setIsUserAccountModalOpen] = useState(false);


    const { credential, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [api, contextHolder] = notification.useNotification();

    const handleLogout = () => {
        Modal.confirm({
            title: 'Are you sure you want to logout?',
            content: 'Progress you made will not be saved.',
            okText: 'Logout',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: () => {
                dispatch({ type: 'user-auth/logoutUserAction' });
            }
        })
    }

    useEffect(() => {
        if(credential?.logout) {
            api.success({
                placement: 'bottomRight',
                message: 'Logout Successful',
                description: 'You have been logged out successfully. Now you can redirected to the login page.',
            })
            setTimeout(() => {
                navigate('login');
            }, 2000);
        }

        if(error) {
            api.error({
                placement: 'bottomRight',
                message: 'Logout Failed',
                description: error,
            });
        }
    }, [credential, error]);

    return (
        <>
            {contextHolder}
            <div className='mb-5 px-4 d-flex flex-row justify-content-end align-items-center gap-x-3 tenzies-features-bar'>
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                colorPrimary: '#882cde',
                                colorPrimaryHover: '#882cdee2',
                                colorPrimaryActive: '#9b31ff',
                            },
                        },
                    }}
                >
                    <Tooltip title='Leaderboard' placement='top'>
                        <Button
                            className='px-2'
                            href='leaderboard'
                        >
                            <LeaderboardIcon width={20} height={20} />
                        </Button>
                    </Tooltip>
                    <Tooltip title='User Account' placement='top'>
                        <Button className='px-2' onClick={() => setIsUserAccountModalOpen(prev => !prev)}>
                            <AccountSettingsIcon width={20} height={20} />
                        </Button>
                    </Tooltip>
                    <Tooltip title='Config Settings' placement='top'>
                        <Button className='px-2' onClick={() => setIsSettingsModalOpen(prev => !prev)}>
                            <SettingsIcon width={20} height={20} />
                        </Button>
                    </Tooltip>
                    <Tooltip title='Logout' placement='top'>
                        <Button className='px-2' type='dashed' danger onClick={handleLogout}>
                            <LogoutIcon width={19} height={19} />
                        </Button>
                    </Tooltip>
                </ConfigProvider>
            </div>
            <SettingsModal 
                isSettingsModalOpen={isSettingsModalOpen}
                setIsSettingsModalOpen={setIsSettingsModalOpen}
            />
            <UserAccountModal 
                isUserAccountModalOpen={isUserAccountModalOpen}
                setIsUserAccountModalOpen={setIsUserAccountModalOpen}
            />
        </>
    )
}

export default FeaturesBar