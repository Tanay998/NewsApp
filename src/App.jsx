import React, { Component, createRef } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

const categories = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology'
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: 'general'
    };
    this.loadingBarRef = createRef();
  }

  handleCategoryChange = (category) => {
    this.setState({ selectedCategory: category });
  }

  setProgress = (progress) => {
    this.loadingBarRef.current.complete(progress);
  }

  render() {
    return (
      <>
        <LoadingBar 
          color="#f11946" 
          ref={this.loadingBarRef} 
          height={4}
          shadow={true}
          onLoaderFinished={() => this.loadingBarRef.current.complete(0)}
        />
        <Navbar 
          categories={categories}
          selectedCategory={this.state.selectedCategory}
          handleCategoryChange={this.handleCategoryChange}
        />
        <News 
          key={this.state.selectedCategory}
          pageSize={9} 
          category={this.state.selectedCategory}
          setProgress={this.setProgress}
        />
      </>
    );
  }
}