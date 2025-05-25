import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  ConfigProvider,
  notification
} from 'antd';

import store from '../redux/app/store';
import { registerUserAction } from '../redux/features/authSlice';

import '../index.css';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 25 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const SignUpComponent = () => {
  const [api, contextHolder] = notification.useNotification();

  const { loading, isAuthenticated, credential, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(!isAuthenticated && credential) {
      api.success({
        placement: 'bottomRight',
        message: 'Sign Up Successful',
        description: 'Now you redirected to Login page!',
      });

      setTimeout(() => {
        navigate('/tenzies-game/login');
      }, 2000);
    }
    else if(isAuthenticated && credential) {
      navigate('/tenzies-game');
    }

    if(error) {
        api.error({
          placement: 'bottomRight',
          message: 'Sign Up Failed',
          description: error,
        });
    }
  }, [isAuthenticated, error, credential]);

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    dispatch(registerUserAction(values));
  };
  
  return (
    <div 
      className='container-fluid mx-auto d-flex flex-row justify-content-center align-items-center 100vh gap-x-10 tenzies-login'
      // style={{ minHeight: '100vh' }}
    >
      {contextHolder}
      <h1
        className='mb-5 heading'
        style={{
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          fontSize: '3rem',
          letterSpacing: '0.9rem',
        }}
      >
        TENZIES
      </h1>
      <div className='d-flex flex-column justify-content-center align-items-center my-3'>
        <h2 className='mb-4'>Sign Up</h2>
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
          {...formItemLayout}
          name="register"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm_password"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input your Name!', whitespace: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone_number"
            label="Phone Number"
          >
            <Input.OTP length={10} />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please select gender!' }]}
          >
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="about_me"
            label="About me"
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>

          <Form.Item
            name="agreement_status"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item className='text-center'>
            <Button type="primary" htmlType="submit" style={{ width: '10rem' }} loading={loading}>
              Register
            </Button>
          </Form.Item>
        </Form>
        </ConfigProvider>
      </div>
    </div>
  )
}


const SignUp = () => {
  return (
    <Provider store={store}>
      <SignUpComponent />
    </Provider>
  )
}

export default SignUp