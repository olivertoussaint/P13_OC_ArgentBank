export const saveThemePreference = (isDarkMode) => {
    localStorage.setItem('isDarkMode', isDarkMode);
  };
  
  export const loadThemePreference = () => {
    return localStorage.getItem('isDarkMode') === 'true';
  };
  