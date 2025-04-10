import React, { 
  useState, 
  useEffect, 
  Suspense, 
  useCallback
} from 'react'
import { 
  useFetcher, 
  useActionData, 
  useLoaderData,
  useNavigation,
  Await,
  useSearchParams
} from 'react-router-dom'
import { message, Modal } from 'antd';

import MoodyPostCard from './MoodyPostCard';

import MoodAwful from '../assets/mood-1.png';
import MoodBad from '../assets/mood-2.png';
import MoodMeh from '../assets/mood-3.png';
import MoodGood from '../assets/mood-4.png';
import MoodAmazing from '../assets/mood-5.png';
import '../styles.css'

import { addNewPostData } from '../dataFetchFunctions';
import { auth } from '../../../config/firebaseConfig';

import { getUserPosts } from '../dataFetchFunctions';
import { requireFirebaseAuth } from '../requireFirebaseAuth';

export const moodyPostLoader = async ({ request }) => {
  await requireFirebaseAuth(request);
  
  return {
    postData: await getUserPosts(auth.currentUser.uid)
  }
}

export const moodyPostAction = async ({ request }) => {
  const postData = await request.formData();
  const mood = postData.get('mood');
  const post = postData.get('post');

  console.log(mood, post);

  if(!mood || !post) {
    return {
      success: false,
      message: 'Mood and post are required.',
    }
  }

  if(post.length < 10) {
    return {
      success: false,
      message: 'Mood is too long.',
    }
  }

  try {
    const response = await addNewPostData({ mood, post });

    if(response.success) {
      return {
        success: true,
        message: response.message,
      }
    }
    else {
      return {
        success: false,
        message: response.message,
      }
    }
  }
  catch(error) {
    console.error('Error posting mood:', error);
    return {
      success: false,
      message: 'Failed to post mood. Please try again later.',
      error_code: error.code,
    }
  }
}

