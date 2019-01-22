import React, { Component } from 'react';
import Header from "./Header";
import SimpleMap from "./SimpleMap";
import axios from "axios";

class MuralDetail extends Component {
  constructor(props) {
    super(props);
    this.loadInfo();
    this.state = {
      loading: true,
    };
  }
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  loadInfo() {
    const muralURL = 'https://muralproject-483dd.firebaseio.com/murals/' + this.props.match.params.id + '.json';
    let muralInfo = {};
    // For testing the loading animations:
    // this.sleep(4000)
    // .then(() => {
    //   return axios.get(muralURL);
    // })
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
      muralInfo.id = this.props.match.params.id;
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
      list.push(<div className="col-4" key={i}><img src={image.node.display_url} className="instagramImage" alt=""/></div>);
    });
    return list;
  }

  render() {
    if (this.state.loading) {
      return <div><Header animate={true}/></div>;
    }
    if (this.state.error) {
      return <div><p>{this.state.error.toString()}</p></div>;
    }
    const mural = this.state.muralInfo;
    const instagramImages = this.getInstagramImages();
    return (
      <div>
        <Header menuButton={true}/>
        <div className="body">
          <div>
            <h1 id="muralDetailTitle">{mural.name} Mural</h1>
            <br/>
            <h3 className="muralDetail"><b>Artist: </b><a href={"/artist/"+mural.artist.id}>{mural.artist.name}</a></h3>
            <img src={mural.image} alt={"Image of " + mural.name} className="muralImage"/>
            <br/>
            <br/>
            <h3 className="muralDetail"><b>About: </b><span className="notBold">{mural.description}</span></h3>
            <h3 className="muralDetail"><b>Address: </b><span className="notBold">{mural.address}</span></h3>
            <h3 className="notBold">{mural.other}</h3>
            <div id="mapBox">
              <SimpleMap
                murals={[this.state.muralInfo]}
              />
            </div>
            <br/>
            {(instagramImages.length === 0) ? (
              <div>
                <h3 className="muralDetail">There are no recent Instagram posts with the hashtag {mural.hashtag}:</h3>
              </div>
            ) : (
              <div>
                <h3 className="muralDetail">Here are the most recent Instagram posts with the hashtag {mural.hashtag}:</h3>
                <div className="instagramSet row">{instagramImages}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default MuralDetail;
