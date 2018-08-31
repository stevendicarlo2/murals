import React, { Component } from 'react';
import CategoryItem from "./CategoryItem";

class CategorySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: props.categoryList,
    };
  }
  createCategories() {
    return this.state.categoryList.map((category, i) => {
      return <CategoryItem
        text={category.text}
        selected={category.selected}
        onChange={this.props.modifyCategory}
        key={i}
      />;
    });
  }
  render() {
    return (
      <div>
        {this.createCategories()}
      </div>
    );
  }
}

export default CategorySelector;
