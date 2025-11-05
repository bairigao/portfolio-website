import { useState, useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';
import QuickLinks from './QuickLinks';
import ChatBot from './ChatBot';
import { FaFileDownload } from 'react-icons/fa';

const Portfolio = () => {
  const [text, setText] = useState('');
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);


  const handleResumeDownload = () => {
  // Replace with your actual resume file path
  const resumeUrl = 'https://lis-portfolio-website.s3.ap-southeast-2.amazonaws.com/resume/Si+Li+Resume.pdf';
    
    // Create a link element
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Si Li Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const commands = [
    'Loading portfolio...',
    'Initializing skills database...',
    'Connecting to projects repository...',
    "Welcome to Si Li's digital space!"
  ];

  useEffect(() => {
    // Command text animation
    if (currentCommandIndex < commands.length) {
      const timer = setTimeout(() => {
        setText(commands[currentCommandIndex]);
        setCurrentCommandIndex(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentCommandIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      {/* Header buttons */}
      <div className="absolute top-4 right-4 flex items-center space-x-3">
        {/* Resume button */}
        <button
          onClick={handleResumeDownload}
          className="flex items-center space-x-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded transition-colors duration-200"
        >
          <FaFileDownload size={16} />
          <span className="text-sm">Resume</span>
        </button>
      </div>

        <div className="container mx-auto pt-16 px-4">
          <Header text="portfolio.exe" />
          <Hero typingText={text} />
        </div>

        <div className="container mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skills />
          <Projects />
          <Experience />
        </div>

        <div className="container mx-auto pb-16 px-4">
          <QuickLinks />
        </div>

        {/* AI Chatbot - Custom UI (Left side, Chatbase on right) */}
        <ChatBot />
      </div>
  
  );
};

export default Portfolio;