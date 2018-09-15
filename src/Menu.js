import React, { Component } from 'react';
import MenuItem from './MenuItem';

class Menu extends Component {
  constructor(props) {
    super(props);
  }

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
        {this.createList()}
      </div>
    );
  }
}


export default Menu;
