import React, { useState, useEffect, useRef, useCallback } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

const News = ({ category, pageSize, setProgress, isInitial }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const lastScrollTopRef = useRef(0);

  const capitalizeFirstLetter = useCallback((string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }, []);

  const getArticleKey = useCallback((article) => {
    return `${article.url}-${article.publishedAt}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const fetchNews = useCallback(async () => {
    const showProgress = !isInitial || page > 1;
    if (showProgress) {
      setProgress(10);
    }
    
    setLoading(true);
    
    const apiKey = import.meta.env.VITE_NEWS_API_KEY;
    const apiUrl = import.meta.env.VITE_NEWS_API_URL;
    const url = `${apiUrl}/everything?q=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    
    try {
      const data = await fetch(url);
      if (showProgress) setProgress(50);
      
      const parsedData = await data.json();
      if (showProgress) setProgress(70);
      
      const filteredArticles = parsedData.articles.filter(article => 
        article.title && article.description
      );
      
      // Calculate hasMore directly without storing totalResults
      const hasMoreData = page * pageSize < parsedData.totalResults;
      setHasMore(hasMoreData);
      
      setArticles(prevArticles => 
        page === 1 ? filteredArticles : [...prevArticles, ...filteredArticles]
      );
      
      if (showProgress) setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      setHasMore(false);
      if (showProgress) setProgress(100);
    }
    setLoading(false);
  }, [category, page, pageSize, setProgress, isInitial]);

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} - NewsApp`;
  }, [category, capitalizeFirstLetter]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const isScrollingDown = scrollTop > lastScrollTopRef.current;
    lastScrollTopRef.current = scrollTop <= 0 ? 0 : scrollTop;

    if (
      isScrollingDown && 
      !loading && 
      hasMore &&
      window.innerHeight + scrollTop + 500 >= document.documentElement.offsetHeight
    ) {
      setPage(prevPage => prevPage + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      lastScrollTopRef.current = 0;
    };
  }, [handleScroll]);

  return (
    <div className="container my-3">
      <h2 className="text-center">NewsApp - {capitalizeFirstLetter(category)} News</h2>
      
      {loading && page === 1 && <Spinner />}

      {!loading && articles.length === 0 && (
        <div className="alert alert-warning text-center">
          No news articles found. Please try another category.
        </div>
      )}

      <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
        {articles.map((element) => (
          <div className="col" key={getArticleKey(element)}>
            <NewsItem {...element} />
          </div>
        ))}
      </div>

      {loading && page > 1 && (
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
};

export default News;