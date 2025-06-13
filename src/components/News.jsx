import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsApp`;
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async componentDidMount() {
    this.fetchNews();
  }

  async fetchNews() {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/everything?q=${this.props.category}&apiKey=d6484692fff743309c2420e629dff1b6&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      
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

  handlePreviousClick = async () => {
    this.setState({ page: this.state.page - 1 }, () => {
      this.fetchNews();
      window.scrollTo(0, 0);
    });
  }

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 }, () => {
      this.fetchNews();
      window.scrollTo(0, 0);
    });
  }

  render() {
    const { articles, page, totalResults, loading } = this.state;
    const totalPages = Math.ceil(totalResults / this.props.pageSize);

    return (
      <div className="container my-3">
        <h2 className="text-center">NewsApp - {this.capitalizeFirstLetter(this.props.category)} News</h2>
        
        {loading && <Spinner />}

        {!loading && articles.length === 0 && (
          <div className="alert alert-warning text-center">
            No news articles found. Please try another category.
          </div>
        )}

        <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
          {!loading && articles.map((element) => (
            <div className="col" key={element.url}>
              <NewsItem {...element} />
            </div>
          ))}
        </div>

        {!loading && articles.length > 0 && (
          <div className="container d-flex justify-content-between mt-4">
            <button 
              disabled={page <= 1} 
              className="btn btn-primary"
              onClick={this.handlePreviousClick}
            >
              Previous
            </button>
            <span className="mx-2 my-auto">Page {page} of {totalPages}</span>
            <button 
              disabled={page >= totalPages}
              className="btn btn-success"
              onClick={this.handleNextClick}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  }
}