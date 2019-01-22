import React, { Component } from 'react';
import SimpleMap from './SimpleMap';
import CategorySelector from "./CategorySelector";
import axios from "axios";
import Header from "./Header";

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
      if (!muralList) {
        throw new Error("Mural list does not exist");
      }
      let categoryList = [];
      let activeCategories = {};
      let modifiedMuralList = [];
      muralList.forEach((mural, i) => {
        if (!mural) {
          return;
        }
        const category = mural.category;
        activeCategories[category] = true;
        if (!categoryList.includes(category)) {
          categoryList.push(category);
        }
        mural["id"] = i;
        modifiedMuralList.push(mural);
      });

      this.setState({
        murals: modifiedMuralList,
        activeCategories: activeCategories,
        categoryList: categoryList,
        loading: false,
      });
    })
    .catch(error => {
      this.setState({
        loading: false,
        error: error,
      });
    });
  }

  modifyCategory = category => {
    let activeCatCopy = JSON.parse(JSON.stringify(this.state.activeCategories));
    activeCatCopy[category.text] = category.selected;
    this.setState(prevState => {
      return {activeCategories: activeCatCopy};
    });
  }
  createMuralsList() {
    let murals = [];
    this.state.murals.forEach(mural => {
      if (this.state.activeCategories[mural.category]) {
        murals.push(mural);
      }
    })
    return murals;
  }

  render() {
    if (this.state.loading) {
      return <div><Header animate={true}/></div>;
    }
    if (this.state.error) {
      return <div><p>{this.state.error.toString()}</p></div>;
    }
    return (
      <div>
        <Header menuButton={true}/>
        <div className="body">
          <div id="homeMessage">
            <h1>The easiest way to find murals in DC</h1>
            <h2>Tap below to discover the murals!</h2>
          </div>
          <div id="mapBox">
            <SimpleMap
              murals={this.createMuralsList()}
            />
            <CategorySelector
              categoryList={this.state.categoryList}
              activeCategories={this.state.activeCategories}
              modifyCategory={this.modifyCategory}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
