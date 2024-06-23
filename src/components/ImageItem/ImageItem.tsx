import React, { MouseEventHandler, useState } from 'react';
import cl from './ImageItem.module.scss';
import { Modal } from 'antd';

interface ImageItemProps {
  author: string;
  imageID: string;
}

export const ImageItem = ({ author, imageID }: ImageItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={cl.imageItem} onClick={showModal}>
      <img className={cl.imageItemIcon} src={imageID} alt='' />
      <p style={{ fontSize: '1rem' }}>{author}</p>
      <Modal open={isModalOpen} onCancel={closeModal} footer={[]} centered>
        <img className={cl.modalWindow} src={imageID} alt='' />
      </Modal>
    </div>
  );
};
