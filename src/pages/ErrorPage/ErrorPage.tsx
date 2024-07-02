// src/pages/ErrorPage/ErrorPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import cl from './ErrorPage.module.scss';
import { useAppSelector } from '../../store/hooks/useReduxHooks.ts';
import { Header } from '../../components/Header/Header.tsx';

const ErrorPage = () => {
  const { userData } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  const goHome = () => {
    navigate('/home');
  };

  return (
    <>
      <Header email={userData!.email} />
      <div className={cl.errorContainer}>
        <p>Non-existent ID!</p>
        <Button type='primary' onClick={goHome}>
          Go Home
        </Button>
      </div>
    </>
  );
};

export default ErrorPage;
