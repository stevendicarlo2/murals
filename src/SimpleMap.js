import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';
import MuralLabel from "./MuralLabel.js";
import history from "./history";

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    const muralList = this.newMuralList(null);
    const bounds = this.findMapBounds();
    this.state = {
      muralList: muralList,
      mapBounds: bounds,
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

  findMapBounds() {
    if (this.props.murals.length === 0) {
      return {
        center: {lat: 38.89, lng: -77.01},
        zoom: 15
      };
    }
    const firstMural = this.props.murals[0];
    if (this.props.murals.length === 1) {
      const center = { lat: firstMural.lat, lng: firstMural.lng };
      const zoom = 16;
      return {center: center, zoom: zoom};
    }
    const size = {width: window.innerWidth-40, height: window.innerHeight-300};
    let north = firstMural.lat;
    let south = firstMural.lat;
    let east = firstMural.lng;
    let west = firstMural.lng;
    this.props.murals.forEach(mural => {
      if (mural.lat > north)
        north = mural.lat;
      if (mural.lat < south)
        south = mural.lat;
      if (mural.lng > east)
        east = mural.lng;
      if (mural.lng < west)
        west = mural.lng;
    });
    const bounds = {
      nw: { lat: north, lng: west },
      se: { lat: south, lng: east }
    };

    const { center, zoom } = fitBounds(bounds, size);
    return {center: center, zoom: zoom};
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
          defaultCenter={this.state.mapBounds.center}
          defaultZoom={this.state.mapBounds.zoom}
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
