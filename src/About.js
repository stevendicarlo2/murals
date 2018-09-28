import React, { Component } from 'react';
import Header from "./Header";

class About extends Component {

  render() {
    return (
      <div>
        <Header menuButton={true}/>
        <p>This is a web-based app that enables people to find murals in DC in just a click.<br/>
        Ever wondered where is that cool mural located? This web-app makes it easier for people to find the location of those hidden gems. And there is no need to download any app.<br/>
        Artists can be added to the app so their murals are easily found. We create a simple profile page for each artist, and add a link to their Instagrams hashtags’ page.<br/>
        We encourage people to use the artists’s hashtags so the artists themselves can see the cool pictures on Instagram.</p>
      </div>
    );
  }
}

export default About;
