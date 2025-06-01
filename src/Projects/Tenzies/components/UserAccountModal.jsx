import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Modal,
  ConfigProvider,
  notification,
  message,
  Button,
  Form,
  Input,
  Select,
  Tooltip,
  Divider
} from 'antd';

import { clearUserError, fetchUserPersonalData, updateUserPersonalData } from '../redux/features/userSlice';
import { clearUserLogError, fetchUserGameHistory } from '../redux/features/userLogSlice';

import { formatFirebaseTimestamp } from '../utils/DateTimeFormatting'

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

const UserAccountModal = ({ isUserAccountModalOpen, setIsUserAccountModalOpen }) => {
  const { credential } = useSelector((state) => state.auth);
  const { loading, error, userData } = useSelector((state) => state.user);
  const { gameHistory, loading:logLoading } = useSelector((state) => state.userlog);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState(userData);

  const [form] = Form.useForm();

  const [api, contextHolder] = notification.useNotification();
  const [messageApi, messageContextHolder] = message.useMessage();

  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      form.setFieldsValue({
        email: userData.email || '',
        name: userData.name || '',
        username: userData.user_name || '',
        phone_number: userData.phone_number ? String(userData.phone_number) : '',
        gender: userData.gender || '',
        about_me: userData.about_me || ''
      });
    }
  }, [userData, form]);

  useEffect(() => {
    if(isUserAccountModalOpen && credential?.uid && !userData.length) {
      dispatch(fetchUserPersonalData(credential.uid));
    }
    
    if(isUserAccountModalOpen && credential?.uid && !gameHistory.length) {
      dispatch(fetchUserGameHistory(credential.uid));
    }

    if(error) {
      setIsUserAccountModalOpen(false);

      api.error({
        placement: 'bottomRight',
        message: 'Failed to fetch the user data',
        description: `Try again by login... This is due to network error ${error}`
      })
    }
  }, [isUserAccountModalOpen, credential?.uid, dispatch, error, api, setIsUserAccountModalOpen]);

  const handleSave = async () => {
    await form.validateFields()
      .then((values) => {
        dispatch(updateUserPersonalData({
          ...values,
          user_id: credential.uid
        }));

        setEditMode(false);
        setIsUserAccountModalOpen(false);

        api.success({
          placement: 'bottomRight',
          message: 'Data saved!',
          description: `User personal data saved successfully...`
        });
      })
      .catch((errorInfo) => {
        console.log('Failed:', errorInfo);
      });
  }

  const handleCancel = () => {
    if (editMode) {
      setEditMode(false);

      // Reset form to original values
      form.setFieldsValue({
        email: userData.email || '',
        name: userData.name || '',
        user_name: userData.user_name || '',
        phone_number: userData.phone_number ? String(userData.phone_number) : '',
        gender: userData.gender || '',
        about_me: userData.about_me || ''
      });
    } 
    else {
      dispatch(clearUserError());
      dispatch(clearUserLogError());

      setIsUserAccountModalOpen(false);
    }
  }

  const handleEdit = () => {
    console.log('In Edit Mode');
    setEditMode(true);
  }

  const onFinish = (values) => {
    dispatch(clearUserError());
    dispatch(clearUserLogError());

    form.setFieldsValue({
      email: values.email,
      name: values.name,
      user_name: values.user_name,
      phone_number: values.phone_number ? String(userData.phone_number) : '',
      gender: values.gender,
      about_me: values.about_me
    });

    messageApi.open({
      type: 'success',
      content: 'Form data synced!',
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
          },
        }}
      >
        <Modal
          title={<h2><b>Account</b></h2>}
          open={isUserAccountModalOpen}
          loading={loading || logLoading}
          closable={false}
          maskClosable={false}
          centered
          okText={editMode ? 'Save' : 'Edit'}
          okType='primary'
          onOk={editMode ? handleSave : handleEdit}
          cancelText='Cancel'
          onCancel={handleCancel}
        >
          <div className='container-fluid py-1 m-0'>
            <div className='d-flex flex-column justify-content-center align-items-start'>
              <h5 className='mt-2 mb-4'>Personal Details</h5>
              <Form
                {...formItemLayout}
                form={form}
                name="personal-details"
                onFinish={onFinish}
                scrollToFirstError
                preserve={false}
                style={{ width: '80%' }}
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid Email!',
                    },
                    {
                      required: true,
                      message: 'Please input your Email!',
                    },
                  ]}
                >
                  <Input disabled />
                </Form.Item>

                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: 'Please input your Name!', whitespace: true }]}
                >
                  <Input disabled={!editMode} />
                </Form.Item>

                <Form.Item
                  name="username"
                  label="Username"
                >
                  <Input disabled={!editMode} />
                </Form.Item>

                <Form.Item
                  name="phone_number"
                  label="Phone Number"
                >
                  <Input 
                    disabled={!editMode} 
                    placeholder="Enter phone number"
                    maxLength={10}
                  />
                </Form.Item>

                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[{ required: true, message: 'Please select gender!' }]}
                >
                  <Select placeholder="select your gender" disabled={!editMode}>
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="about_me"
                  label="About me"
                >
                  <Input.TextArea showCount maxLength={100} disabled={!editMode} />
                </Form.Item>

                <p className='text-secondary italic text-xs'>
                  Latest updation on {
                    (typeof userData?.updated_at === 'string' 
                      ? userData?.updated_at 
                      : formatFirebaseTimestamp(userData?.updated_at)
                    ) || 'N/A'}
                </p>

                {editMode && (
                  <Form.Item className='text-center'>
                    <Tooltip placement='bottom' title='Remember to click the Save button'>
                      <Button type="primary" htmlType="submit">
                        Save changes
                      </Button>
                    </Tooltip>
                  </Form.Item>
                )}
              </Form>

              <Divider plain />

              <h5 className='mb-4'>Game Health Status</h5>
              {isUserAccountModalOpen && (
                <>
                  <p>Total Attempts: {gameHistory.total_attempts || 'N/A'}</p>
                  <p>Leader Board Rank: {gameHistory.lb_rank || 'N/A'}</p>
                  <p>Highest Clicks: {gameHistory.highest_clicks || 'N/A'}</p>
                  <p>Lowest Clicks: {gameHistory.lowest_clicks || 'N/A'}</p>
                  <p>Fastest finish: {gameHistory.fastest_finish || 'N/A'}</p>
                  <p>Latest Attempt at: {
                    typeof gameHistory.latest_attempt_at === 'string' 
                    ? gameHistory.latest_attempt_at 
                    : formatFirebaseTimestamp(gameHistory.latest_attempt_at) || 'N/A'}
                  </p>
                </>
              )}
            </div>
          </div>
        </Modal>
      </ConfigProvider>
      {contextHolder}
      {messageContextHolder}
    </>
  )
}

export default UserAccountModal