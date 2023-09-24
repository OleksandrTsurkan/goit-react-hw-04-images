import { useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { toast } from 'react-toastify';
import searchPhoto from 'API/API';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';

import React from 'react';

export const App = () => {
  const [isloading, setIsloading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [photoName, setPhotoName] = useState('');
  const [page, setPage] = useState(1);
  const [btnLoadMore, setBtnLoadMore] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    if (!photoName) {
      return;
    }
    setIsloading(true);
    searchPhoto(photoName, page)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        if (data.totalHits === 0) {
          toast.warning(
            'Вибачте, немає зображень, які відповідають вашому пошуковому запиту. Будь ласка спробуйте ще раз.'
          );
          return;
        }
        const totalPage = Math.ceil(data.totalHits / 12);

        if (totalPage > page) {
          setBtnLoadMore(true);
        } else {
          toast.info('Вибачте, але ви досягли кінця результатів пошуку.');
          setBtnLoadMore(false);
        }
        const arrPhotos = data.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );

        setPhotos(prevPhotos => [...prevPhotos, ...arrPhotos]);
      })
      .catch(error => {
        console.log(error);
        return toast.error('Щось пішло не так. Будь-ласка спробуйте пізніше.');
      })
      .finally(() => {
        setIsloading(false);
      });
  }, [photoName, page, setBtnLoadMore, setIsloading, setPhotos]);

  const onSubmitForm = value => {
    if (value === photoName) {
      toast.info('Будь ласка, введіть новий запит!');
      return;
    }
    setPhotoName(value);
    setPage(1);
    setPhotos([]);
    setBtnLoadMore(false);
  };

  const onClickRender = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = (selectedPhoto = null) => {
    setSelectedPhoto(selectedPhoto);
  };

  return (
    <div>
      <Searchbar onSubmit={onSubmitForm} />
      {isloading && <Loader />}
      <ImageGallery photos={photos} onClickImageItem={toggleModal} />
      {photos.length !== 0 && btnLoadMore && isloading && (
        <Button onClickRender={onClickRender} />
      )}
      {selectedPhoto && (
        <Modal selectedPhoto={selectedPhoto} onClose={toggleModal} />
      )}
      {/* <ToastContainer autoClose={3000} /> */}
    </div>
  );
};
