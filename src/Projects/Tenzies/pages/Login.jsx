import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch, Provider } from 'react-redux';
import { Button, Form, Input, Flex, ConfigProvider, Divider, notification, Checkbox } from 'antd';

import store from '../redux/app/store';
import { loginUserAction } from '../redux/features/authSlice';

import { LoginUserIcon, PasswordIcon, EmailIcon, GoogleIcon } from '../assets/Icons/Icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import '../index.css'

const LoginComponent = () => {
  const {loading, isAuthenticated, error} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [visiblePassword, setVisiblePassword] = useState(false);
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if(isAuthenticated) {
      navigate('..');
    }

    if(error) {
      api.error({
        placement: 'bottomRight',
        message: 'Login Failed',
        description: error,
      });
    }
  }, [isAuthenticated, error]);

  const onFinish = (values) => {
    dispatch(loginUserAction(values));
  };

  return (
    <div className='container-fluid mx-auto d-flex flex-column justify-content-center align-items-center tenzies-login'>
      { contextHolder }
      <h1 className='mb-5 heading'>TENZIES</h1>
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
          name="login"
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
              placeholder="Email id or Username"
              disabled={loading}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
            className='tenzies-login-form-item'
          >
            <Input.Password
              prefix={<PasswordIcon width={20} height={20} />}
              type="password"
              placeholder="Password"
              disabled={loading}
              visibilityToggle={{
                visible: visiblePassword,
                onVisibleChange: setVisiblePassword,
              }}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item 
                name="password-visiblity" 
                valuePropName="checked" 
                noStyle
              >
                <Checkbox
                  onClick={() => setVisiblePassword(!visiblePassword)}
                >
                  Show the password
                </Checkbox>
              </Form.Item>
              <a href="">Forgot password</a>
            </Flex>
          </Form.Item>

          <Form.Item className='d-flex justify-content-center items-center'>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '10rem' }}
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
          <Divider plain>or</Divider>
        </Form>
        <div 
          className='d-flex flex-column justify-content-center align-items-center gap-y-5'
          style={{ maxWidth: 450 }}
        >
          <Button
            color="default" 
            variant="outlined"
            style={{ padding: '1.1rem' }}
            href='/tenzies-game/sign-up'
          >
            <EmailIcon width={20} height={20} /> Sign up with personal email
          </Button>
          <Button
            color="default" 
            variant="outlined"
            style={{ padding: '1.1rem' }}
            onClick={() => console.log('Sign Up clicked')}
          >
            <GoogleIcon width={20} height={20} /> Sign up or log in with Google
          </Button>
        </div>
      </ConfigProvider>
    </div>
  )
}

const Login = () => {
  return (
    <Provider store={store}>
      <LoginComponent />
    </Provider>
  )
}

export default Login