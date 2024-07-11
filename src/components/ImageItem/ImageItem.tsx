import React, { useState } from 'react';
import cl from './ImageItem.module.scss';
import { Card, Modal, Button, Flex, Tooltip, Input } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import {
  useAppDispatch,
  useAppSelector,
} from '../../store/hooks/useReduxHooks.ts';
import { deleteImage, updateImageName } from '../../store/slice/imageSlice.ts';
import { useNavigate } from 'react-router-dom';
import { ref, update } from 'firebase/database';
import { db } from '../../apiFirebase/firebase.ts';
import toast from 'react-hot-toast';

interface ImageItemProps {
  author: string;
  imageID: string;
  id: string;
  projectName: string;
}

export const ImageItem = ({
  author,
  imageID,
  id,
  projectName,
}: ImageItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userData } = useAppSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [newProjectName, setNewProjectName] = useState(projectName);

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

  const handleEditClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSaveClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    try {
      const projectRef = ref(db, `users/${userData!.uid}/images/${id}`);
      await update(projectRef, { projectName: newProjectName });
      dispatch(updateImageName({ id, projectName: newProjectName }));
      setIsEditing(false);
      toast.success('Project name successfully changed!');
    } catch (error) {
      toast.error('Name has not been changed! Something went wrong!');
    }
  };

  const { Meta } = Card;

  return (
    <div className={cl.imageItem}>
      <Card
        hoverable
        cover={<img alt='example' src={imageID} />}
        onClick={openCanvasWithImage}
      >
        {isEditing ? (
          <Input
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <Meta title={projectName} description={author} />
        )}
        <Flex
          gap='middle'
          align='center'
          justify='space-between'
          style={{ paddingTop: '24px' }}
        >
          {isEditing ? (
            <Tooltip placement='bottom' title='Save name'>
              <Button
                type='primary'
                icon={<SaveOutlined />}
                onClick={handleSaveClick}
              />
            </Tooltip>
          ) : (
            <>
              <Tooltip placement='bottom' title='Open preview'>
                <Button
                  onClick={showModal}
                  type='primary'
                  icon={<EyeOutlined />}
                  value='default'
                />
              </Tooltip>
              <Tooltip placement='bottom' title='Edit name'>
                <Button
                  type='primary'
                  icon={<EditOutlined />}
                  onClick={handleEditClick}
                />
              </Tooltip>
              <Tooltip placement='bottom' title='Delete image'>
                <Button
                  type='primary'
                  icon={<DeleteOutlined />}
                  onClick={handleDelete}
                />
              </Tooltip>
            </>
          )}
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