const MoodyHome = () => {
  const [currentMood, setCurrentMood] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  const { postData } = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const fetcher = useFetcher(); // Using the fetcher to submit the form data without redirecting the page
  // Instead of using the <Form> component, we are using the fetcher to submit the form data

  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filterby');

  useEffect(() => {
    if(actionData) {
      if(actionData.success) {
        message.success(actionData.message);
        setCurrentMood('');
        document.getElementById('post').value = '';
      }
      else {
        message.error(actionData.message);
      }
    }
  }, [actionData]);

  const handleMoodClick = (moodName) => {
    setCurrentMood(moodName);
    console.log(`Selected mood: ${moodName}`);
  }

  const handleMoodPost = (e) => {
    e.preventDefault();

    const postBody = document.getElementById('post').value.replace(/\n/g, '<br />');
    // Fetching the post body and replacing the new line with <br /> tag -- g stands for global
    // and it will replace all the new line with <br /> tag

    Modal.confirm({
      title: 'Action confirmation needed for Posting',
      content: `Are you sure you want to post the content. If the post is posted then you can't able to edit or delete it!`,
      className: 'post-confirmation-modal',
      okText: 'Post Anyway',
      cancelText: 'Cancel',
      onOk: () => {
        fetcher.submit(
          {
            mood: currentMood,
            post: postBody,
          },
          {
            method: 'post',
          }
        )

        document.getElementById('mood-form-submit').reset();
        setCurrentMood('');
      }
    })
  }

    // Function to filter posts based on date
    const filterPostsByDate = useCallback((posts, filterType) => {
      if (!posts || !filterType) return posts;
      
      const now = new Date();
      
      switch (filterType) {
        case 'today':
          // Filter posts from today
          return posts.filter(post => {
            const postDate = new Date(post.created_at.seconds * 1000);
            return postDate.toDateString() === now.toDateString();
          });
          
        case 'week':
          // Filter posts from the past 7 days
          const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return posts.filter(post => {
            const postDate = new Date(post.created_at.seconds * 1000);
            return postDate >= oneWeekAgo;
          });
          
        case 'month':
          // Filter posts from the current month
          return posts.filter(post => {
            const postDate = new Date(post.created_at.seconds * 1000);
            return (
              postDate.getMonth() === now.getMonth() &&
              postDate.getFullYear() === now.getFullYear()
            );
          });
          
        default:
          return posts;
      }
    }, []);

  const renderPosts = (postData) => {
    useEffect(() => {
      const filteredPosts = filterPostsByDate(postData, filter);
      setFilteredPosts(filteredPosts);
    }, [postData, filter, filterPostsByDate]);

    const handleFilterChange = (key, value) => {
      setSearchParams(prevSearch => {
        if(value === null) {
          prevSearch.delete(key)
        }
        else {
          prevSearch.set(key, value);
        }

        return prevSearch;
      })
    }

    const filteredPostsDetails = filteredPosts.map((items) => (
      <MoodyPostCard
        key={items.id}
        mood={items.user_mood}
        post={items.body}
        date={items.created_at}
      />
    ));

    return (
      <>
        <div className='d-flex flex-row justify-content-start align-items-center gap-3 moody-filter-section mt-4 mb-3'>
          <button 
            className={`btn moody-secondary-btn box-border rounded moody-filter-btn 
              ${filter === 'today' ? 'bg-black text-white fw-bolder font-monospace' : ''}`}
            onClick={() => handleFilterChange('filterby', 'today')}
          >
            Today
          </button>
          <button 
            className={`btn moody-secondary-btn box-border rounded moody-filter-btn 
              ${filter === 'week' ? 'bg-black text-white fw-bolder font-monospace' : ''}`}
            onClick={() => handleFilterChange('filterby', 'week')}
          >
            Week
          </button>
          <button 
            className={`btn moody-secondary-btn box-border rounded moody-filter-btn 
              ${filter === 'month' ? 'bg-black text-white fw-bolder font-monospace' : ''}`}
            onClick={() => handleFilterChange('filterby', 'month')}
          >
            Month
          </button>
          <button 
            className={`btn moody-secondary-btn box-border rounded moody-filter-btn 
              ${filter === null ? 'bg-black text-white fw-bolder font-monospace' : ''}`}
            onClick={() => handleFilterChange('filterby', null)}
          >
            All
          </button>
        </div>
        <div className='d-flex flex-column justify-content-center align-items-center gap-2 moody-postlist-section'>
          {filteredPostsDetails.length > 0 ? (
            filteredPostsDetails
          ) : (
            <div className='text-center text-secondary'>
              No posts available. Start your mood journey now!
            </div>
          )}
        </div>
      </>
    )
  }

  return (
    <section 
      className='d-flex flex-column justify-content-center align-items-center gap-3'
      style={{ marginTop: '10rem' }}
    >
      <h1 className='text-center'>Welcome to Moody</h1>
      <p className='text-center text-secondary mb-0'>Your personal mood tracker and journal.</p>
      <p className='text-center text-secondary mt-0 mb-0'>Keep track of your moods and reflect on your day.</p>
      <div 
        className='d-flex flex-column justify-content-center align-items-center p-1' 
        style={{ width: '100%', maxWidth: '420px', margin: '0 auto' }}
      >
        <div className='d-flex flex-row justify-content-center align-items-center gap-2 mb-2 moody-reaction-section'>
          <button 
            className={`btn mood-reaction-btn ${currentMood === 'Awful' || currentMood === '' ? '' : 'mood-reaction-btn-disabled'}`}
            onClick={() => handleMoodClick('Awful')}
            disabled={navigation.state === 'submitting'}
          >
            <img
              src={MoodAwful}
              alt='Mood Sad'
              className='mood-icon'
            />
            <span className='mood-text'>Awful</span>
          </button>
          <button 
            className={`btn mood-reaction-btn ${currentMood === 'Bad' || currentMood === '' ? '' : 'mood-reaction-btn-disabled'}`}
            onClick={() => handleMoodClick('Bad')}
            disabled={navigation.state === 'submitting'}
          >
            <img
              src={MoodBad}
              alt='Mood Bad'
              className='mood-icon'
            />
            <span className='mood-text'>Bad</span>
          </button>
          <button 
            className={`btn mood-reaction-btn ${currentMood === 'Meh' || currentMood === '' ? '' : 'mood-reaction-btn-disabled'}`}
            onClick={() => handleMoodClick('Meh')}
            disabled={navigation.state === 'submitting'}
          >
            <img
              src={MoodMeh}
              alt='Mood Meh'
              className='mood-icon'
            />
            <span className='mood-text'>Meh</span>
          </button>
          <button 
            className={`btn mood-reaction-btn ${currentMood === 'Good' || currentMood === '' ? '' : 'mood-reaction-btn-disabled'}`}
            onClick={() => handleMoodClick('Good')}
            disabled={navigation.state === 'submitting'}
          >
            <img
              src={MoodGood}
              alt='Mood Good'
              className='mood-icon'
            />
            <span className='mood-text'>Good</span>
          </button>
          <button 
            className={`btn mood-reaction-btn ${currentMood === 'Amazing' || currentMood === '' ? '' : 'mood-reaction-btn-disabled'}`}
            onClick={() => handleMoodClick('Amazing')}
            disabled={navigation.state === 'submitting'}
          >
            <img
              src={MoodAmazing}
              alt='Mood Amazing'
              className='mood-icon'
            />
            <span className='mood-text'>Amazing</span>
          </button>
        </div>

        <form
          onSubmit={handleMoodPost}
          id='mood-form-submit'
        >
          <input 
            type='hidden' 
            name='mood' 
            defaultValue={currentMood} 
            required
          />
          <textarea 
            cols={40} 
            rows={10}
            name='post'
            id='post'
            className='form-control google-login-btn'
            style={{ height: '150px', maxHeight: '270px', resize: 'none' }}
            placeholder='Write about your day...'
            required
          >
          </textarea>
          <button
            type='submit'
            className='btn moody-primary-btn box-border mt-3'
            disabled={navigation.state === 'submitting'}
          >
            {navigation.state === 'submitting' ? 'Posting...' : 'Post'}
          </button>
        </form>
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={postData}>
            { renderPosts }
          </Await>
        </Suspense>
      </div>
    </section>
  )
}

export default MoodyHome