import _ from 'lodash';
import React, { Component } from 'react';
import ProgressBar from 'progressbar.js';

class PercentCircle extends Component {
	componentDidMount(props) {
		for (var i = 0; i < this.props.curData.length; i++) {
			var value = this.props.curData[i];
			var container = ".percentage" + [i];
			if (value == true) {
			    var bar = new ProgressBar.Circle(container, {
				  color: '#aaa',
				  // This has to be the same size as the maximum width to
				  // prevent clipping
				  strokeWidth: 4,
				  trailWidth: 1,
				  easing: 'easeInOut',
				  duration: 1400,
				  text: {
				  	value: 'Soil Wet',
				    autoStyleContainer: true,
				  },
				  from: { color: '#FF4500', width: 1 },
				  to: { color: '#228B22', width: 4 },
				  // Set default step function for all animate calls
				  step: function(state, circle) {
				    circle.path.setAttribute('stroke', state.color);
				    circle.path.setAttribute('stroke-width', state.width);
				  }
				});
			 } else {
			 	var bar = new ProgressBar.Circle(container, {
				  color: '#aaa',
				  // This has to be the same size as the maximum width to
				  // prevent clipping
				  strokeWidth: 4,
				  trailWidth: 1,
				  easing: 'easeInOut',
				  duration: 1400,
				  text: {
				  	value: 'Soil Dry',
				    autoStyleContainer: true,
				  },
				  from: { color: '#228B22', width: 1 },
				  to: { color: '#FF4500', width: 4 },
				  // Set default step function for all animate calls
				  step: function(state, circle) {
				    circle.path.setAttribute('stroke', state.color);
				    circle.path.setAttribute('stroke-width', state.width);
				  }
				});
			 }
			bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
			bar.text.style.fontSize = '3.8rem';
			bar.animate(.9);  // Number from 0.0 to 1.0
		}
	}

	render() {
		return (
			<div className="flexFix">
				<h3 className="plant-name">Peppermint</h3>
				<div className="percentContainer"> 
					<div className="percentage0" />
				</div>
				<h3 className="plant-name">Thyme</h3>
				<div className="percentContainer">
					<div className="percentage1" />
				</div>
			</div>
			);
	}

}

export default PercentCircle;