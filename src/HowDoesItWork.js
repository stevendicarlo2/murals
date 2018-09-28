import React, { Component } from 'react';
import Header from "./Header";

class HowDoesItWork extends Component {

  render() {
    return (
      <div>
        <Header menuButton={true}/>
        <p>
          Some message about how it works
        </p>
      </div>
    );
  }
}

export default HowDoesItWork;
