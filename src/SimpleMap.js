import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MuralLabel from "./MuralLabel.js";
import history from "./history";

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 38.89,
      lng: -77.01
    },
    zoom: 15
  };
  constructor(props) {
    super(props);
    const muralList = this.newMuralList(null);
    this.state = {
      muralList: muralList,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.murals.length === this.props.murals.length) {
      return;
    }
    const muralList = this.newMuralList(null);
    this.setState({
      muralList: muralList,
    });
  }

  newMuralList(hoverKey) {
    const muralList = this.props.murals.map(mural => {
      mural.hover = (mural.id === hoverKey);
      return mural;
    });
    return muralList;
  }
  createLabelList() {
    return this.state.muralList.map((mural, i) => {
      return <MuralLabel
        lat={mural.lat}
        lng={mural.lng}
        mural={mural}
        hover={mural.hover}
        key={mural.id}
      />;
    });
  }

  onChildClick(key, childProps) {
    history.push("/detail/" + childProps.mural.id);
  }

  onChildMouseEnter = (key, childProps) => {
    const hoverKey = parseInt(key, 10);
    const muralList = this.newMuralList(hoverKey);
    this.setState({
      muralList: muralList,
    });
  }

  onChildMouseLeave = (key, childProps) => {
    const muralList = this.newMuralList(null);
    this.setState({
      muralList: muralList,
    });
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div id="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDZyKqgqERLhKTwGTPjzLvQqi7lTFMBLN0" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onChildClick={this.onChildClick}
          onChildMouseEnter={this.onChildMouseEnter}
          onChildMouseLeave={this.onChildMouseLeave}
        >
          {this.createLabelList()}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
