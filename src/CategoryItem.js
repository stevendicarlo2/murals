import React, { Component } from 'react';

class CategoryItem extends Component {
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
      <div className="categoryItem">
        <input type="checkbox" id={"checkbox"+this.state.text} onChange={() => this.updateSelected()} checked={this.state.selected}/>
        <label htmlFor={"checkbox"+this.state.text}>{this.state.text}</label>
      </div>
    );
  }
}

export default CategoryItem;
