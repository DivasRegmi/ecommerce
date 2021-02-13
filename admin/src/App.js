import React from 'react';
import './App.css';

import { ThemeProvider } from '@material-ui/core/styles';

import Routes from './Routes';
import theme from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes />
      </div>
    </ThemeProvider>
  );
};

export default App;
