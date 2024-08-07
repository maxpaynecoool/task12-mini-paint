import Canvas from '../../components/Canvas/Canvas.tsx';
import { ToolBar } from '../../components/Toolbar/ToolBar.tsx';
import cl from './PaintPage.module.scss';
import { Header } from '../../components/Header/Header.tsx';
import { useAppSelector } from '../../store/hooks/useReduxHooks.ts';
import { useTheme } from '../../contexts/ThemeContext.tsx';

export const PaintPage = () => {
  const { userData } = useAppSelector((state) => state.user);

  const { theme } = useTheme();

  return (
    <>
      <Header email={userData!.email} />
      <main className={theme === 'light' ? cl.paintMain : cl.paintMainDark}>
        <div className={cl.paintContainer}>
          <ToolBar />
          <Canvas />
        </div>
      </main>
    </>
  );
};
