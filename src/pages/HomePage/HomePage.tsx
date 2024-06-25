import { useAppSelector } from '../../store/hooks/useReduxHooks.ts';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onValue, ref as refDB } from '@firebase/database';
import { db } from '../../apiFirebase/firebase.ts';
import { Header } from '../../components/Header/Header.tsx';
import cl from './HomePage.module.scss';
import { ImageList } from '../../components/ImageList/ImageList.tsx';

export const HomePage = () => {
  const { email } = useAppSelector((state) => state.user);
  const [usersEmails, setUserEmail] = useState<string[]>([]);
  const [filter, setFilter] = useState<string | null>('');

  const fetchAllUsers = () => {
    onValue(refDB(db, `users/`), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const keys = Object.keys(data);
        const emails: string[] = keys.map((key) => {
          return data[key].email;
        });
        setUserEmail(emails);
      }
    });
  };

  useEffect(() => {
    fetchAllUsers();
    setFilter(email);
  }, []);

  return (
    <>
      <Header email={email} />
      <ImageList filter={filter} />
    </>
  );
};
