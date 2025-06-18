import React, { useState, useRef, useCallback } from 'react';
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

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [isInitial, setIsInitial] = useState(true);
  const loadingBarRef = useRef(null);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setIsInitial(false);
  }, []);

  const setProgress = useCallback((progress) => {
    if (loadingBarRef.current) {
      loadingBarRef.current.complete(progress);
    }
  }, []);

  return (
    <>
      <LoadingBar 
        color="#f11946" 
        ref={loadingBarRef} 
        height={8}
        shadow={true}
        onLoaderFinished={() => loadingBarRef.current?.complete(0)}
      />
      <Navbar 
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
      />
      <News 
        key={selectedCategory}
        pageSize={9} 
        category={selectedCategory}
        setProgress={setProgress}
        isInitial={isInitial}
      />
    </>
  );
};

export default App;