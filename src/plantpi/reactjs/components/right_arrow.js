import React, { Component } from 'react';

const RightArrow = (props) => {
  return (
    <div onClick={props.nextSlide} className="nextArrow">
      <i className="fa fa-arrow-right fa-2x slider-right-arrow" aria-hidden="true"></i>
    </div>
  );
}

export default RightArrow;