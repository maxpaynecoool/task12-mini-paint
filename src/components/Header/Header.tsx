import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RoutesDomains } from '../../routes/RoutesDomains.ts';
import cl from './Header.module.scss';
import { AuthContext } from '../../contexts/AuthContext.tsx';
import { LogoutOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import ColorLensIcon from '@mui/icons-material/ColorLens';

type THeaderProps = {
  email: string | null;
};

export const Header = ({ email }: THeaderProps) => {
  const { logOut } = useContext(AuthContext);

  return (
    <header className={cl.headerContainer}>
      <div className={cl.home}>
        <Tooltip placement='top' title='Home'>
          <Link to={RoutesDomains.HOME}>
            <Button
              type='text'
              shape='circle'
              icon={<ColorLensIcon fontSize={'large'} />}
            />
          </Link>
        </Tooltip>
      </div>
      <div className={cl.right}>
        <Link to={RoutesDomains.PAINT}>
          <Tooltip placement='top' title='Create new'>
            <Button
              type='text'
              shape='circle'
              icon={<PlusOutlined style={{ fontSize: '1.5rem' }} />}
            />
          </Tooltip>
        </Link>
        <p>
          Welcome <strong className={cl.user}>{email}</strong>
        </p>
        <Tooltip placement='top' title='Log out'>
          <Button
            type='text'
            shape='circle'
            onClick={logOut}
            icon={<LogoutOutlined style={{ fontSize: '1.5rem' }} />}
          ></Button>
        </Tooltip>
      </div>
    </header>
  );
};
