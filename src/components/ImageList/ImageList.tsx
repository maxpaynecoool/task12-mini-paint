import React, { useContext, useEffect, useLayoutEffect } from 'react';
import cl from './ImageList.module.scss';
import { ImageItem } from '../ImageItem/ImageItem.tsx';
import {
  useAppDispatch,
  useAppSelector,
} from '../../store/hooks/useReduxHooks.ts';
import { Loader } from '../ui/Loader.tsx';
import { fetchImages } from '../../store/slice/imageSlice.ts';
import { v4 as uuidv4 } from 'uuid';

interface ImageListProps {
  filter: string | null;
}

export const ImageList = ({ filter }: ImageListProps) => {
  const { images, loading } = useAppSelector((state) => state.images);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <div className={cl.imageListContainer}>
      {images &&
        (filter
          ? images.map(
              (item) =>
                filter === item.email && (
                  <ImageItem
                    key={uuidv4()}
                    imageID={item.imagesrc}
                    author={item.email}
                    id={item.id}
                  />
                ),
            )
          : images.map((item) => (
              <ImageItem
                key={uuidv4()}
                imageID={item.imagesrc}
                author={item.email}
                id={item.id}
              />
            )))}
    </div>
  );
};
