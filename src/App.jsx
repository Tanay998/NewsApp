import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <News key="general" pageSize={9} category="general" />
      </>
    )
  }
}