import React from 'react';
import { useState, useEffect } from 'react'; 
import { 
  useLoaderData, 
  useActionData, 
  Form,  
  useNavigation, 
  useNavigate,  // Add this import
  useSearchParams 
} from 'react-router-dom';
import '../index.css';

import { loginAuth } from '../server/ApiCalls';


export const loginLoader = async ({ request }) => {
  const url = new URL(request.url);
  return {
    message: url.searchParams.get('message'),
    redirectTo: url.searchParams.get('redirectTo') || '/vanslife/host'
  }
}

export const loginAction = async ({ request }) => {
  const userCrenditals = await request.formData();
  const pathName = new URL(request.url).searchParams.get('redirectTo') || '/vanslife/host';

  const email = userCrenditals.get('email');
  const password = userCrenditals.get('password');

  try {
    const userData = await loginAuth({ email, password });
    localStorage.setItem("isLoggedIn", true); 
    return {
      success: true,
      redirectTo: pathName
    }
  }
  catch(error) {
    console.log(error.message);
    return {
      success: false,
      error: error.message
    }
  }
}

const Login = () => {
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation(); // for getting the state of the navigation
  const navigate = useNavigate(); // Add this - for programmatic navigation
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if(actionData?.success) {
     navigate(actionData.redirectTo, { replace: true });
    }
  }, [actionData, navigate]);

  return (
    <main className='container-fluid d-flex flex-column justify-content-center align-items-center login-container'>
      <div className='rounded border shadow p-4'>
        <h1 className='mb-5'>Sign in to your account</h1>
        <Form 
          className='needs-validation' 
          method='post' 
          noValidate
          replace
        >
          <div className="form-floating mb-3">
            <input
              type="email"
              name='email'
              className="form-control"
              id="email"
              placeholder="name@example.com"
              required
            />
            <label htmlFor="email">Email</label>
            <div className="invalid-feedback">
              Please provide a valid email.
            </div>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='password'
              name='password'
              className='form-control'
              id='password'
              placeholder="Enter your dark secret here"
              required
            />
            <label htmlFor='password'>Password</label>
            <div className="invalid-feedback">
              Please provide a valid password.
            </div>
          </div>
          <div className='d-flex justify-content-center'>
            <button
              type='submit'
              className='btn btn-primary px-5'
              disabled={navigation.state === 'submitting'}
            >
              { navigation.state === 'submitting' ? 'Logging in...' : 'Login' }
            </button>
          </div>
        </Form>
      </div>
      {loaderData?.message && (
        <div className='mt-5 p-2 rounded'>
          <span className="fs-5 text-danger">{loaderData.message}</span>
        </div>
      )}
      {actionData?.error && (
        <div className='mt-5 p-2 rounded'>
          <span className="fs-5 text-danger">{actionData.error}</span>
        </div>
      )}
    </main >
  )
}

export default Login;