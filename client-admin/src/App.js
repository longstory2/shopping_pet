import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './components/LoginComponent';
import Main from './components/MainComponent';
import MyProvider from './contexts/MyProvider';

class App extends Component {
render () {
return (
   <MyProvider>
       <Login/>
       <BrowserRouter>
        <Main />
        </BrowserRouter>
   </MyProvider>
 ) ;
 }
 }
 export default App ;