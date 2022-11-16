import PropTypes from 'prop-types';

const ImageGallery = props => {
  return <ul className="ImageGallery">{props.children}</ul>;
};

ImageGallery.protoType = {
  children: PropTypes.element,
};

export default ImageGallery;
