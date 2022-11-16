import { fetchGallery } from 'api/galleryApi';
import { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

import Searchbar from './Searchbar/Searchbar';
import './styles.css';

const App = () => {
  const [pictures, setPictures] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState(null);

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function serachPictures() {
      try {
        const { data } = await fetchGallery(query, page);
        if (!data.totalHits) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        setPictures(prevPictures => [...prevPictures, ...data.hits]);
        setTotalHits(data.totalHits);
        setIsLoading(false);
        setError(null);

        console.log(data, '---res');
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    serachPictures();

    window.addEventListener('keydown', handleKeyDown);

    window.removeEventListener('keydown', handleKeyDown);
  }, [query, page]);

  const handleFormSubmit = query => {
    setQuery(query);
    setPictures([]);
    setPage(1);
    setIsLoading(true);
  };

  const handleOnLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    setIsLoading(true);
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const handleModal = e => {
    let currentImageUrl = e.target.dataset.large;
    console.log(currentImageUrl);
    console.log(e.target.nodeName);

    if (e.target.nodeName === 'IMG') {
      setLargeImageURL(currentImageUrl);
      toggleModal();
    }
  };

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      setShowModal(false);
    }
  };

  /*const { pictures, isLoading, totalHits, showModal, largeImageURL } =
      this.state;
    const openModal = this.handleModal;*/
  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery>
        {pictures.map(({ webformatURL, id, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            id={id}
            webformatURL={webformatURL}
            largeImage={largeImageURL}
            openModal={handleModal}
          />
        ))}
      </ImageGallery>
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={toggleModal()} />
      )}

      {pictures.length >= 12 && pictures.length < totalHits && (
        <Button onClick={handleOnLoadMore} />
      )}

      {isLoading && <Loader />}

      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default App;
