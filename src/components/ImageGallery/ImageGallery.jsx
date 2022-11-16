import { Component } from 'react';

export default class ImageGallery extends Component {
  render() {
    return <ul className="ImageGallery">{this.props.children}</ul>;
  }
}