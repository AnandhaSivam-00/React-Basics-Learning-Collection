import React, { lazy, Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom';

import { Divider } from 'antd'

import '../styles.css'
import { requireFirebaseAuth } from '../requireFirebaseAuth';
import { getAllUserPostData } from '../dataFetchFunctions';

const MoodyPostCard = lazy(() => import('../components/MoodyPostCard'));
import TextRevealAnimation from '../components/TextRevealAnimation';
import PageTransition from '../components/PageTransition';

export const moodyFeedsLoader = async ({ request }) => {
  await requireFirebaseAuth(request);

  return {
    feedsData: getAllUserPostData()
  }
}

const Feeds = () => {
  const { feedsData } = useLoaderData();

  return (
    <PageTransition>
      <section className='w-100vw h-100vh p-3'>
        <div className='text-center' style={{marginTop: '130px'}}>
          <h1>
            <TextRevealAnimation text='Moody Feeds' />
          </h1>
          <p className='text-secondary'>Here you can explore the other users moody over the day 🤗</p>
        </div>
        <Divider plain ><span className='fs-3'>😍</span></Divider>
        <div className='flex flex-row flex-wrap justify-evenly items-center gap-3'>
          <Suspense fallback={<div className='text-center'>Loading...</div>}>
            <Await resolve={feedsData}>
              {(resolvedFeeds) => {
                  if (!resolvedFeeds || resolvedFeeds.length === 0) {
                    return (
                      <div className='text-center p-5'>
                        <p>No posts available. Be the first to share your mood!</p>
                      </div>
                    );
                  }

                  return resolvedFeeds.map((post, index) => (
                    <div key={post.id}>
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

export default React.memo(Feeds);