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
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
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
        setStatus('success');

        //console.log(data, '---res');
      } catch (error) {
        setStatus('error');
      } finally {
        setStatus('success');
      }
    }

    serachPictures();
  }, [query, page]);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        setShowModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleFormSubmit = query => {
    setQuery(query);
    setPictures([]);
    setPage(1);
    setStatus('loading');
  };

  const handleOnLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    setStatus('loading');
  };

  const handleModal = e => {
    let currentImageUrl = e.target.dataset.large;

    if (e.target.nodeName === 'IMG') {
      setLargeImageURL(currentImageUrl);
      toggleModal();
    }
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <>
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

        {pictures.length >= 12 && pictures.length < totalHits && (
          <Button onClick={handleOnLoadMore} />
        )}

        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={toggleModal} />
        )}

        {status === 'loading' && <Loader />}
        {status === 'error' && toast.error({ status })}

        <ToastContainer autoClose={3000} />
      </div>
    </>
  );
};

export default App;
