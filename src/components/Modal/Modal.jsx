import PropTypes from 'prop-types';

const Modal = props => {
  return (
    <div className="Overlay" onClick={props.onClose}>
      <div className="Modal">
        <img src={props.largeImageURL} alt="" />
      </div>
    </div>
  );
};

Modal.protoType = {
  onClose: PropTypes.func,
  fullImageURL: PropTypes.string,
};

export default Modal;
