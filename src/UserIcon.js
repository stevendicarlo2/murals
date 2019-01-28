import React, { Component } from 'react';
import userPin from "./userPin.png";


class UserIcon extends Component {

  render() {
    return (
      <div className="userIconContainer">
          <img className="userIcon" src={userPin} alt="User"/>
      </div>
    );
  }
}

export default UserIcon;
