import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'
import axios from 'axios'
import Particles from 'react-particles-js';
import Swipeable from 'react-swipeable';

import LoginForm from '../containers/login_form';
import SearchBar from '../containers/search_bar';
import WeatherList from '../containers/weather_list';
import Graphs from '../containers/moisture_graphs';
import Controls from '../containers/watering_control';
import RightArrow from './right_arrow';
import LeftArrow from './left_arrow';
import particlesJSON_skrong from '../../../../particlesjs-config1.json';
import particlesJSON_weak from '../../../../particlesjs-config2.json';
//import Dots from './dots';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    	slideCount: 0
    }

    this.nextSlide = this.nextSlide.bind(this);
    this.previousSlide = this.previousSlide.bind(this);
  }

  nextSlide() {
    if (this.state.slideCount < 2) {
      this.setState({ slideCount: this.state.slideCount + 1 });
    } else {
      this.setState({ slideCount: 0});
    }
  }

  previousSlide() {
    if (this.state.slideCount > 0) {
      this.setState({ slideCount: this.state.slideCount - 1 });
    } else {
      this.setState({ slideCount: 2});
    }
  }

  render() {
    if (window.screen.width < 1080) {
      var particlesJSON = particlesJSON_weak;
    } else {
      var particlesJSON = particlesJSON_skrong;
    }

    return (
      /*  <Swipeable onSwipedLeft={this.nextSlide} onSwipedRight={this.previousSlide} className="swipeDiv" >
    	    { this.state.slideCount === 0 ? <div id="weatherPanel"><SearchBar /><WeatherList /></div> : null }
      	  { this.state.slideCount === 1 ? <Controls /> : null }
      	  { this.state.slideCount === 2 ? <Graphs /> : null }
      	  <RightArrow nextSlide={this.nextSlide} />
          <LeftArrow previousSlide={this.previousSlide} />
          <Particles params={particlesJSON} className="particles"/>
        </Swipeable> */
        <Swipeable className="swipeDiv" >
          <LoginForm />
          
        </Swipeable>
    );
  }
}