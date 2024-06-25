import React, { MouseEventHandler, useState } from 'react';
import cl from './ImageItem.module.scss';
import { Card, Modal, Button, Flex, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

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

  const { Meta } = Card;

  return (
    <div className={cl.imageItem}>
      <Card hoverable cover={<img alt='example' src={imageID} />}>
        <Meta title={author} />
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
            <Button type='primary' value='default' icon={<DeleteOutlined />} />
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
