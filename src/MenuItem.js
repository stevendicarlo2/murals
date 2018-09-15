import React, { Component } from 'react';

class MenuItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <a href={this.props.link}>{this.props.text}</a>
      </div>
    );
  }
}


export default MenuItem;
