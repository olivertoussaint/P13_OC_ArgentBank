import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="flex justify-center items-center bg-white dark:bg-dark">
      <button
        onClick={toggleDarkMode}
        className="w-10 h-10 flex items-center justify-center  text-black dark:text-white rounded-full transition-colors duration-300 hover:bg-gray-300 hover:text-white"
      >
        {isDarkMode ? (
          <FontAwesomeIcon icon={faSun} className='text-yellow-500' />
        ) : (
          <FontAwesomeIcon icon={faMoon} className='text-blue-500' />
        )}
      </button>
    </div>
  );
};

export default DarkModeToggle;
