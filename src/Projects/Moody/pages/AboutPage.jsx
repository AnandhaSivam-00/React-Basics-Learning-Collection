import { memo } from 'react'
import TextRevealAnimation from '../components/TextRevealAnimation'
import PageTransition from '../components/PageTransition'
import '../styles.css'

import MoodAwful from '../assets/mood-1.png'
import MoodBad from '../assets/mood-2.png'
import MoodMeh from '../assets/mood-3.png'
import MoodGood from '../assets/mood-4.png'
import MoodAmazing from '../assets/mood-5.png'

const FEATURES = [
  {
    title: 'Daily Mood Logging',
    description: 'Capture how you feel in seconds with 5 distinct mood spectrums and thoughtful journaling notes.'
  },
  {
    title: 'Timeline & History Filters',
    description: 'Effortlessly review your entries filtered by Today, This Week, This Month, or All time.'
  },
  {
    title: 'Community Feeds',
    description: 'Share your state of mind with others and explore real-time reflections from fellow users.'
  },
  {
    title: 'Personalized Profile',
    description: 'Customize your identity and avatar with Cloudinary media integration and Firebase secure authentication.'
  }
];

const AboutPage = () => {
  return (
    <PageTransition>
      <div 
        className='d-flex flex-column justify-content-center align-items-center p-3'
        style={{ marginTop: '8rem', marginBottom: '5rem', maxWidth: '800px', width: '100%' }}
      >
        <div className='text-center mb-4'>
          <h1>
            <TextRevealAnimation text='About Moody' />
          </h1>
          <p className='text-secondary mt-2' style={{ fontSize: '1.1rem' }}>
            Your mindful emotional journal and mood reflection space.
          </p>
        </div>

        <div className='d-flex flex-row justify-content-center align-items-center gap-3 my-3 p-3 bg-white rounded shadow-sm' style={{ border: '2px solid #000' }}>
          <img src={MoodAwful} alt='Awful' width={36} height={36} />
          <img src={MoodBad} alt='Bad' width={36} height={36} />
          <img src={MoodMeh} alt='Meh' width={36} height={36} />
          <img src={MoodGood} alt='Good' width={36} height={36} />
          <img src={MoodAmazing} alt='Amazing' width={36} height={36} />
        </div>

        <div className='card p-4 mt-3 w-100 shadow-sm moody-post-card' style={{ border: '2px solid #000' }}>
          <h2 className='h4 mb-3' style={{ fontFamily: 'Calistoga, sans-serif' }}>Our Philosophy</h2>
          <p className='mb-0 text-dark'>
            Moody was designed to cultivate emotional awareness through micro-journaling. By taking just a moment each day to recognize and name your emotional state, you develop deeper self-understanding and healthier habits.
          </p>
        </div>

        <div className='row g-3 mt-3 w-100'>
          {FEATURES.map((feature, index) => (
            <div key={index} className='col-12 col-md-6'>
              <div className='p-3 h-100 bg-white rounded shadow-sm' style={{ border: '2px solid #000' }}>
                <h3 className='h6 fw-bold mb-2'>{feature.title}</h3>
                <p className='text-secondary small mb-0'>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-4 text-center text-secondary small'>
          Built with React 19 • Firebase Firestore • Framer Motion • Ant Design
        </div>
      </div>
    </PageTransition>
  )
}

export default memo(AboutPage);