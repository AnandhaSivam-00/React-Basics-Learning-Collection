import { lazy, Suspense, memo } from 'react'
import { Await, useLoaderData } from 'react-router-dom';
import { Divider } from 'antd'

import '../styles.css'
const MoodyPostCard = lazy(() => import('../components/MoodyPostCard'));
import TextRevealAnimation from '../components/TextRevealAnimation';
import PageTransition from '../components/PageTransition';

const Feeds = () => {
  const { feedsData } = useLoaderData();

  return (
    <PageTransition>
      <section className='p-3' style={{ marginTop: '8rem', marginBottom: '4rem', maxWidth: '900px', width: '100%' }}>
        <div className='text-center'>
          <h1>
            <TextRevealAnimation text='Moody Feeds' />
          </h1>
          <p className='text-secondary'>Explore community thoughts and reflections across the day 🤗</p>
        </div>
        <Divider plain><span className='fs-3'>✨</span></Divider>
        <div className='d-flex flex-column align-items-center gap-3 w-100' style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Suspense fallback={
            <div className='text-center text-secondary my-5'>
              <span className='moody-loading-text-style'>Loading Feeds...</span>
            </div>
          }>
            <Await resolve={feedsData}>
              {(resolvedFeeds) => {
                  if (!resolvedFeeds || resolvedFeeds.length === 0) {
                    return (
                      <div className='text-center text-secondary p-5'>
                        <p>No community posts yet. Be the first to share your mood on the home page!</p>
                      </div>
                    );
                  }

                  return resolvedFeeds.map((post, index) => (
                    <div key={post.id || index} className='w-100'>
                      <MoodyPostCard
                        index={index} 
                        post={post.body} 
                        date={post.created_at} 
                        mood={post.user_mood} 
                        userName={post.user_name}
                      />
                    </div>
                  ));
                }}
            </Await>
          </Suspense>
        </div>
      </section>
    </PageTransition>
  )
}

export default memo(Feeds);