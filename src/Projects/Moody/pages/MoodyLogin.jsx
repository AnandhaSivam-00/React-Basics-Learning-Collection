import React, { useEffect } from 'react'
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSearchParams
} from 'react-router-dom'
import { Server } from 'miragejs'

import { GoogleIcon } from '../assets/Icons'
import { auth } from '../../../config/firebaseConfig'
import {
  loginAuthProvider,
  createNewUserProvider,
  isUserloggedIn,
  handleGoogleLogin,
} from '../dataFetchFunctions'

import '../styles.css'

export const moodyLoginLoader = async ({ request }) => {
  const url = new URL(request.url);

  return {
    success: false,
    message: url.searchParams.get('message'),
    redirectTo: url.searchParams.get('redirectTo') || '/home',
  }
}

export const moodyBasicAction = async ({ request }) => {
  const userCredentials = await request.formData();

  const email = userCredentials.get('email');
  const password = userCredentials.get('password');
  const actionType = userCredentials.get('action');

  // Disable the mirage server for firebase authentication
  if (window.server instanceof Server) {
    window.server.shutdown();
  }

  if (actionType === 'login') {
    return moodyLoginAction({ email, password });
  }
  else if (actionType === 'createUser') {
    return moodyCreateUser({ email, password });
  }
  else if (actionType === 'googleLogin') {
    return moodyGoogleLoginAction();
  }
  else {
    return {
      success: false,
      error: 'Invalid action type'
    }
  }
}

const moodyGoogleLoginAction = async () => {
  try {
    const response = await handleGoogleLogin();
    if (!response.success) {
      throw new Error(response.message);
    }
    const { credential } = response;
    console.log('Google login successful:', credential);

    return {
      success: true,
      message: 'Login successful! Now you are redirected to home page! 👋🏽',
    }
  }
  catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

const moodyLoginAction = async ({ email, password }) => {
  try {
    const response = await loginAuthProvider({ email, password });
    if (!response.success) {
      throw new Error(response.message);
    }
    const { credential } = response;
    console.log('Login successful:', credential);

    return {
      success: true,
      message: 'Login successful! Now you are redirected to home page! 👋🏽',
    }
  }
  catch (error) {
    // console.log(error.message);
    return {
      success: false,
      error: error.message
    }
  }
}

const moodyCreateUser = async ({ email, password }) => {
  try {
    const response = await createNewUserProvider({ email, password });
    if (!response.success) {
      throw new Error(response.message);
    }

    return {
      success: true,
      message: 'User created successfully'
    }
  }
  catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

const MoodyLogin = () => {
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = auth.currentUser ? true : false;

    if (actionData?.success) {
      setTimeout(() => {
        if(!auth.currentUser.displayName && !auth.currentUser.photoURL) {
          navigate('/home/profile-update', { replace: true });
        }
        else {
          navigate(loaderData.redirectTo, { replace: true });
        }
      }, 1000);
    }
    else if (loggedIn) {
      navigate('/home', { replace: true });
    }
  }, [actionData, navigate]);

  return (
    <section className='moody-login-container'>
      <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
        <h1 className='moody-login-title text-center'>Moody</h1>
        <Form
          method='POST'
          className='moody-login-form mt-1'
          autoComplete='off'
        >
          <div className='d-flex justify-content-baseline align-items-baseline mb-5'>
            <button
              type='submit'
              className='btn google-login-btn'
              name='action'
              value='googleLogin'
              disabled={navigation.state === 'submitting'}
            >
              <GoogleIcon width={60} height={35} /> Sign in with Google
            </button>
          </div>
          <input
            type='text'
            name='email'
            placeholder='Email'
            id='email'
            className='form-control box-border'
            required
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            id='password'
            className='form-control box-border mt-4'
            required
          />
          <div className='d-flex justify-content-center align-items-center mt-3'>
            <button
              type='submit'
              name='action'
              value='login'
              className='btn moody-primary-btn box-border mt-3'
              disabled={navigation.state === 'submitting'}
            >
              {navigation.state === 'submitting' ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
          <div className='d-flex justify-content-center align-items-center mt-3'>
            <button
              type='submit'
              name='action'
              value='createUser'
              className='btn moody-secondary-btn box-border rounded w-100'
              disabled={navigation.state === 'submitting'}
            >
              Create Account
            </button>
          </div>
        </Form>
      </div>
      {loaderData?.message && (
        <span className='alert alert-danger mt-3' role='alert'>
          {loaderData.message}
        </span>
      )}
      {actionData?.error && (
        <span className='alert alert-danger mt-3' role='alert'>
          {actionData.error}
        </span>
      )}
      {actionData?.message && (
        <span className='alert alert-success mt-3' role='alert'>
          {actionData.message}
        </span>
      )}
    </section>
  )
}

export default MoodyLogin