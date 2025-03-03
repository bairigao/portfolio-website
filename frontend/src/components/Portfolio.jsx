import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import Hero from './Hero';
import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';
import QuickLinks from './QuickLinks';
import { FaUser, FaCog, FaSignOutAlt, FaFileDownload } from 'react-icons/fa';

const Portfolio = () => {
  const [text, setText] = useState('');
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();


  const handleResumeDownload = () => {
  // Replace with your actual resume file path
  const resumeUrl = '/path-to-your-resume.pdf';
    
    // Create a link element
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'YourName-Resume.pdf';
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

    // Check for logged-in user
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decode the JWT token to get user info
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({
          username: payload.sub || 'User',
          isAdmin: payload.is_admin || false
        });
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
      }
    }
  }, [currentCommandIndex]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsDropdownOpen(false);
    navigate('/');
  };

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

        {/* Login/Admin button */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors duration-200"
            >
              <FaUser size={16} />
              <span className="text-sm">Admin</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700">
                <Link
                  to="/admin"
                  className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition-colors duration-200"
                >
                  <FaCog className="mr-2" size={16} />
                  Admin Panel
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition-colors duration-200"
                >
                  <FaSignOutAlt className="mr-2" size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/auth"
            className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors duration-200"
          >
            <FaUser size={16} />
            <span className="text-sm">Admin Login</span>
          </Link>
        )}
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
      </div>
  
  );
};

export default Portfolio;