import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';

export class News extends Component {
static defaulprops={
  country:'in',
  pageSize:5,
  category:'general'
}
static propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}
capitalizeFirstLetter=(string)=>{
  return string.charAt(0).toUpperCase()+string.slice(1);
}

  constructor(props)
  {
    super(props);
    // console.log("Hello i am a constructor from One news");
    this.state = {
      articles: [],
      loading: false,
      page: 1
    };
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-One News`;
    
  }
  async componentDidMount()
  {
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=16a4e20e968d4365b4ccaf6d2ccf4d35&page=1page&pageSize=${this.props.pageSize}`;
    {this.setState({loading:true})}
    let data=await fetch(url);
    

    let parsedData=await data.json()
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
  }
  handlePreviousclick=async()=>
{
console.log("previous")
let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=16a4e20e968d4365b4ccaf6d2ccf4d35&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
{this.setState({loading:true})}   
let data=await fetch(url);
let parsedData=await data.json()
    
this.setState(
{
  page:this.state.page - 1,
  articles:parsedData.articles,
  loading:false
})

}
handleNextclick=async()=>
{
console.log("next")
if(!(this.state.page+1> Math.ceil( this.state.totalResults/this.props.pageSize))){
let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=16a4e20e968d4365b4ccaf6d2ccf4d35&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
{this.setState({loading:true})}    
let data=await fetch(url);
let parsedData=await data.json()
this.setState(
{

  page:this.state.page + 1,
  articles:parsedData.articles,
  loading:false

})
}
}

  render() {
    return (
      <>
        <div className="container my-3">
          <h1 className="text-center">Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
         {/*  {this.state.loading && <Spinner/>} */}
                 <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}>
               </InfiniteScroll>
          <div className="row my-3">
         
          {this.state.articles.map((element)=>
          {
            return     <div className=" mx-3 col-md-3 my-3" key={element.url}>
                  <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                </div>

          })}
         
          <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark " onClick={this.handlePreviousclick}>&larr;previous</button>
          <button type="button" disabled={this.state.page+1> Math.ceil( this.state.totalResults/this.props.pageSize)} className="btn btn-dark " onClick={this.handleNextclick}>Next &rarr;</button>
          </div>
          </div>
        </div>
      </>
    );
  }
}

export default News;
