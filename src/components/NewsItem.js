import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl}=this.props;
    return (
      <div className="card" style={{width: "18rem"}}>
  <img src={!imageUrl?"https://images.moneycontrol.com/static-mcnews/2023/08/WhatsApp-Image-2023-06-05-at-5.44.33-PM-1-770x433.jpeg":imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-dark">For More Info</a>
  </div>
</div>
    )
  }
}

export default NewsItem
