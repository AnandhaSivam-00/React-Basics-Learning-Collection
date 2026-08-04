import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Import AI-Generated Card Images
import chiefMistralImg from '../assets/cards/chief_mistral.jpg';
import reactFactsImg from '../assets/cards/react_facts.jpg';
import travelJournalImg from '../assets/cards/travel_journal.jpg';
import memeGeneratorImg from '../assets/cards/meme_generator.jpg';
import tenziesGameImg from '../assets/cards/tenzies_game.jpg';
import assemblyEndgameImg from '../assets/cards/assembly_endgame.jpg';
import vansLifeImg from '../assets/cards/vans_life.jpg';
import moodyImg from '../assets/cards/moody.jpg';

const projects = [
  {
    id: 'chief-mistral',
    title: 'Chief Mistral',
    description: 'Smart AI cooking assistant that turns your available pantry ingredients into gourmet recipes.',
    image: chiefMistralImg,
    route: '/chief-mistral',
    category: 'AI & Tools',
    badgeClass: 'bg-warning-subtle text-warning-emphasis border-warning-subtle',
    tags: ['Mistral AI', 'Recipe Builder'],
    btnText: 'Open Chief Mistral',
    btnClass: 'btn-warning text-dark'
  },
  {
    id: 'react-facts',
    title: 'React Facts',
    description: 'Interactive informational hub showcasing core concepts, milestones, and facts about React.',
    image: reactFactsImg,
    route: '/reactfacts',
    category: 'Learning',
    badgeClass: 'bg-info-subtle text-info-emphasis border-info-subtle',
    tags: ['React Core', 'Info Hub'],
    btnText: 'Explore React Facts',
    btnClass: 'btn-info text-white'
  },
  {
    id: 'travel-journal',
    title: 'Travel Journal',
    description: 'Digital travel diary highlighting iconic global destinations with rich imagery and travel notes.',
    image: travelJournalImg,
    route: '/travel-journal',
    category: 'Real-world Apps',
    badgeClass: 'bg-success-subtle text-success-emphasis border-success-subtle',
    tags: ['Travel', 'Cards'],
    btnText: 'View Travel Journal',
    btnClass: 'btn-success'
  },
  {
    id: 'meme-generator',
    title: 'Meme Generator',
    description: 'Fun custom meme creator featuring live text preview and random template generator.',
    image: memeGeneratorImg,
    route: '/meme-generator',
    category: 'Fun & Media',
    badgeClass: 'bg-danger-subtle text-danger-emphasis border-danger-subtle',
    tags: ['Meme API', 'Canvas'],
    btnText: 'Create Memes',
    btnClass: 'btn-danger'
  },
  {
    id: 'tenzies-game',
    title: 'Tenzies Game',
    description: 'Addictive dice-matching game with timer tracking, roll counter, and global leaderboard.',
    image: tenziesGameImg,
    route: '/tenzies-game',
    category: 'Games',
    badgeClass: 'bg-primary-subtle text-primary-emphasis border-primary-subtle',
    tags: ['Redux Toolkit', 'Auth'],
    btnText: 'Play Tenzies',
    btnClass: 'btn-primary'
  },
  {
    id: 'assembly-endgame',
    title: 'Assembly Endgame',
    description: 'Save modern programming languages from extinction by guessing words correctly.',
    image: assemblyEndgameImg,
    route: '/assembly-endgame',
    category: 'Games',
    badgeClass: 'bg-dark-subtle text-dark-emphasis border-dark-subtle',
    tags: ['Word Puzzle', 'Confetti'],
    btnText: 'Play Assembly Endgame',
    btnClass: 'btn-dark'
  },
  {
    id: 'vans-life',
    title: 'VansLife',
    description: 'Comprehensive camper van rental app with host dashboard, van listings, and booking details.',
    image: vansLifeImg,
    route: '/vanslife',
    category: 'Real-world Apps',
    badgeClass: 'bg-warning-subtle text-warning-emphasis border-warning-subtle',
    tags: ['React Router', 'Host Portal'],
    btnText: 'Explore VansLife',
    btnClass: 'btn-warning text-dark'
  },
  {
    id: 'moody',
    title: 'Moody',
    description: 'Social microblogging app to express moods, share updates, and customize your profile.',
    image: moodyImg,
    route: '/moody/login',
    category: 'Real-world Apps',
    badgeClass: 'bg-primary-subtle text-primary-emphasis border-primary-subtle',
    tags: ['Firebase', 'Social Feed'],
    btnText: 'Open Moody',
    btnClass: 'btn-primary'
  }
];

const categories = ['All Projects', 'AI & Tools', 'Real-world Apps', 'Games', 'Learning', 'Fun & Media'];

const HappyDays = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Projects');

  // Dynamic Day Message
  const time = new Date();
  const day = time.toLocaleDateString('en-US', { weekday: 'long' });
  let dayMessage = '';

  switch (day.toLowerCase()) {
    case 'monday':
    case 'tuesday':
    case 'wednesday':
    case 'thursday':
    case 'friday':
      dayMessage = `Happy ${day}!`;
      break;
    default:
      dayMessage = 'Enjoy your Weekend!';
  }

  const filteredProjects = selectedCategory === 'All Projects'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-light min-vh-100 pb-5">

      {/* Hero Section */}
      <header className="bg-white border-bottom py-5 mb-4">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill fw-bold text-uppercase mb-3">
                {dayMessage}
              </span>
              <h1 className="display-5 fw-extrabold text-dark mb-3">
                Explore Interactive React Projects
              </h1>
              <p className="lead text-secondary mb-4">
                A clean, curated collection of web applications, AI utilities, interactive games, and state management experiments built with modern React.
              </p>

              {/* Category Filter Pills */}
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold transition-all ${
                      selectedCategory === cat
                        ? 'btn-primary shadow-sm'
                        : 'btn-outline-secondary border-0 bg-light text-secondary'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Cards Grid */}
      <main className="container">
        <div className="row g-4">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.25 }}
                className="col-12 col-md-6 col-lg-4 col-xl-3"
              >
                <div className="card h-100 shadow-sm border border-light-subtle rounded-3 overflow-hidden d-flex flex-column hover-shadow transition">
                  {/* Image Header with Aspect Ratio */}
                  <div className="position-relative ratio ratio-16x9 bg-secondary-subtle">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="card-img-top object-fit-cover"
                      loading="lazy"
                    />
                    <span
                      className={`position-absolute top-0 end-0 m-2 badge border block w-auto h-auto px-2 py-1 rounded-pill ${project.badgeClass}`}
                      style={{ zIndex: 2 }}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="card-body d-flex flex-column p-4">
                    {/* Tech Badges */}
                    <div className="d-flex gap-1 mb-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="badge bg-light text-secondary border fw-normal"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h5 className="card-title fw-bold text-dark mb-2">
                      {project.title}
                    </h5>

                    <p className="card-text text-muted small flex-grow-1 mb-4" style={{ lineHeight: '1.5' }}>
                      {project.description}
                    </p>

                    {/* Action Button */}
                    <div className="mt-auto">
                      <Link
                        to={project.route}
                        className={`btn ${project.btnClass} w-100 fw-semibold rounded-2 py-2 d-flex align-items-center justify-content-center gap-2 shadow-sm`}
                      >
                        <span>{project.btnText}</span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default HappyDays;