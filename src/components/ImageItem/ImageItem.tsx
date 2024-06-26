import React, { useState } from 'react';
import cl from './ImageItem.module.scss';
import { Card, Modal, Button, Flex, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../store/hooks/useReduxHooks.ts';
import { deleteImage } from '../../store/slice/imageSlice.ts';

interface ImageItemProps {
  author: string;
  imageID: string;
  id: string;
}

export const ImageItem = ({ author, imageID, id }: ImageItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const showModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(deleteImage(id));
  };

  const { Meta } = Card;

  return (
    <div className={cl.imageItem}>
      <Card hoverable cover={<img alt='example' src={imageID} />}>
        <Meta title={author} description={id} />
        <Flex
          gap='middle'
          align='center'
          justify='space-between'
          style={{ paddingTop: '24px' }}
        >
          <Tooltip placement='bottom' title='Open preview'>
            <Button onClick={showModal} type='primary' value='default'>
              Preview
            </Button>
          </Tooltip>
          <Tooltip placement='bottom' title='Delete image'>
            <Button
              type='primary'
              value='default'
              icon={<DeleteOutlined />}
              onClick={handleDelete}
            />
          </Tooltip>
        </Flex>
      </Card>
      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        footer={[]}
        width={'40vw'}
        centered
      >
        <img className={cl.modalWindow} src={imageID} alt='' />
      </Modal>
    </div>
  );
};
