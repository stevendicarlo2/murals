import React, { Component } from 'react';
import SimpleMap from './SimpleMap';
import CategorySelector from "./CategorySelector";
import axios from "axios"

class Home extends Component {
  constructor(props) {
    super(props);
    this.loadInfo();
    this.state = {
      loading: true,
    };
  }

  loadInfo() {
    axios.get('https://muralproject-483dd.firebaseio.com/murals.json')
    .then(res => {
      const muralList = res.data;
      let categoryList = [];
      for (let category in muralList) {
        categoryList.push({"text": category, "selected": true});
      };

      this.setState({
        murals: muralList,
        categoryList: categoryList,
        loading: false,
      });
    });
  }

  modifyCategory = category => {
    let catListCopy = JSON.parse(JSON.stringify(this.state.categoryList));
    catListCopy.forEach((item, i) => {
      if (item.text === category.text) {
        catListCopy[i].selected = category.selected;
      }
    });
    this.setState(prevState => {
      return {categoryList: catListCopy};
    });
  }
  createMuralsList() {
    let murals = [];
    this.state.categoryList.forEach(category => {
      if (category.selected) {
        this.state.murals[category.text].forEach(item => {
          murals.push(item);
        });
      }
    })
    return murals
  }

  render() {
    if (this.state.loading) {
      return null;
    }
    return (
      <div id="mapBox">
        <SimpleMap
          murals={this.createMuralsList()}
        />
        <CategorySelector
          categoryList={this.state.categoryList}
          modifyCategory={this.modifyCategory}
        />
      </div>
    );
  }
}

export default Home;
