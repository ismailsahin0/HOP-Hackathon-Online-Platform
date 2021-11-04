import React, { Component } from "react";
import "./App.css";
import SomeComponent from './someComponent'
import ReactLoading from 'react-loading'

const someAPI = 'https://jsonplaceholder.typicode.com/posts'

class LoadingAnimation extends Component {

  state = {
    someData: [],
    isLoading: true
  }

  componentDidMount() {
    setTimeout(() => { this.someFetch() }, 1200);
  }

  someFetch = () => {
    fetch(someAPI)
      .then(res => res.json())
      .then(res => this.setState({ 
        someData: res,
        isLoading: false })
    )
  }

  render() {
    return (
      <div className="App">
        {this.state.isLoading ? (
          <div>
            <ReactLoading type={"bars"} color={"grey"} />
          </div> 
          ) : (
          <SomeComponent />
          )
        }
      </div>
    );
  }
}

export default LoadingAnimation;