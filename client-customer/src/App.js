import './App.css';
import React, { Component } from 'react';
import Main from './components/MainComponent';
import MyProvider from './contexts/MyProvider';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <MyProvider>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </MyProvider>

    );
  }
}
export default App;