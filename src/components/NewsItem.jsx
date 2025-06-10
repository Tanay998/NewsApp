import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl } = this.props;
    
    // Set default image if imageUrl is not provided
    const defaultImage = "https://image.cnbcfm.com/api/v1/image/108133398-1744901282932-gettyimages-2210727739-anotherday18620636_mw2vfms2.jpeg?v=1749418062&w=1920&h=1080";
    
    return (
      <div className="card h-100">
        <img 
          src={imageUrl || defaultImage} 
          className="card-img-top" 
          alt={title || "News image"}
          style={{ height: "200px", objectFit: "cover" }}
          onError={(e) => {
            e.target.onerror = null;  // Prevent infinite loop
            e.target.src = defaultImage;
          }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-text flex-grow-1">{description}.....</p>
          <a 
            href={newsUrl} 
            target="_blank" 
            rel="noreferrer"
            className="btn btn-sm btn-primary mt-2 align-self-start"
          >
            Read more
          </a>
        </div>
      </div>
    )
  }
}

export default NewsItem