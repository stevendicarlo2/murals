import React, { Component } from 'react';
import MenuItem from './MenuItem';
import Header from "./Header";

class Menu extends Component {

  createList() {
    return this.props.linkList.map((item, i) => {
      return <MenuItem
        text={item.text}
        link={item.link}
        key={i}
      />;
    });
  }

  render() {
    return (
      <div>
        <Header menuButton={false}/>
        {this.createList()}
      </div>
    );
  }
}


export default Menu;
