import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import store from "./redux/store";

import { createMuiTheme }  from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#484848",
      dark: "#000000"
    },
    secondary: {
      main: "#d84315"
    },
    text: {
      primary: "#64dd17"
    }
  }
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

