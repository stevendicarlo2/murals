import React, { Component } from 'react';
import Header from "./Header";
import axios from "axios";

class RecommendMural extends Component {
  constructor(props) {
    super(props);
    this.loadInfo();
    this.state = {
      loading: true,
    };
  }

  loadInfo() {
    const url = 'https://muralproject-483dd.firebaseio.com/info_pages/recommend.json';
    axios.get(url)
    .then(res => {
      const info = res.data;
      this.setState({
        message: info,
        loading: false,
      });
    });
  }

  render() {
    if (this.state.loading) {
      return null;
    }
    return (
      <div>
        <Header menuButton={true}/>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default RecommendMural;
