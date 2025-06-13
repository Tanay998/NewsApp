import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';

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
  }

  handleCategoryChange = (category) => {
    this.setState({ selectedCategory: category });
  }

  render() {
    return (
      <>
        <Navbar 
          categories={categories}
          selectedCategory={this.state.selectedCategory}
          handleCategoryChange={this.handleCategoryChange}
        />
        <News 
          key={this.state.selectedCategory}
          pageSize={9} 
          category={this.state.selectedCategory} 
        />
      </>
    );
  }
}