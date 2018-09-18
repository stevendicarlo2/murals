import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MuralLabel from "./MuralLabel.js";
import history from "./history";

class SimpleMap extends React.Component {
  static defaultProps = {
    center: {
      lat: 38.89,
      lng: -77.01
    },
    zoom: 15
  };
  createLabelList() {
    return this.props.murals.map((mural, i) => {
      return <MuralLabel
        lat={mural.lat}
        lng={mural.lng}
        mural={mural}
        key={mural.id}
      />;
    });
  }

  onChildClick(key, childProps) {
    history.push("/detail/" + childProps.mural.id);
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
        >
          {this.createLabelList()}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
