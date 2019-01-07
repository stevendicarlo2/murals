import React, { Component } from 'react';
import logo from './muralLogo.gif';
import menu from "./menuIcon.gif";

class Header extends Component {

  render() {
    return (
      <div className="header">
        {this.props.menuButton &&
          <a href="/menu">
            <img src={menu} alt="Menu Icon" className="menuIcon"/>
          </a>
        }
        <a href="/">
          <img src={logo} alt="Header Icon" className="headerImage"/>
        </a>
      </div>
    );
  }
}

export default Header;
