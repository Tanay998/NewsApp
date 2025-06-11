import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    
    const defaultImage = "https://image.cnbcfm.com/api/v1/image/108133398-1744901282932-gettyimages-2210727739-anotherday18620636_mw2vfms2.jpeg?v=1749418062&w=1920&h=1080";
    
    return (
      <div className="card h-100">
        <div style={{ position: 'relative' }}>
          <img 
            src={imageUrl || defaultImage} 
            className="card-img-top" 
            alt={title || "News image"}
            style={{ height: "200px", objectFit: "cover" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultImage;
            }}
          />
          {/* Centered badge at the top */}
          <div className="d-flex justify-content-center w-100" style={{ position: 'absolute', top: '180px' }}>
            <span className="badge rounded-pill bg-danger px-3 py-2">
              {source}
            </span>
          </div>
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-text flex-grow-1">{description}.....</p>
          <p className="card-text">
            <small className="text-muted">
              By {author || "Unknown"} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a 
            href={newsUrl} 
            target="_blank" 
            rel="noreferrer"
            className="btn btn-sm btn-dark mt-2 align-self-start"
          >
            Read more
          </a>
        </div>
      </div>
    )
  }
}

export default NewsItem