import React, { useState, createContext, useEffect, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, db } from '../apiFirebase/firebase.ts';
import { ref, set } from 'firebase/database';
import { Auth } from 'firebase/auth';
import { useAppDispatch } from '../store/hooks/useReduxHooks.ts';
import { setUnAuth, setUser } from '../store/slice/userSlice.ts';
import toast, { Toaster } from 'react-hot-toast';
import { useUser } from '../store/hooks/useUser.ts';
import { clearImages } from '../store/slice/imageSlice.ts';

interface IAuthContext {
  signIn: (auth: Auth, email: string, password: string) => void;
  signUp: (auth: Auth, email: string, password: string) => void;
  logOut: () => void;
}

interface IAuthContextProviderProps {
  children: ReactNode;
}

const authContextDefaults: IAuthContext = {
  //@ts-ignore
  signIn: (auth: Auth, email: string, password: string) => null,
  //@ts-ignore
  signUp: (auth: Auth, email: string, password: string) => null,
  logOut: () => null,
};

export const AuthContext = createContext<IAuthContext>(authContextDefaults);

export const AuthContextProvider = ({
  children,
}: IAuthContextProviderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isAuth, isLoading } = useUser();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setInitializing(false);
      if (!isAuth && pathname !== '/signup') {
        navigate('/signin');
      }
    }
  }, [isLoading, isAuth, navigate]);

  const signIn = async (auth: Auth, email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      dispatch(
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        }),
      );
      toast.success(`${userCredential.user.email}, welcome!`);
      navigate('/home');
    } catch {
      toast.error('Check your login and password');
      navigate('/signin');
    }
  };

  const signUp = async (auth: Auth, email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      dispatch(
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        }),
      );
      toast.success(`${userCredential.user.email}, welcome!`);
      set(ref(db, `users/${userCredential.user.uid}/`), {
        email: userCredential.user.email,
      });
      navigate('/home');
    } catch {
      toast.error('Retry, something wrong..');
      navigate('/signup');
    }
  };

  const logOut = () => {
    signOut(auth);
    dispatch(setUnAuth());
    dispatch(clearImages())
    navigate('/signin');
  };

  if (initializing) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ signIn, signUp, logOut }}>
      <Toaster position='top-center' />
      {children}
    </AuthContext.Provider>
  );
};
