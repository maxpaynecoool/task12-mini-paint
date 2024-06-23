import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RoutesDomains } from '../../routes/RoutesDomains.ts';
import cl from './Header.module.scss';
import { AuthContext } from '../../context/AuthContext.tsx';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

type THeaderProps = {
  email: string | null;
};

export const Header = ({ email }: THeaderProps) => {
  const { logOut } = useContext(AuthContext);

  return (
    <header className={cl.headerContainer}>
      <div className={cl.home}>
        <Link to={RoutesDomains.HOME}>
          <img src='/vite.svg' width={30} alt='Home' />
        </Link>
        <Link to={RoutesDomains.HOME}>Gallery</Link>
      </div>
      <div className={cl.right}>
        <Link to={RoutesDomains.PAINT}>Painter</Link>
        <p>
          Welcome <strong className={cl.user}>{email}</strong>
        </p>
        <button
          style={{ backgroundColor: 'rgba(2,185,185,0)' }}
          onClick={logOut}
        >
          <ExitToAppIcon fontSize={'large'} />
        </button>
      </div>
    </header>
  );
};
