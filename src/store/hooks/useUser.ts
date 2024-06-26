import { auth } from '../../apiFirebase/firebase.ts';
import { onAuthStateChanged } from 'firebase/auth';
import { useCallback, useEffect } from 'react';
import { selectUser, setUnAuth, setUser } from '../slice/userSlice.ts';
import { useAppDispatch, useAppSelector } from './useReduxHooks.ts';

export const useUser = () => {
  const dispatch = useAppDispatch();
  const authData = useAppSelector(selectUser);

  const handleOnAuthChanged = useCallback(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user?.uid;
        const email = user?.email;
        dispatch(setUser({ uid, email }));
      } else {
        dispatch(setUnAuth());
      }
    });
  }, [dispatch]);

  useEffect(() => {
    handleOnAuthChanged();
  }, [handleOnAuthChanged]);

  const userId = authData.userData?.uid;
  const userEmail = authData.userData?.email;
  const isAuth = authData.isAuth;
  const isLoading = authData.pending;

  console.log(userEmail);

  return { userId, isAuth, isLoading, userEmail };
};
