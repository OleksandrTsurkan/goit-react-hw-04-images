import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Modaldiv, Overlay } from './Modal.styled';
import React from 'react';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ selectedPhoto: { src, alt }, onClose }) => {
  useEffect(() => {
    const handleKeyDawn = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', this.handleKeyDawn);
    return () => {
      window.removeEventListener('keydown', handleKeyDawn);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <Modaldiv>
        <img src={src} alt={alt} />
      </Modaldiv>
    </Overlay>,
    modalRoot
  );
};
