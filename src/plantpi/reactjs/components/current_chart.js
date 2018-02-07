import _ from 'lodash';
import React, { Component } from 'react';
import ProgressBar from 'progressbar.js';

class PercentCircle extends Component {
	componentDidMount(props) {
		for (var i = 0; i < this.props.curData.length; i++) {
			console.log(this.props.curData[i]);
			var value = _.round(this.props.curData[i]);
			var container = ".percentage" + [i];
		    var bar = new ProgressBar.Circle(container, {
			  color: '#aaa',
			  // This has to be the same size as the maximum width to
			  // prevent clipping
			  strokeWidth: 4,
			  trailWidth: 1,
			  easing: 'easeInOut',
			  duration: 1400,
			  text: {
			  	value: value + " %",
			    autoStyleContainer: false,
			  },
			  from: { color: '#FF4500', width: 1 },
			  to: { color: '#228B22', width: 4 },
			  // Set default step function for all animate calls
			  step: function(state, circle) {
			    circle.path.setAttribute('stroke', state.color);
			    circle.path.setAttribute('stroke-width', state.width);
			  }
			});
			bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
			bar.text.style.fontSize = '4rem';

			bar.animate(value / 100);  // Number from 0.0 to 1.0
		}
	}

	render() {
		return (
			<div className="flexFix">
				<strong><h5>Peppermint</h5></strong>
				<div className="percentContainer"> 
					<div className="percentage0" />
				</div>
				<strong><h5>Thyme</h5></strong>
				<div className="percentContainer">
					<div className="percentage1" />
				</div>
			</div>
			);
	}

}

export default PercentCircle;