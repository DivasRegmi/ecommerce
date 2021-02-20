import React, { useState } from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import getTheme from './configs/themeConfig';
import ThemeContext from './context/ThemeContext';

import { Provider } from 'react-redux';

import Routes from './Routes';
import { store } from './redux/store';

const App = () => {
  const curThemeName = localStorage.getItem('appTheme') || 'light';

  const [themeType, setThemeType] = useState(curThemeName);

  const setThemeName = (themeName) => {
    localStorage.setItem('appTheme', themeName);
    setThemeType(themeName);
  };

  const theme = getTheme({
    paletteType: themeType,
  });

  return (
    <ThemeContext.Provider value={{ setThemeName, curThemeName }}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Provider store={store}>
            <Routes />
          </Provider>
        </div>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
