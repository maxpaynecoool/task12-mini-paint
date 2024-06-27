import React, { useEffect, useState } from 'react';
import cl from './ImageList.module.scss';
import { ImageItem } from '../ImageItem/ImageItem.tsx';
import {
  useAppDispatch,
  useAppSelector,
} from '../../store/hooks/useReduxHooks.ts';
import { Loader } from '../ui/Loader.tsx';
import { fetchImages } from '../../store/slice/imageSlice.ts';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '../../store/hooks/useUser.ts';

interface ImageListProps {
  email: string | null;
}

export const ImageList = ({ email }: ImageListProps) => {
  const { images, loading, loaded } = useAppSelector((state) => state.images);
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<string | null>('');


  useEffect(() => {
    if (!loaded) {
      dispatch(fetchImages());
    }
    setFilter(email);
  }, [dispatch]);

  const filteredImages = images?.filter((item) => filter === item.email) || [];

  return (
    <div className={cl.imageListContainer}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {filteredImages.length === 0 ? (
            <p style={{ fontSize: '1.5rem' }}>
              No projects available! Create your first one :)
            </p>
          ) : (
            filteredImages.map((item) => (
              <ImageItem
                key={item.id}
                imageID={item.imagesrc}
                author={item.email}
                id={item.id}
              />
            ))
          )}
        </>
      )}
    </div>
  );
};
