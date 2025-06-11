import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

const categories = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology'
];

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      selectedCategory: this.props.category || 'general'
    }
    document.title = `${this.capitalizeFirstLetter(this.state.selectedCategory)} - NewsApp`;
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async componentDidMount() {
    this.fetchNews();
  }

  async fetchNews() {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/everything?q=${this.state.selectedCategory}&apiKey=d6484692fff743309c2420e629dff1b6&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      
      // Filter out articles without titles
      const filteredArticles = parsedData.articles.filter(article => article.title);
      
      this.setState({
        articles: filteredArticles,
        totalResults: parsedData.totalResults,
        loading: false
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ 
        articles: [],
        loading: false 
      });
    }
  }

  handleCategoryChange = async (category) => {
    await this.setState({ 
      selectedCategory: category,
      page: 1,
      articles: []
    });
    document.title = `${this.capitalizeFirstLetter(category)} - NewsApp`;
    this.fetchNews();
  }

  handlePreviousClick = async () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 }, () => {
        this.fetchNews();
        window.scrollTo(0, 0);
      });
    }
  }

  handleNextClick = async () => {
    const { page, totalResults } = this.state;
    const maxPages = Math.ceil(totalResults / this.props.pageSize);
    
    if (page < maxPages) {
      this.setState({ page: this.state.page + 1 }, () => {
        this.fetchNews();
        window.scrollTo(0, 0);
      });
    }
  }

  render() {
    const { articles, page, totalResults, loading, selectedCategory } = this.state;
    const totalPages = Math.ceil(totalResults / this.props.pageSize);

    return (
      <>
        <div className="container my-3">
          <h2 className="text-center">NewsApp - {this.capitalizeFirstLetter(selectedCategory)} News</h2>
          
          {/* Category Buttons */}
          <div className="d-flex flex-wrap justify-content-center my-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`btn mx-2 my-1 ${selectedCategory === category ? 'btn-dark' : 'btn-outline-dark'}`}
                onClick={() => this.handleCategoryChange(category)}
              >
                {this.capitalizeFirstLetter(category)}
              </button>
            ))}
          </div>

          {loading && <Spinner />}

          {!loading && articles.length === 0 && (
            <div className="alert alert-warning text-center">
              No news articles found for this category. Please try another category.
            </div>
          )}

          <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
            {!loading && articles.map((element) => {
              return (
                <div className="col" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={element.description ? element.description.slice(0, 85) : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source?.name}
                  />
                </div>
              )
            })}
          </div>

          {!loading && articles.length > 0 && (
            <div className="container d-flex justify-content-between mt-4">
              <button 
                type='button' 
                disabled={page <= 1 || loading} 
                className='btn btn-primary' 
                onClick={this.handlePreviousClick}
              >
                Previous &larr;
              </button>
              <span className="mx-2 my-auto">Page {page} of {totalPages}</span>
              <button 
                type='button' 
                className='btn btn-success' 
                onClick={this.handleNextClick}
                disabled={page >= totalPages || loading}
              >
                &rarr; Next
              </button>
            </div>
          )}
        </div>
      </>
    )
  }
}