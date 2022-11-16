import PropTypes from 'prop-types';

export const Modal = ({ onClose, fullImageURL }) => {
  return (
    <div className="Overlay" onClick={onClose}>
      <div className="Modal">
        <img src={fullImageURL} alt="" />
      </div>
    </div>
  );
};

Modal.protoType = {
  onClose: PropTypes.func,
  largeImageURL: PropTypes.string,
};

export default Modal;
