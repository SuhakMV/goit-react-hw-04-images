import PropTypes from 'prop-types';

const ImageGalleryItem = props => {
  return (
    <li className="ImageGalleryItem" onClick={props.openModal}>
      <img
        className="ImageGalleryItem-image"
        src={props.webformatURL}
        alt={props.id}
        data-large={props.largeImage}
      />
    </li>
  );
};

ImageGalleryItem.protoType = {
  webformatURL: PropTypes.string,
  id: PropTypes.number,
  largeImage: PropTypes.string,
  openModal: PropTypes.func,
};

export default ImageGalleryItem;
