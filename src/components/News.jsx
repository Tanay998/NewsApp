import React, { Component } from 'react';
import NewsItem from './NewsItem';

export default class News extends Component {
  constructor() {
    super();
    console.log("Hello I am constructor from News Component");
    this.state = {
      articles: [],
      loading: false
    }

  }
  async componentDidMount() {
    console.log("cdm");
    let url = "https://newsapi.org/v2/top-headlines?country=&category=business&apiKey=d6484692fff743309c2420e629dff1b6";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles
    });

  }
  render() {
    console.log("render");

    return (
      <>
        <div className="container my-3">
          <h2>News Ninja - Top News</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
            {this.state.articles.map((element) => {
              return (
                <div className="col" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={element.description ? element.description.slice(0, 85) : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </>
    )
  }
}
