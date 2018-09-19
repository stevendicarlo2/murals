import React, { Component } from 'react';


class MuralLabel extends Component {

  render() {
    const style = this.props.hover ? {backgroundColor: "#F00", cursor: "pointer"} : {};
    return (
      <div className="muralLabelContainer">
        <div className="muralLabel" style={style}>
          {this.props.mural.name}
        </div>
      </div>
    );
  }
}


export default MuralLabel;
