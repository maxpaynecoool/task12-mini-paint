import React, { useState } from 'react';
import cl from './ImageItem.module.scss';
import { Card, Modal, Button, Flex, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import {
  useAppDispatch,
  useAppSelector,
} from '../../store/hooks/useReduxHooks.ts';
import { deleteImage } from '../../store/slice/imageSlice.ts';
import { useNavigate } from 'react-router-dom';

interface ImageItemProps {
  author: string;
  imageID: string;
  id: string;
}

export const ImageItem = ({ author, imageID, id }: ImageItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userData } = useAppSelector((state) => state.user);

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
    dispatch(deleteImage({ userUid: userData!.uid, id }));
  };

  const openCanvasWithImage = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    navigate(`/paint/${id}`, { state: { imageID, author, id } });
  };

  const { Meta } = Card;

  return (
    <div className={cl.imageItem}>
      <Card
        hoverable
        cover={<img alt='example' src={imageID} />}
        onClick={openCanvasWithImage}
      >
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
