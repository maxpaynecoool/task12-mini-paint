import { SvgIconProps } from '@mui/material/SvgIcon';

type TPrevPosition = {
  x: number;
  y: number;
};

export interface ITools {
  [key: string]: {
    name: string;
    command: (
      e: React.MouseEvent<HTMLCanvasElement>,
      ctx: CanvasRenderingContext2D | null,
      prevPosition: TPrevPosition,
      fillColor: boolean,
      color: string,
    ) => void;
    icon: React.ComponentType<SvgIconProps>;
    tooltip: string;
  };
}

export interface ICanvasSize {
  width: number;
  height: number;
}


