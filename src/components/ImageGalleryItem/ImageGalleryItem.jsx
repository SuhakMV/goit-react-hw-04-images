import { Component } from 'react';
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {
  render() {
    return (
      <li className="ImageGalleryItem" onClick={this.props.openModal}>
        <img
          className="ImageGalleryItem-image"
          src={this.props.webformatURL}
          alt={this.props.id}
          data-large={this.props.largeImage}
        />
      </li>
    );
  }
}

ImageGalleryItem.protoType = {
  webformatURL: PropTypes.string,
  id: PropTypes.number,
  largeImage: PropTypes.string,
  openModal: PropTypes.func,
};
