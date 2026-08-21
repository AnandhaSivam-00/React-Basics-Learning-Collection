import { useCallback, memo } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

import Awful from '../assets/mood-1.png';
import Bad from '../assets/mood-2.png';
import Meh from '../assets/mood-3.png';
import Good from '../assets/mood-4.png';
import Amazing from '../assets/mood-5.png';

import '../styles.css'

const MOOD_ICONS = {
  Awful,
  Bad,
  Meh,
  Good,
  Amazing
};

const MoodyPostCard = ({
  userName = null,
  post = '',
  date = null,
  mood = 'Good',
  index = 0
}) => {
  // Format Firestore timestamp to date string
  const formatDate = useCallback((timestamp) => {
    if (!timestamp) return "N/A";

    try {
      if (timestamp.seconds) {
        const dateObj = new Date(timestamp.seconds * 1000);
        return dateObj.toLocaleDateString();
      }
      if (timestamp instanceof Date) {
        return timestamp.toLocaleDateString();
      }
      return "Invalid date";
    }
    catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  }, []);

  // Format Firestore timestamp to time string
  const formatTime = useCallback((timestamp) => {
    if (!timestamp) return "N/A";

    try {
      if (timestamp.seconds) {
        const dateObj = new Date(timestamp.seconds * 1000);
        return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
          .replace(/am|pm/i, match => match.toUpperCase());
      }
      if (timestamp instanceof Date) {
        return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
          .replace(/am|pm/i, match => match.toUpperCase());
      }
      return "Invalid time";
    }
    catch (error) {
      console.error("Error formatting time:", error);
      return "Invalid time";
    }
  }, []);

  // Clean formatted content safe from XSS (support legacy posts with <br /> by converting to newlines)
  const cleanContent = typeof post === 'string'
    ? post.replace(/<br\s*\/?>/gi, '\n')
    : String(post ?? '');

  const moodImage = MOOD_ICONS[mood] || Good;

  return (
    <motion.div 
      className='card p-3 w-100 shadow-sm mb-3 moody-post-card'
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
      }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
      viewport={{ once: true }}
    >
      <div className='card-title mb-2'>
        <div className='d-flex justify-content-between align-items-center'>
          <span 
            className='text-secondary' 
            style={{fontSize: 'smaller'}}
          >
            {formatDate(date)} • {formatTime(date)}
          </span>
          <img
            src={moodImage}
            alt={`Mood ${mood}`}
            width={32}
            height={32}
            loading='lazy'
          />
        </div>
      </div>
      <div className='card-body p-0 mb-0'>
        <p className='moody-post-body mb-2'>{cleanContent}</p>
      </div>
      {userName ? (
        <div className='text-end mt-1'>
          <span className='text-xs text-secondary italic'>— {userName}</span>
        </div>
      ) : null}
    </motion.div>
  )
}

MoodyPostCard.propTypes = {
  userName: PropTypes.string,
  post: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  date: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.instanceOf(Date)]),
  mood: PropTypes.string,
  index: PropTypes.number,
};

export default memo(MoodyPostCard);