import React, { Component } from 'react';
import logo from './muralLogo.gif';
import menu from "./menuIcon.gif";

class Header extends Component {

  render() {
    return (
      <nav className="mynavbar fixed-top ">
        <div className="header">
          {this.props.menuButton &&
            <a href="/menu">
              <img src={menu} alt="Menu Icon" className="menuIcon"/>
            </a>
          }
          {this.props.animate ? (
            <img src={logo} alt="Header Icon" className="headerImage pulse"/>
          ):(
            <a href="/">
              <img src={logo} alt="Header Icon" className="headerImage"/>
            </a>
          )}
          {this.props.menuButton &&
            <div className="centeringDiv"/>
          }
        </div>
      </nav>
    );
  }
}

export default Header;
