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
      const artistID = muralInfo.artist;
      muralInfo.artist = res.data;
      muralInfo.artist.id = artistID;
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
          <h3>Artist: <a href={"/artist/"+mural.artist.id}>{mural.artist.name}</a></h3>
          <h3>Description: {mural.description}</h3>
          <h3>Hashtag: {mural.hashtag}</h3>
          <h3>Address: {mural.address}</h3>
          <h3>{mural.other}</h3>

          <img src={mural.image} alt={"Image of " + mural.name} className="muralImage"/>
        </div>
      </div>
    );
  }
}

export default MuralDetail;
