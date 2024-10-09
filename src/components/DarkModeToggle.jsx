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
    <button
      onClick={toggleDarkMode}
      className="p-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
    >
      {isDarkMode ? (
        <FontAwesomeIcon icon={faSun} className='text-yellow-500' />
      ) : (
        <FontAwesomeIcon icon={faMoon} className='text-blue-500' />
      )}
      
    </button>
  );
};

export default DarkModeToggle;
