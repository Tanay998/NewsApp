import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    const { 
      title, 
      description, 
      urlToImage, 
      url, 
      author, 
      publishedAt, 
      source
    } = this.props;
    
    // Safe handling of null values
    const safeTitle = title || "";
    const safeDescription = description || "";
    const defaultImage = "https://image.cnbcfm.com/api/v1/image/108133398-1744901282932-gettyimages-2210727739-anotherday18620636_mw2vfms2.jpeg?v=1749418062&w=1920&h=1080";
    
    return (
      <div className="card h-100">
        <div style={{ position: 'relative' }}>
          <img 
            src={urlToImage || defaultImage} 
            className="card-img-top" 
            alt={safeTitle}
            style={{ height: "200px", objectFit: "cover" }}
            onError={(e) => e.target.src = defaultImage}
          />
          <div className="d-flex justify-content-center w-100" style={{ position: 'absolute', top: '180px' }}>
            <span className="badge rounded-pill bg-danger px-3 py-2">
              {source?.name || "Unknown"}
            </span>
          </div>
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{safeTitle.slice(0, 45)}</h5>
          <p className="card-text flex-grow-1">{safeDescription.slice(0, 85)}...</p>
          <p className="card-text">
            <small className="text-muted">
              By {author || "Unknown"} on {new Date(publishedAt).toGMTString()}
            </small>
          </p>
          <a 
            href={url} 
            target="_blank" 
            rel="noreferrer"
            className="btn btn-sm btn-dark mt-2 align-self-start"
          >
            Read more
          </a>
        </div>
      </div>
    );
  }
}

export default NewsItem;