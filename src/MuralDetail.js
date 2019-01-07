import React, { Component } from 'react';
import Header from "./Header";
import axios from "axios";

class MuralDetail extends Component {
  constructor(props) {
    super(props);
    this.loadInfo();
    this.state = {
      loading: true,
    };
  }

  loadInfo() {
    const muralURL = 'https://muralproject-483dd.firebaseio.com/murals/' + this.props.match.params.id + '.json';
    let muralInfo = {};
    axios.get(muralURL)
    .then(res => {
      muralInfo = res.data;
      const artistURL = 'https://muralproject-483dd.firebaseio.com/artists/' + muralInfo.artist + '.json';
      return axios.get(artistURL);
    })
    .then(res => {
      muralInfo.artist = res.data;
      this.setState({
        muralInfo: muralInfo,
        loading: false,
      });
    });
  }

  render() {
    if (this.state.loading) {
      return null;
    }
    const mural = this.state.muralInfo;
    return (
      <div>
        <Header menuButton={true}/>
        <div>
          <h1>Name: {mural.name}</h1>
          <br/>
          <h2>Category: {mural.category}</h2>
          <br/>
          <h3>Artist: {mural.artist.name}</h3>
          <h3>{mural.artist.description}</h3>
          <img src={mural.image} alt={"Image of " + mural.name} className="muralImage"/>
        </div>
      </div>
    );
  }
}

export default MuralDetail;
