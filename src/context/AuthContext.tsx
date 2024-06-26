import React, { useState, createContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, db } from '../apiFirebase/firebase.ts';
import { ref, set } from 'firebase/database';
import { Auth } from 'firebase/auth';
import { useAppDispatch } from '../store/hooks/useReduxHooks.ts';
import { setUserEmail } from '../store/slice/userSlice.ts';
import toast, { Toaster } from 'react-hot-toast';

interface IAuthContext {
  signIn: (auth: Auth, email: string, password: string) => void;
  signUp: (auth: Auth, email: string, password: string) => void;
  logOut: () => void;
}

interface IAuthContextProviderProps {
  children: ReactNode;
}

const authContextDefaults: IAuthContext = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  signIn: (auth: Auth, email: string, password: string) => null,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  signUp: (auth: Auth, email: string, password: string) => null,
  logOut: () => null,
};

export const AuthContext = createContext<IAuthContext>(authContextDefaults);

export const AuthContextProvider = ({
  children,
}: IAuthContextProviderProps) => {
  const dispatch = useAppDispatch();

  // const {user, loading} = useUser()
  //
  const navigate = useNavigate();

  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user) => {
      // console.log(user)
      if (user) {
        dispatch(setUserEmail(user.email));
      } else {
        dispatch(setUserEmail(null));
        navigate('/signin');
      }
      if (initializing) {
        setInitializing(false);
      }
    });
    return subscriber;
  }, [initializing, dispatch]);

  if (initializing) {
    return null;
  }

  // useEffect(() => {
  //   const subscriber = auth.onAuthStateChanged((user) => {
  //     dispatch(setUser(user))
  //   });
  //   return subscriber;
  // }, [dispatch]);
  //
  // useEffect(() => {
  //
  //
  //     if (!user) {
  //       navigate.replace('/login')
  //     }
  //   }
  //
  // , [
  //   user,navigate
  // ])
  //
  // if (loading) {
  //   return null;
  // }


  const signIn = async (auth: Auth, email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
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
    navigate('/signin');
  };

  return (
    <AuthContext.Provider value={{ signIn, signUp, logOut }}>
      <Toaster position='top-center' />
      {children}
    </AuthContext.Provider>
  );
};
