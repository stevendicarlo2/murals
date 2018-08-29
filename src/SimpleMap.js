import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MuralLabel from "./MuralLabel.js";
import muralList from "./muralList.json";

class SimpleMap extends React.Component {
  static defaultProps = {
    center: {
      lat: 38.89,
      lng: -77.01
    },
    zoom: 15
  };
  createLabelList = () => {
    return muralList.list.map(function(object, i){
      return <MuralLabel
        lat={object.lat}
        lng={object.lng}
        text={object.text}
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
