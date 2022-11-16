import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  render() {
    return (
      <div className="Overlay" onClick={this.props.onClose}>
        <div className="Modal">
          <img src={this.props.largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

Modal.protoType = {
  onClose: PropTypes.func,
  largeImageURL: PropTypes.string,
};
