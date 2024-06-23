import { Navigate, Route, Routes } from 'react-router-dom';
import { SignInUpPage } from './pages/SignInUpPage/SignInUpPage.tsx';
import { RoutesDomains } from './routes/RoutesDomains.ts';
import { HomePage } from './pages/HomePage/HomePage.tsx';
import { PaintPage } from './pages/PaintPage/PaintPage.tsx';
import React from 'react';

function App() {
  return (
    <Routes>
      <Route path={RoutesDomains.SIGN_IN_MAIN} element={<SignInUpPage />} />
      <Route path={RoutesDomains.SIGN_IN} element={<SignInUpPage />} />
      <Route path={RoutesDomains.SIGN_UP} element={<SignInUpPage />} />
      <Route path={RoutesDomains.HOME} element={<HomePage />} />
      <Route path={RoutesDomains.PAINT} element={<PaintPage />} />
      <Route
        path={RoutesDomains.NOT_FOUND}
        element={<Navigate to={RoutesDomains.HOME} replace />}
      />
    </Routes>
  );
}

export default App;
