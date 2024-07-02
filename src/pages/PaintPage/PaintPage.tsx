import Canvas from '../../components/Canvas/Canvas.tsx';
import { ToolBar } from '../../components/Toolbar/ToolBar.tsx';
import cl from './PaintPage.module.scss';
import { Header } from '../../components/Header/Header.tsx';
import { useAppSelector } from '../../store/hooks/useReduxHooks.ts';

export const PaintPage = () => {
  const { userData } = useAppSelector((state) => state.user);

  return (
    <>
      <Header email={userData!.email} />
      <div className={cl.paintContainer}>
        <ToolBar />
        <Canvas />
      </div>
    </>
  );
};