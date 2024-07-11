import React, { useEffect, useState } from 'react';
import cl from './ImageList.module.scss';
import { ImageItem } from '../ImageItem/ImageItem.tsx';
import {
  useAppDispatch,
  useAppSelector,
} from '../../store/hooks/useReduxHooks.ts';
import { fetchImages } from '../../store/slice/imageSlice.ts';
import { Loader } from '../Loader/Loader.tsx';

export const ImageList = () => {
  const { images, loading, loaded } = useAppSelector((state) => state.images);
  const dispatch = useAppDispatch();

  const { userData } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!loaded) {
      // @ts-ignore
      dispatch(fetchImages(userData!.uid));
    }
  }, [dispatch, fetchImages]);

  return (
    <div className={cl.imageListContainer}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {images.length === 0 ? (
            <p style={{ fontSize: '1.5rem' }}>
              No projects available! Create your first one :)
            </p>
          ) : (
            images.map((item) => (
              <ImageItem
                key={item.id}
                imageID={item.imagesrc}
                author={item.email}
                id={item.id}
                projectName={item.projectName}
              />
            ))
          )}
        </>
      )}
    </div>
  );
};
