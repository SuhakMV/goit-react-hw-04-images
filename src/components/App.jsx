import { fetchGallery } from 'api/galleryApi';
import { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

import Searchbar from './Searchbar/Searchbar';
import './styles.css';

export default class App extends Component {
  state = {
    pictures: [],
    query: '',
    page: 1,
    totalHits: null,
    isLoading: false,
    error: null,
    showModal: false,
    largeImageURL: null,
  };

  async serachPictures() {
    const { pictures, query, page } = this.state;
    try {
      const { data } = await fetchGallery(query, page);
      if (!data.totalHits) {
        toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      this.setState({
        pictures: [...pictures, ...data.hits],
        totalHits: data.totalHits,
        isLoading: false,
        error: null,
        showButton: true,
      });
      //console.log(data, '---res');
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (query !== prevState.query) {
      this.setState({ isLoading: true });
      this.serachPictures();
    }

    if (query === prevState.query && page !== prevState.page) {
      this.setState({ isLoading: true });
      this.serachPictures();
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleFormSubmit = query => {
    this.setState({ query, pictures: [], page: 1 });
    this.isLoading = true;
  };

  handleOnLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
    this.isLoading = true;
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleModal = e => {
    let currentImageUrl = e.target.dataset.large;

    if (e.target.nodeName === 'IMG') {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
        largeImageURL: currentImageUrl,
      }));
    }
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.setState({ showModal: false });
    }
  };

  render() {
    const { pictures, isLoading, totalHits, showModal, largeImageURL } =
      this.state;
    const openModal = this.handleModal;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery>
          {pictures.map(({ webformatURL, id, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              id={id}
              webformatURL={webformatURL}
              largeImage={largeImageURL}
              openModal={openModal}
            />
          ))}
        </ImageGallery>
        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.toggleModal} />
        )}

        {pictures.length >= 12 && pictures.length < totalHits && (
          <Button onClick={this.handleOnLoadMore} />
        )}

        {isLoading && <Loader />}

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
