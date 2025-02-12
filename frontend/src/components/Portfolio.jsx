import { useState, useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';
import QuickLinks from './QuickLinks';
import { fetchSkills } from '../services/api';

const Portfolio = () => {
  const [text, setText] = useState('');
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [skills, setSkills] = useState([]);

  const commands = [
    'Loading portfolio...',
    'Initializing skills database...',
    'Connecting to projects repository...',
    "Welcome to Si Li's digital space!"
  ];
  

  useEffect(() => {
    if (currentCommandIndex < commands.length) {
      const timer = setTimeout(() => {
        setText(commands[currentCommandIndex]);
        setCurrentCommandIndex(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentCommandIndex]);

  useEffect(() => {
    const loadSkills = async () => {
      const skillsData = await fetchSkills();
      setSkills(skillsData);
    };
    loadSkills();
  }, []);

  return (
    <>
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto pt-16 px-4">
        <Header text="portfolio.exe" />
        <Hero typingText={text} />
      </div>

      <div className="container mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Skills skills={skills} />
        <Projects />
        <Experience />
      </div>

      <div className="container mx-auto pb-16 px-4">
        <QuickLinks />
      </div>
    </div>
    </>
  );
};

export default Portfolio;
