import { useEffect } from 'react'
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom'
import { motion } from 'framer-motion'

import { GoogleIcon } from '../assets/Icons'
import { auth } from '../../../config/firebaseConfig'
import TextRevealAnimation from '../components/TextRevealAnimation'
import LoginBgImage from '../assets/login-bg-image.webp'
import '../styles.css'

const messageAnimationVariants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  messageIn: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
}

const MoodyLogin = () => {
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = auth.currentUser ? true : false;

    if (actionData?.success) {
      const timer = setTimeout(() => {
        if (auth.currentUser && !auth.currentUser.displayName && !auth.currentUser.photoURL) {
          navigate('/moody/home/profile-update', { replace: true });
        }
        else {
          navigate(loaderData?.redirectTo || '/moody/home', { replace: true });
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
    else if (loggedIn) {
      navigate('/moody/home', { replace: true });
    }
  }, [actionData, loaderData?.redirectTo, navigate]);

  return (
    <section className='moody-login-container d-flex justify-content-start align-items-center pt-5'>
      <img src={LoginBgImage} alt='Login Background' className='moody-login-bg position-absolute top-0 end-0 img-fluid' />

      <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto', zIndex: 1 }}>
        <h1 className='moody-login-title text-center'>
          <TextRevealAnimation text='Moody Entrance' />
        </h1>
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
        <motion.span 
          className='alert alert-danger mt-3' 
          role='alert'
          variants={messageAnimationVariants}
          initial='initial'
          animate='messageIn'
        >
          {loaderData.message}
        </motion.span>
      )}
      {actionData?.error && (
        <motion.span 
          className='alert alert-danger mt-3' 
          role='alert'
          variants={messageAnimationVariants}
          initial='initial'
          animate='messageIn'
        >
          {actionData.error}
        </motion.span>
      )}
      {actionData?.message && (
        <motion.span 
          className='alert alert-success mt-3' 
          role='alert'
          variants={messageAnimationVariants}
          initial='initial'
          animate='messageIn'
        >
          {actionData.message}
        </motion.span>
      )}
    </section>
  )
}

export default MoodyLogin