import React, { Component } from 'react';
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
    axios.get(muralURL)
    .then(res => {
      const muralInfo = res.data;

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
        <h1>Name: {mural.name}</h1>
        <br/>
        <h2>Category: {mural.category}</h2>
        <br/>
        <h2>Location:</h2>
        <h3>Latitude: {mural.lat}</h3>
        <h3>Longitude: {mural.lng}</h3>
        <br/>
        <img src={mural.image} alt={"Image of " + mural.name} className="muralImage"/>
      </div>
    );
  }
}

export default MuralDetail;
