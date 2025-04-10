import React from 'react'

import Awful from '../assets/mood-1.png';
import Bad from '../assets/mood-2.png';
import Meh from '../assets/mood-3.png';
import Good from '../assets/mood-4.png';
import Amazing from '../assets/mood-5.png';

import '../styles.css'

const MoodyPostCard = (props) => {

  // Format Firestore timestamp to date string
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";

    try {
      // Check if the timestamp is a Firestore Timestamp object
      if (timestamp.seconds) {
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleDateString();
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
  };

  // Format Firestore timestamp to time string
  const formatTime = (timestamp) => {
    if (!timestamp) return "N/A";

    try {
      // Check if the timestamp is a Firestore Timestamp object
      if (timestamp.seconds) {
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
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
  };


  return (
    <div className='card p-2 w-100 shadow-sm mb-2 moody-post-card'>
      <div className='card-title'>
        <div className='d-flex justify-content-between align-items-center'>
          <span 
            className='text-secondary' 
            style={{fontSize: 'smaller'}}
          >
            {formatDate(props.date)} - {formatTime(props.date)}
          </span>
          <img
            src={props.mood === 'Awful' 
              ? Awful : props.mood === 'Bad' 
              ? Bad : props.mood === 'Meh' 
              ? Meh : props.mood === 'Good' 
              ? Good : props.mood === 'Amazing' 
              ? Amazing : ''}
            alt={`Mood ${props.mood}`}
            width={30}
            height={30}
          />
        </div>
      </div>
      <div className='card-body p-0 mb-0'>
        <p>{props.post}</p>
      </div>
    </div>
  )
}

export default MoodyPostCard