import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Switch, ConfigProvider, notification } from 'antd'

import { fetchUserSettingData, updateUserSettingsData } from '../redux/features/userSlice'

import '../index.css'

const SettingsModal = ({ isSettingsModalOpen, setIsSettingsModalOpen }) => {
    const { credential } = useSelector((state) => state.auth);
    const { loading, error, settingsData } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [settings, setSettings] = useState(settingsData);

    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        if(isSettingsModalOpen && credential?.uid && !settingsData) {
            dispatch(fetchUserSettingData(credential.uid));
        }

        if(error) {
            api.error({
                placement: 'bottomRight',
                message: 'Failed to fetch the user\'s settings data',
                description: `Try again by login... This is due to network error ${error}`
            });
        }
    }, [isSettingsModalOpen, dispatch, credential?.uid, error, api]);

    useEffect(() => {
        if(settingsData && Object.keys(settingsData).length > 0) {
            setSettings(settingsData);
        }
    }, [settingsData]);

    const handleSave = () => {
        dispatch(updateUserSettingsData({
            settingsData: settings,
            userId: credential.uid
        })).unwrap();

        setIsSettingsModalOpen(prev => !prev);

        api.success({
            placement: 'bottomRight',
            message: 'Data saved!',
            description: `User settings data saved successfully...`
        })
    }

    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            colorPrimary: '#882cde',
                            colorPrimaryHover: '#882cdee2',
                            colorPrimaryActive: '#9b31ff',
                        },
                        Switch: {
                            colorPrimary: '#59E391',
                            colorPrimaryHover: '#43bf74',
                            colorPrimaryActive: '#9b31ff',
                        }
                    },
                }}
            >
                <Modal
                    title={<h2><b>Settings</b></h2>}
                    open={isSettingsModalOpen}
                    loading={loading}
                    closable={false}
                    maskClosable={false}
                    centered
                    okText='Save'
                    okType='primary'
                    onOk={handleSave}
                    cancelText='Cancel'
                    onCancel={() => setIsSettingsModalOpen(prev => !prev)}
                >
                    <div className='row my-4'>
                        <div className='col-6 d-flex flex-column justify-content-center align-items-start gap-y-4'>
                            <p className='m-0 p-0'>Trail mode</p>
                            <p className='m-0 p-0'>Dark mode</p>
                            <p className='m-0 p-0'>Show on Leader Board</p>
                            <p className='m-0 p-0'>Send Emails</p>
                        </div>
                        <div className='col-6 d-flex flex-column justify-content-start align-items-end gap-y-4'>
                            <Switch 
                                checked={settings.trail_mode}
                                onChange={(checked) => setSettings(prev => ({ ...prev, trail_mode: checked }))}
                            />
                            <Switch 
                                checked={settings.dark_mode}
                                onChange={(checked) => setSettings(prev => ({ ...prev, dark_mode: checked }))}
                            />
                            <Switch 
                                checked={settings.show_on_lb}
                                onChange={(checked) => setSettings(prev => ({ ...prev, show_on_lb: checked }))}
                            />
                            <Switch 
                                checked={settings.send_emails}
                                onChange={(checked) => setSettings(prev => ({ ...prev, send_emails: checked }))}
                            />
                        </div>
                    </div>
                </Modal>
            </ConfigProvider>
            {contextHolder}
        </>
    )
}

export default SettingsModal