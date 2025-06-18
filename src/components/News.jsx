import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

let lastScrollTop  = 0;
export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      hasMore: true
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsApp`;
  }
  

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getArticleKey = (article) => {
    return `${article.url}-${article.publishedAt}-${Math.random().toString(36).substr(2, 9)}`;
  }

  async componentDidMount() {
    this.fetchNews();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    lastScrollTop = 0;
  }

  handleScroll = () => {
    const { loading, hasMore } = this.state;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const isScrollingDown = scrollTop > lastScrollTop;
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    if (
      isScrollingDown &&
      !loading && 
      hasMore &&
      window.innerHeight + scrollTop + 500 >= document.documentElement.offsetHeight
    ) {
      this.loadMoreNews();
    }
  };

  loadMoreNews = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }), 
      () => this.fetchNews()
    );
  };

  async fetchNews() {
    const apiKey = import.meta.env.VITE_NEWS_API_KEY;
    const apiUrl = import.meta.env.VITE_NEWS_API_URL;
    const showProgress = !this.props.isInitial || this.state.page>1;
    if(showProgress){
      this.props.setProgress(10); // Start loading bar
    }
    this.setState({ loading: true });
    
    let url = `${apiUrl}/everything?q=${this.props.category}&apiKey=${apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    try {
      let data = await fetch(url);
      if(showProgress) this.props.setProgress(50); // Progress after fetch
      let parsedData = await data.json();
      if(showProgress) this.props.setProgress(70); // Progress after parsing
      
      const filteredArticles = parsedData.articles.filter(article => 
        article.title && article.description
      );
      
      const hasMore = this.state.page * this.props.pageSize < parsedData.totalResults;

      this.setState(prevState => ({
        articles: [...prevState.articles, ...filteredArticles],
        totalResults: parsedData.totalResults,
        loading: false,
        hasMore
      }));
      if(showProgress) this.props.setProgress(100); // Complete loading bar
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ 
        loading: false,
        hasMore: false
      });
      // this.props.setProgress(100); // Complete even on error
    }
  }

  render() {
    const { articles, loading, hasMore } = this.state;

    return (
      <div className="container my-3">
        <h2 className="text-center">NewsApp - {this.capitalizeFirstLetter(this.props.category)} News</h2>
        
        {loading && this.state.page === 1 && <Spinner />}

        {!loading && articles.length === 0 && (
          <div className="alert alert-warning text-center">
            No news articles found. Please try another category.
          </div>
        )}

        <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
          {articles.map((element) => (
            <div className="col" key={this.getArticleKey(element)}>
              <NewsItem {...element} />
            </div>
          ))}
        </div>

        {loading && this.state.page > 1 && (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {!loading && !hasMore && articles.length > 0 && (
          <p className="text-center mt-4">
            You've reached the end of the news feed
          </p>
        )}
      </div>
    );
  }
}