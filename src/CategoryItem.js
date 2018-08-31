import React, { Component } from 'react';

class CategoryItem extends React.Component {
  static defaultProps = {
    selected: false,
    text: "Category"
  };
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      selected: props.selected
    };
  }
  updateSelected() {
    const newSelected = !this.state.selected;
    this.props.onChange({"text": this.state.text, "selected": newSelected});
    this.setState(prevState => {
      return {selected: !prevState.selected}
    });
  }
  render() {
    return (
      <div>
        <input type="checkbox" onChange={() => this.updateSelected()} checked={this.state.selected}/>
        {this.state.text}
      </div>
    );
  }
}

export default CategoryItem;
