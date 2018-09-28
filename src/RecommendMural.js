import React, { Component } from 'react';
import Header from "./Header";

class RecommendMural extends Component {

  render() {
    return (
      <div>
        <Header menuButton={true}/>
        <p>
          Some message about how to recommend a new mural
        </p>
      </div>
    );
  }
}

export default RecommendMural;
