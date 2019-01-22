import React, { Component } from 'react';
import Header from "./Header";
import axios from "axios";

class About extends Component {
  constructor(props) {
    super(props);
    this.loadInfo();
    this.state = {
      loading: true,
    };
  }

  loadInfo() {
    const url = 'https://muralproject-483dd.firebaseio.com/info_pages/about.json';
    axios.get(url)
    .then(res => {
      if (!res.data) {
        throw new Error("Error loading info page");
      }
      const info = res.data;
      this.setState({
        message: info,
        loading: false,
      });
    })
    .catch(error => {
      this.setState({
        loading: false,
        error: error,
      });
    });
  }

  render() {
    if (this.state.loading) {
      return <div><Header animate={true}/></div>;
    }
    if (this.state.error) {
      return <div><p>{this.state.error.toString()}</p></div>;
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

export default About;
