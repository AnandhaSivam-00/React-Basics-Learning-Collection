import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Wallet from './SampleReducer/Wallet';
// import Welcome from './Welcome';
import HappyDays from './components/HappyDays';
import Undrilling from '../src/MealsListView/Undrilling'
import ReactFacts from './Projects/React Facts/ReactFacts';
import TravelJournal from './Projects/Travel Journal/TravelJournal';
import ChiefMistral from './Projects/Chief Mistral/ChiefMistral';
// import FeedBackForm from './components/FeedBackForm';
import MemeGenerator from './Projects/Meme Generator/MemeGenerator';
import MainContent from './Projects/Tenzies/MainContent';
import MainGamePage from './Projects/Assembly EndGame/MainGamePage';

const App = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Welcome />} /> */}
      <Route path="/undrilling" element={<Undrilling />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/" element={<HappyDays />} />
      <Route path="/reactfacts" element={<ReactFacts />} />
      <Route path="/travel-journal" element={<TravelJournal />} />
      <Route path='/chief-mistral' element={<ChiefMistral />} />
      <Route path='/meme-generator' element={<MemeGenerator />} />
      <Route path='/tenzies-game' element={<MainContent />} />
      <Route path='/assembly-endgame' element={<MainGamePage />} />
    </Routes>
  );
};

export default App;