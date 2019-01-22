import React, { Component } from 'react';
import Header from "./Header";
import axios from "axios";

class HowDoesItWork extends Component {
  constructor(props) {
    super(props);
    this.loadInfo();
    this.state = {
      loading: true,
    };
  }

  loadInfo() {
    const url = 'https://muralproject-483dd.firebaseio.com/info_pages/how_it_works.json';
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
      return <div><Header animate={true}/></div>;
    }
    return (
      <div>
        <Header menuButton={true}/>
        <div className="body">
          <p>{this.state.message}</p>
        </div>
      </div>
    );
  }
}

export default HowDoesItWork;
