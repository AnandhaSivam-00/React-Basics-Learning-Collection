import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { 
  Button, 
  Form, 
  Input, 
  ConfigProvider, 
  notification, 
} from 'antd';

import store from '../redux/app/store';
import { clearAuthError, forgotPasswordAction } from '../redux/features/authSlice';

import { LoginUserIcon } from '../assets/Icons/Icons';

const ForgotPassword = () => {
    const { loading, credential, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        if(error && typeof error === 'string') {
            api.error({
                placement: 'bottomRight',
                title: 'Reset password email send failed... Try again later...',
                description: error,
            });
        }

        if(credential && credential.message) {
            api.success({
                placement: 'bottomRight',
                title: credential.message,
                description: 'Check your respective email inbox or a span folder.',
            });
        }
    }, [error, credential])

    const onFinish = (values) => {
        dispatch(clearAuthError());
        dispatch(forgotPasswordAction(values));
    }

    return (
        <section className='vh-100 container-fluid mx-auto d-flex flex-column justify-content-center align-items-center'>
            {contextHolder}
            <h3 className='mb-5 heading'>Reset Password</h3>
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            colorPrimary: '#882cde',
                            colorPrimaryHover: '#882cdee2',
                            colorPrimaryActive: '#9b31ff',
                        },
                        Input: {
                            colorBorder: '#ccc',
                            colorBorderHover: '#888',
                        },
                    },
                }}
            >
                <Form
                    name="reset-password"
                    size='large'
                    style={{ maxWidth: 450 }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email or Username!' }]}
                        className='tenzies-login-form-item'
                    >
                        <Input
                            prefix={<LoginUserIcon width={20} height={20} />}
                            placeholder="Enter email here"
                            disabled={loading}
                        />
                    </Form.Item>

                    <Form.Item className='d-flex justify-content-center items-center'>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width: '10rem' }}
                            loading={loading}
                        >
                            Send Reset Link
                        </Button>
                    </Form.Item>
                </Form>
            </ConfigProvider>
        </section>
    )
}

export default ForgotPassword