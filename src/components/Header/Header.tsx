import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RoutesDomains } from '../../routes/RoutesDomains.ts';
import cl from './Header.module.scss';
import { AuthContext } from '../../contexts/AuthContext.tsx';
import { LogoutOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { useTheme } from '../../contexts/ThemeContext.tsx';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

type THeaderProps = {
  email: string | null;
};

export const Header = ({ email }: THeaderProps) => {
  const { logOut } = useContext(AuthContext);

  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={
        theme === 'light' ? cl.headerContainer : cl.headerContainerDark
      }
    >
      <div className={cl.home}>
        <Tooltip placement='top' title='Home'>
          <Link to={RoutesDomains.HOME}>
            <Button
              type='text'
              shape='circle'
              icon={
                <ColorLensIcon
                  fontSize={'large'}
                  style={{ color: theme === 'dark' ? 'white' : 'initial' }}
                />
              }
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
              icon={
                <PlusOutlined
                  style={{
                    fontSize: '1.5rem',
                    color: theme === 'dark' ? 'white' : 'initial',
                  }}
                />
              }
            />
          </Tooltip>
        </Link>
        <Button type='text' shape='circle' onClick={toggleTheme}>
          {theme === 'light' ? (
            <LightModeIcon />
          ) : (
            <DarkModeIcon style={{ color: 'white' }} />
          )}
        </Button>
        <p>
          Welcome{' '}
          <strong className={theme === 'light' ? cl.user : cl.userDark}>
            {email}
          </strong>
        </p>
        <Tooltip placement='top' title='Log out'>
          <Button
            type='text'
            shape='circle'
            onClick={logOut}
            icon={
              <LogoutOutlined
                style={{
                  fontSize: '1.5rem',
                  color: theme === 'dark' ? 'white' : 'initial',
                }}
              />
            }
          ></Button>
        </Tooltip>
      </div>
    </header>
  );
};
