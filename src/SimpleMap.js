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
  constructor(props) {
    super(props);
    this.state = {
      hoverKey: null,
    }
    this.updateMuralList();
  }
  updateMuralList() {
    const muralList = this.props.murals.map(mural => {
      mural.hover = (mural.id == this.state.hoverKey);
      return mural;
    });
    this.state = {
      muralList: muralList,
    }
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
    this.setState({
      hoverKey: key,
    })
  }

  onChildMouseLeave = (key, childProps) => {
    this.setState({
      hoverKey: null,
    })
  }

  render() {
    this.updateMuralList();
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
