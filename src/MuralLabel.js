import React, { Component } from 'react';


class MuralLabel extends Component {

  render() {
    return (
       <div className="muralLabel">
          {this.props.mural.name}
       </div>
    );
  }
}


export default MuralLabel;
