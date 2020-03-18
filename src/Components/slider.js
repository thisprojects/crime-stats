import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Slider extends Component {
  sliderRef = React.createRef();

  toggleSlider = () => {
    this.sliderRef.current.classList.toggle(this.props.hide);
  };

  componentDidUpdate () {
    if (this.props.manualToggle === false) {
      this.sliderRef.current.classList.remove(this.props.hide)
    } else if (this.props.manualToggle === true) {
      this.sliderRef.current.classList.add(this.props.hide)
    }
  }

  render() {
    const {
      slide,
      hide,
      children,
      label,
      icon,
      stubClassName
    } = this.props;

    return (
      <div className={ `${slide} ${hide}` } ref={ this.sliderRef }>
        <div className={ `${stubClassName}` } onClick={ this.toggleSlider }>
          { icon && <FontAwesomeIcon icon={ icon } /> }
          <p>{ label }</p>
        </div>
        { children }
      </div>
    );
  }
}

export default Slider;
