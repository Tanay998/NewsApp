import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  render() {
    return (
      <>
        This is a news component<br />
        <NewsItem /><br />
        <NewsItem /><br />
        <NewsItem /><br />
        <NewsItem /><br />
      </>
    )
  }
}

export default News
