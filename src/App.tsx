import { Navigate, Route, Routes } from 'react-router-dom';
import { SignInUpPage } from './pages/SignInUpPage/SignInUpPage.tsx';
import { HomePage } from './pages/HomePage/HomePage.tsx';
import { PaintPage } from './pages/PaintPage/PaintPage.tsx';
import React from 'react';
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx';
import { useTheme } from './contexts/ThemeContext.tsx';
import './index.css';

function App() {
  enum RoutesDomains {
    SIGN_IN_MAIN = '/',
    SIGN_IN = '/signin',
    SIGN_UP = '/signup',
    HOME = '/home',
    PAINT = '/paint',
    PAINTID = '/paint/:id',
    ERROR = '/error',
    NOT_FOUND = '*',
  }

  const { theme } = useTheme();

  return (
    <div className={theme === 'dark' ? 'rootDark' : 'root'}>
      <Routes>
        <Route path={RoutesDomains.SIGN_IN_MAIN} element={<SignInUpPage />} />
        <Route path={RoutesDomains.SIGN_IN} element={<SignInUpPage />} />
        <Route path={RoutesDomains.SIGN_UP} element={<SignInUpPage />} />
        <Route path={RoutesDomains.HOME} element={<HomePage />} />
        <Route path={RoutesDomains.PAINT} element={<PaintPage />} />
        <Route path={RoutesDomains.PAINTID} element={<PaintPage />} />
        <Route path={RoutesDomains.ERROR} element={<ErrorPage />} />
        <Route
          path={RoutesDomains.NOT_FOUND}
          element={<Navigate to={RoutesDomains.HOME} replace />}
        />
      </Routes>
    </div>

  );
}

export default App;
