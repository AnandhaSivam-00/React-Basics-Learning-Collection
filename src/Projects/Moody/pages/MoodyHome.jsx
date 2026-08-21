import {
  lazy,
  useState,
  useEffect,
  Suspense,
  useMemo,
  memo
} from 'react'
import PropTypes from 'prop-types'
import {
  useFetcher,
  useLoaderData,
  useNavigation,
  Await,
  useSearchParams
} from 'react-router-dom'
import { message, Modal } from 'antd';

const MoodyPostCard = lazy(() => import('../components/MoodyPostCard'))

import MoodAwful from '../assets/mood-1.png';
import MoodBad from '../assets/mood-2.png';
import MoodMeh from '../assets/mood-3.png';
import MoodGood from '../assets/mood-4.png';
import MoodAmazing from '../assets/mood-5.png';
import '../styles.css'

import TextRevealAnimation from '../components/TextRevealAnimation';
import PageTransition from '../components/PageTransition';

// Subcomponent to safely render post list and filters without breaking hook rules
const PostList = ({ posts = [], filter = null, onFilterChange = () => {} }) => {
  const filteredPosts = useMemo(() => {
    if(!posts || !Array.isArray(posts) || !filter) return posts || [];

    const now = new Date();

    switch(filter) {
      case 'today':
        return posts.filter(post => {
          if(!post?.created_at?.seconds) return false;
          const postDate = new Date(post.created_at.seconds * 1000);
          return postDate.toDateString() === now.toDateString();
        });

      case 'week': {
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return posts.filter(post => {
          if(!post?.created_at?.seconds) return false;
          const postDate = new Date(post.created_at.seconds * 1000);
          return postDate >= oneWeekAgo;
        });
      }

      case 'month':
        return posts.filter(post => {
          if(!post?.created_at?.seconds) return false;
          const postDate = new Date(post.created_at.seconds * 1000);
          return (
            postDate.getMonth() === now.getMonth() &&
            postDate.getFullYear() === now.getFullYear()
          );
        });

      default:
        return posts;
    }
  }, [posts, filter]);

  return (
    <>
      <div className='d-flex flex-row justify-content-start align-items-center gap-3 moody-filter-section mt-4 mb-3'>
        <button
          type='button'
          className={`btn moody-secondary-btn box-border rounded moody-filter-btn 
            ${filter === 'today' ? 'bg-black text-white fw-bolder font-monospace' : ''}`}
          onClick={() => onFilterChange('filterby', 'today')}
        >
          Today
        </button>
        <button
          type='button'
          className={`btn moody-secondary-btn box-border rounded moody-filter-btn 
            ${filter === 'week' ? 'bg-black text-white fw-bolder font-monospace' : ''}`}
          onClick={() => onFilterChange('filterby', 'week')}
        >
          Week
        </button>
        <button
          type='button'
          className={`btn moody-secondary-btn box-border rounded moody-filter-btn 
            ${filter === 'month' ? 'bg-black text-white fw-bolder font-monospace' : ''}`}
          onClick={() => onFilterChange('filterby', 'month')}
        >
          Month
        </button>
        <button
          type='button'
          className={`btn moody-secondary-btn box-border rounded moody-filter-btn 
            ${filter === null ? 'bg-black text-white fw-bolder font-monospace' : ''}`}
          onClick={() => onFilterChange('filterby', null)}
        >
          All
        </button>
      </div>
      <div className='moody-postlist-section pe-1'>
        {filteredPosts && filteredPosts.length > 0 ? (
          filteredPosts.map((items, index) => (
            <MoodyPostCard
              key={items.id || index}
              index={index}
              mood={items.user_mood}
              post={items.body}
              date={items.created_at}
            />
          ))
        ) : (
          <div className='text-center text-secondary py-4'>
            No posts available. Start your mood journey now!
          </div>
        )}
      </div>
    </>
  );
};

PostList.propTypes = {
  posts: PropTypes.array,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
};

