import React, { Component } from 'react';

export class Navbar extends Component {
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    const { categories, selectedCategory, handleCategoryChange } = this.props;

    return (
      <>
        <nav className="navbar navbar-expand-lg bg-info navbar-dark py-0" style={{ minHeight: '80px' }}>
          <div className="container-fluid">
            <span className="navbar-brand fw-bold fs-4">NewsApp</span>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarCategories"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarCategories">
              <div className="d-flex flex-wrap ms-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`btn btn-sm mx-1 my-1 ${selectedCategory === category ? 'btn-dark' : 'btn-light'}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {this.capitalizeFirstLetter(category)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;