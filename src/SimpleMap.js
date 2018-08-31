import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MuralLabel from "./MuralLabel.js";

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
        text={mural.text}
        key={i}
      />;
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
        >
          {this.createLabelList()}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
