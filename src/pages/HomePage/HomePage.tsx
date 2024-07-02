import { useAppSelector } from '../../store/hooks/useReduxHooks.ts';
import React from 'react';
import { Header } from '../../components/Header/Header.tsx';
import { ImageList } from '../../components/ImageList/ImageList.tsx';

export const HomePage = () => {
  const { userData } = useAppSelector((state) => state.user);

  return (
    <>
      <Header email={userData!.email} />
      <ImageList />
    </>
  );
};
