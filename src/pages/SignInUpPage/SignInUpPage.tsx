import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.tsx';
import { auth } from '../../apiFirebase/firebase.ts';
import cl from './SignInUpPage.module.scss';

export const SignInUpPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  const { signIn, signUp } = useContext(AuthContext);
  const { pathname } = useLocation();

  const signInForm = (e: FormEvent) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setHasError(true);
      return;
    }
    signIn(auth, email, password);
  };

  const signUpForm = (e: FormEvent) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setHasError(true);
      return;
    }
    signUp(auth, email, password);
  };

  const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (hasError) setHasError(false);
  };

  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (hasError) setHasError(false);
  };

  const signHandler = (e: FormEvent) => {
    if (pathname === '/signin') {
      return signInForm(e);
    } else {
      return signUpForm(e);
    }
  };

  return (
    <div className={cl.formContainer}>
      <div>
        {pathname === '/signin' ? (
          <>
            <h1 className={cl.formHeader}>Sign in to your account</h1>
            <p>
              Do not have an account yet?{' '}
              <Link to='/signup' className='underline '>
                Sign up
              </Link>
            </p>
          </>
        ) : (
          <>
            <h1 className={cl.formHeader}>Sign up</h1>
            <p>
              Already have an account?{' '}
              <Link to='/signin' className='underline'>
                Sign in
              </Link>
            </p>
          </>
        )}
      </div>
      <form onSubmit={signHandler}>
        <div className={cl.formItem}>
          <label>Email</label>
          <input
            className={`${cl.formInput} ${
              hasError && email === '' ? cl.errorInput : ''
            }`}
            type='email'
            value={email}
            onChange={emailHandler}
          />
        </div>
        <div className={cl.formItem}>
          <label>Password</label>
          <input
            className={`${cl.formInput} ${
              hasError && password === '' ? cl.errorInput : ''
            }`}
            type='password'
            value={password}
            autoComplete='on'
            onChange={passwordHandler}
          />
        </div>
        <button className={cl.formButton}>
          {' '}
          {pathname === '/signin' ? <p>Sign in</p> : <p>Create account</p>}{' '}
        </button>
      </form>
    </div>
  );
};
