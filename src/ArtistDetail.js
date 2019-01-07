import React, { Component } from 'react';
import Header from "./Header";
import axios from "axios";

class ArtistDetail extends Component {
  constructor(props) {
    super(props);
    this.loadInfo();
    this.state = {
      loading: true,
    };
  }

  loadInfo() {
    const artistURL = 'https://muralproject-483dd.firebaseio.com/artists/' + this.props.match.params.id + '.json';
    axios.get(artistURL)
    .then(res => {
      const artistInfo = res.data;
      this.setState({
        artistInfo: artistInfo,
        loading: false,
      });
    });
  }

  render() {
    if (this.state.loading) {
      return null;
    }
    const artist = this.state.artistInfo;
    return (
      <div>
        <Header menuButton={true}/>
        <div>
          <h1>Name: {artist.name}</h1>
          <br/>
          <h2>Description: {artist.description}</h2>
          <br/>
        </div>
      </div>
    );
  }
}

export default ArtistDetail;
