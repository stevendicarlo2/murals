import React, { Component } from 'react';
import Header from "./Header";
import SimpleMap from "./SimpleMap";
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
      if (!artistInfo) {
        throw "Artist with that id does not exist";
      }
      this.setState({
        artistInfo: artistInfo,
      });
    })
    .then(() => {
      const muralURL = 'https://muralproject-483dd.firebaseio.com/murals.json';
      return axios.get(muralURL);
    })
    .then(res => {
      const muralList = res.data;
      if (!muralList) {
        throw "Mural list does not exist";
      }
      let filteredMuralList = [];
      muralList.forEach((mural, i) => {
        if (!mural) {
          return;
        }
        if (mural.artist.toString() !== this.props.match.params.id) {
          return;
        }
        mural.id = i;
        filteredMuralList.push(mural);
      });
      this.setState({
        muralList: filteredMuralList,
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

  render() {
    if (this.state.loading) {
      return <div><Header animate={true}/></div>;
    }
    if (this.state.error) {
      return <div><p>{this.state.error.toString()}</p></div>;
    }
    const artist = this.state.artistInfo;
    return (
      <div>
        <Header menuButton={true}/>
        <div className="body">
          <div>
            <h1>Name: {artist.name}</h1>
            <br/>
            <h2>Description: {artist.description}</h2>
            <br/>
          </div>
          <div id="mapBox">
            <SimpleMap
              murals={this.state.muralList}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ArtistDetail;
