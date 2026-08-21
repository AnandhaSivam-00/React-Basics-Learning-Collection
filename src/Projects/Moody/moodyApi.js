import { Server } from 'miragejs';
import { defer } from '@remix-run/router';
import { auth } from '../../config/firebaseConfig';
import { requireFirebaseAuth } from './requireFirebaseAuth';
import {
  addNewPostData,
  getUserPosts,
  getAllUserPostData,
  getUserData,
  updateUserProfileData,
  loginAuthProvider,
  createNewUserProvider,
  handleGoogleLogin,
} from './dataFetchFunctions';

// --- Login Loaders & Actions ---
export const moodyLoginLoader = async ({ request }) => {
  const url = new URL(request.url);

  return {
    success: false,
    message: url.searchParams.get('message'),
    redirectTo: url.searchParams.get('redirectTo') || '/moody/home',
  };
};

const moodyGoogleLoginAction = async () => {
  try {
    const response = await handleGoogleLogin();
    if (!response?.success) {
      throw new Error(response?.message || 'Google sign-in failed');
    }

    return {
      success: true,
      message: 'Login successful! Redirecting to home... 👋🏽',
    };
  }
  catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

const moodyLoginAction = async ({ email, password }) => {
  try {
    const response = await loginAuthProvider({ email, password });
    if (!response?.success) {
      throw new Error(response?.message || 'Invalid credentials');
    }

    return {
      success: true,
      message: 'Login successful! Redirecting to home... 👋🏽',
    };
  }
  catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

const moodyCreateUser = async ({ email, password }) => {
  try {
    const response = await createNewUserProvider({ email, password });
    if (!response?.success) {
      throw new Error(response?.message || 'Account creation failed');
    }

    return {
      success: true,
      message: 'User created successfully'
    };
  }
  catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

export const moodyBasicAction = async ({ request }) => {
  const userCredentials = await request.formData();

  const email = userCredentials.get('email');
  const password = userCredentials.get('password');
  const actionType = userCredentials.get('action');

  if (typeof window !== 'undefined' && window.server instanceof Server) {
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
    };
  }
};

// --- Home Post Loaders & Actions ---
export const moodyPostLoader = async ({ request }) => {
  await requireFirebaseAuth(request);

  return defer({
    postData: getUserPosts(auth.currentUser?.uid)
  });
};

export const moodyPostAction = async ({ request }) => {
  const postData = await request.formData();
  const mood = postData.get('mood');
  const post = postData.get('post');

  if (!mood || !post) {
    return {
      success: false,
      message: 'Mood and post are required.',
    };
  }

  if (typeof post === 'string' && post.trim().length < 10) {
    return {
      success: false,
      message: 'Post must be at least 10 characters long.',
    };
  }

  try {
    const response = await addNewPostData({ mood, post: post.trim() });

    return {
      success: response.success,
      message: response.message,
    };
  }
  catch (error) {
    console.error('Error posting mood:', error);
    return {
      success: false,
      message: 'Failed to post mood. Please try again later.',
      error_code: error.code,
    };
  }
};

// --- Feeds Loader ---
export const moodyFeedsLoader = async ({ request }) => {
  await requireFirebaseAuth(request);

  return defer({
    feedsData: getAllUserPostData()
  });
};

// --- Profile Update Loader & Action ---
export const moodyUpdateProfileLoader = async ({ request }) => {
  await requireFirebaseAuth(request);
  
  return defer({
    data: getUserData(auth.currentUser?.uid)
  });
};

export const moodyUpdateProfileAction = async ({ request }) => {
  const userData = await request.formData();

  const name = (userData.get('name') || '').toString();
  const phoneNumber = (userData.get('phone_number') || '').toString();
  const photoURL = (userData.get('photoURL') || '').toString();
  const photoPublicID = (userData.get('photoPublicID') || '').toString();

  try {
    const response = await updateUserProfileData({
      name,
      phoneNumber,
      photoURL,
      photoPublicID
    });

    if (!response.success) {
      throw new Error(response.message || 'Failed to update profile');
    }

    return {
      success: true,
      message: response.message || 'User profile updated successfully',
      updatedData: {
        name,
        phoneNumber,
        photoURL,
        photoPublicID
      }
    };
  }
  catch (error) {
    console.error('Error updating user profile:', error);
    return {
      success: false,
      message: error.message || 'Error updating user profile. Please try again.',
      code: error.code
    };
  }
};