const MoodyHome = () => {
  const [currentMood, setCurrentMood] = useState('');
  const [postBody, setPostBody] = useState('');

  const { postData } = useLoaderData();
  const navigation = useNavigation();
  const fetcher = useFetcher();

  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filterby');

  useEffect(() => {
    if (fetcher.data?.message) {
      if (fetcher.data.success) {
        message.success(fetcher.data.message);
      }
      else {
        message.error(fetcher.data.message || 'Failed to submit post');
      }
    }
  }, [fetcher.data]);

  const handleMoodClick = (moodName) => {
    setCurrentMood(moodName);
  };

  const handleMoodPost = (e) => {
    e.preventDefault();

    if (!currentMood) {
      message.warning('Please select a mood first!');
      return;
    }

    if (postBody.trim().length < 10) {
      message.warning('Post must be at least 10 characters long.');
      return;
    }

    Modal.confirm({
      title: 'Post Confirmation',
      content: 'Are you sure you want to share this entry? Once posted, you cannot edit or delete it.',
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
        );
        setCurrentMood('');
        setPostBody('');
      }
    });
  };

  const handleFilterChange = (key, value) => {
    setSearchParams(prevSearch => {
      const nextSearch = new URLSearchParams(prevSearch);
      if (value === null) {
        nextSearch.delete(key);
      }
      else {
        nextSearch.set(key, value);
      }
      return nextSearch;
    });
  };

  const isSubmitting = navigation.state === 'submitting' || fetcher.state === 'submitting';

  return (
    <PageTransition>
      <section
        className='d-flex flex-column justify-content-center align-items-center gap-3'
        style={{ marginTop: '8rem', marginBottom: '4rem' }}
      >
        <h1 className='text-center'>
          <TextRevealAnimation text='Welcome to Moody' />
        </h1>
        <p className='text-center text-secondary mb-0'>Your personal mood tracker and journal.</p>
        <p className='text-center text-secondary mt-0 mb-0'>Keep track of your moods and reflect on your day.</p>
        <div
          className='d-flex flex-column justify-content-center align-items-center p-1'
          style={{ width: '100%', maxWidth: '420px', margin: '0 auto' }}
        >
          <div className='d-flex flex-row justify-content-center align-items-center gap-2 mb-2 moody-reaction-section'>
            <button
              type='button'
              className={`btn mood-reaction-btn ${currentMood === 'Awful' || currentMood === '' ? '' : 'mood-reaction-btn-disabled'}`}
              onClick={() => handleMoodClick('Awful')}
              disabled={isSubmitting}
            >
              <img
                src={MoodAwful}
                alt='Mood Awful'
                className='mood-icon'
                loading='lazy'
              />
              <span className='mood-text'>Awful</span>
            </button>
            <button
              type='button'
              className={`btn mood-reaction-btn ${currentMood === 'Bad' || currentMood === '' ? '' : 'mood-reaction-btn-disabled'}`}
              onClick={() => handleMoodClick('Bad')}
              disabled={isSubmitting}
            >
              <img
                src={MoodBad}
                alt='Mood Bad'
                className='mood-icon'
                loading='lazy'
              />
              <span className='mood-text'>Bad</span>
            </button>
            <button
              type='button'
              className={`btn mood-reaction-btn ${currentMood === 'Meh' || currentMood === '' ? '' : 'mood-reaction-btn-disabled'}`}
              onClick={() => handleMoodClick('Meh')}
              disabled={isSubmitting}
            >
              <img
                src={MoodMeh}
                alt='Mood Meh'
                className='mood-icon'
                loading='lazy'
              />
              <span className='mood-text'>Meh</span>
            </button>
            <button
              type='button'
              className={`btn mood-reaction-btn ${currentMood === 'Good' || currentMood === '' ? '' : 'mood-reaction-btn-disabled'}`}
              onClick={() => handleMoodClick('Good')}
              disabled={isSubmitting}
            >
              <img
                src={MoodGood}
                alt='Mood Good'
                className='mood-icon'
                loading='lazy'
              />
              <span className='mood-text'>Good</span>
            </button>
            <button
              type='button'
              className={`btn mood-reaction-btn ${currentMood === 'Amazing' || currentMood === '' ? '' : 'mood-reaction-btn-disabled'}`}
              onClick={() => handleMoodClick('Amazing')}
              disabled={isSubmitting}
            >
              <img
                src={MoodAmazing}
                alt='Mood Amazing'
                className='mood-icon'
                loading='lazy'
              />
              <span className='mood-text'>Amazing</span>
            </button>
          </div>

          <form
            onSubmit={handleMoodPost}
            id='mood-form-submit'
            className='w-100'
          >
            <textarea
              cols={40}
              rows={5}
              name='post'
              id='post'
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
              className='form-control google-login-btn'
              style={{ height: '150px', maxHeight: '270px', resize: 'none' }}
              placeholder='Write about your day (min 10 characters)...'
              required
            />
            <button
              type='submit'
              className='btn moody-primary-btn box-border mt-3'
              disabled={isSubmitting || currentMood === '' || postBody.trim().length < 10}
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
          </form>
          <div className='w-100 mt-2'>
            <Suspense fallback={
              <div className='text-center text-secondary my-5'>
                <span className='moody-loading-text-style'>Loading my Mood...</span>
              </div>
            }>
              <Await resolve={postData}>
                {(resolvedPosts) => (
                  <PostList
                    posts={resolvedPosts}
                    filter={filter}
                    onFilterChange={handleFilterChange}
                  />
                )}
              </Await>
            </Suspense>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default memo(MoodyHome);