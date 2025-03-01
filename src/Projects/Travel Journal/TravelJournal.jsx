import React from 'react';
import { FlightIcon, LocationIcon } from '../../assets/Icons';

import './TravelJournal.css';

const dataObject = [
  {
    id: 1,
    title: 'Mount Fuji',
    country: 'Japan',
    maplink: 'https://maps.app.goo.gl/kNprN6LxCtGryTT46',
    img: {
      src: 'https://th.bing.com/th/id/OIP.mGFrSIcIh4akyWwT-Bu1KQHaEK?w=268&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      alt: 'mount fuji image'
    },
    description: 'Mount Fuji is the tallest mountain in Japan and a symbol of national pride and natural beauty. Known for its near-perfect symmetry, it attracts tourists and climbers from around the world.'
  },
  {
    id: 2,
    title: 'Eiffel Tower',
    country: 'France',
    maplink: 'https://goo.gl/maps/9Qy1pz7qFbzW4ucP8',
    img: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg',
      alt: 'Eiffel Tower image'
    },
    description: 'The Eiffel Tower is a wrought-iron lattice tower in Paris, France. It is one of the most recognizable structures in the world and a global cultural icon of France.'
  },
  {
    id: 3,
    title: 'Statue of Liberty',
    country: 'USA',
    maplink: 'https://goo.gl/maps/Hc8RFF5z9jQ2',
    img: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Statue_of_Liberty_7.jpg',
      alt: 'Statue of Liberty image'
    },
    description: 'The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor, United States. It represents freedom and democracy.'
  },
  {
    id: 4,
    title: 'Great Wall of China',
    country: 'China',
    maplink: 'https://goo.gl/maps/z9G9XRcT4FJj8W5A6',
    img: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/1/10/20090529_Great_Wall_8185.jpg',
      alt: 'Great Wall of China image'
    },
    description: 'The Great Wall of China is an ancient series of walls and fortifications, spanning across northern China and offering breathtaking views.'
  },
  {
    id: 5,
    title: 'Colosseum',
    country: 'Italy',
    maplink: 'https://goo.gl/maps/VWJ9sLL1zX22',
    img: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg',
      alt: 'Colosseum image'
    },
    description: 'The Colosseum is an oval amphitheatre in the centre of Rome, Italy, known for hosting public spectacles and gladiatorial contests in ancient times.'
  },
  {
    id: 6,
    title: 'Taj Mahal',
    country: 'India',
    maplink: 'https://goo.gl/maps/2Q4DSv3pReL2',
    img: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg',
      alt: 'Taj Mahal image'
    },
    description: 'The Taj Mahal is an ivory-white marble mausoleum in Agra, India, renowned for its stunning architecture and rich history.'
  },
  {
    id: 7,
    title: 'Christ the Redeemer',
    country: 'Brazil',
    maplink: 'https://goo.gl/maps/PwD8sFTWemV2',
    img: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Cristo_Redentor_-_Rio_de_Janeiro%2C_Brasil.jpg',
      alt: 'Christ the Redeemer image'
    },
    description: 'Christ the Redeemer is an Art Deco statue of Jesus Christ in Rio de Janeiro, Brazil, symbolizing peace and welcoming visitors from around the globe.'
  }
]


const Header = () => {
    return (
        <header className='d-flex justify-content-center align-items-center mb-3 travel-header'>
            <FlightIcon width={"3rem"} height={"3rem"} />
            <h1 className='mx-4'>Travel Journal</h1>
        </header>
    )
}

const ArticleCards = (props) => {
  return (
    <div className="card shadow mb-3">
      <div className='row g-0'>
        <div className='col-4 col-md-4 col-sm-4'>
          <img 
            src={props.img.src} 
            alt={props.img.alt}
            className='img-fluid rounded-start'
            width='100%'
            height='4rem' 
          />
        </div>
        <div className="col-8 col-md-8 col-sm-8">
          <div className='card-body'>
            <div className='card-title d-flex justify-content-between align-items-center'>
              <h5 className='align-items-start'><LocationIcon width={25} height={20} />{props.country}</h5>
              <a href={props.maplink}>View on GMap</a>
            </div>
            <h3 className=''>{props.title}</h3>
            <p className='card-text'>{props.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const TravelJournal = () => {
  return (
    <>
      <Header />
      <div className="container-fluid">
        { dataObject.map((data) => {
          return (
            <ArticleCards 
              key={data.id} 
              {...data} 
            /> // Key is used to resolve the issue of unique key for each child in a list

            // If you use data={data} then replace all the props in the main card into the props.data.<blablabla>
          )
        }) }
      </div>
    </>
  )
}

export default TravelJournal