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
      if (!muralInfo) {
        throw "Mural with that id does not exist";
      }
      const artistURL = 'https://muralproject-483dd.firebaseio.com/artists/' + muralInfo.artist + '.json';
      return axios.get(artistURL);
    })
    .then(res => {
      if (!res.data) {
        throw "Artist with that id does not exist";
      }
      const artistID = muralInfo.artist;
      muralInfo.artist = res.data;
      muralInfo.artist.id = artistID;
      this.setState({
        muralInfo: muralInfo,
      });
      if (muralInfo.hashtag.charAt(0) === '#') {
        return muralInfo.hashtag.substring(1);
      } else {
        const temp = muralInfo.hashtag;
        muralInfo.hashtag = "#" + muralInfo.hashtag;
        return temp;
      }
    })
    .catch(error => {
      this.setState({
        loading: false,
        error: error,
      });
    })
    .then(hashtag => {
      const url = 'https://www.instagram.com/explore/tags/'+hashtag+'/?__a=1';
      return axios.get(url);
    })
    .then(res => {
      const instagram = res.data.graphql.hashtag.edge_hashtag_to_media.edges;
      this.setState({
        instagram: instagram,
        loading: false,
      });
    })
    .catch(e => {
      this.setState({
        instagram: [],
        loading: false,
      });
    });
  }
  
  getInstagramImages() {
    let list = []
    this.state.instagram.forEach((image, i) => {
      list.push(<img src={image.node.display_url} style={{height:"100px", width:"100px"}} key={i} alt=""/>);
    });
    return list;
  }

  render() {
    if (this.state.loading) {
      return null;
    }
    if (this.state.error) {
      return <div><p>{this.state.error.toString()}</p></div>;
    }
    const mural = this.state.muralInfo;
    const instagramImages = this.getInstagramImages();
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
          <h3>Address: {mural.address}</h3>
          <h3>{mural.other}</h3>
          <img src={mural.image} alt={"Image of " + mural.name} className="muralImage"/>
        </div>
        {(instagramImages.length === 0) ? (
          <div>
            <h3>There are no recent images with the hashtag {mural.hashtag}:</h3>
          </div>
        ) : (
          <div>
            <h3>Here are the most recent images with the hashtag {mural.hashtag}:</h3>
            <div>{instagramImages}</div>
          </div>
        )}
      </div>
    );
  }
}

export default MuralDetail;
