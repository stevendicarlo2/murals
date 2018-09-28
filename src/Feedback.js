import React, { Component } from 'react';
import Header from "./Header";

class Feedback extends Component {

  render() {
    return (
      <div>
        <Header menuButton={true}/>
        <p>
          Some message about how to give feedback
        </p>
      </div>
    );
  }
}

export default Feedback;
