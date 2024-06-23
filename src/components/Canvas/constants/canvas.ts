import CreateIcon from '@mui/icons-material/Create';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import {
  brush,
  drawLine,
  eraser,
  drawRect,
  drawCircle,
} from '../functions.ts';
import { SvgIconProps } from '@mui/material/SvgIcon';

type TPrevPosition = {
  x: number;
  y: number;
};

interface ITools {
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
  };
}

interface ICanvasSize {
  width: number;
  height: number;
}

export const CANVAS_SIZE: ICanvasSize = {
  width: 800,
  height: 600,
};

export const TOOLS: ITools = {
  brush: {
    name: 'brush',
    command: brush,
    icon: CreateIcon,
  },
  line: {
    name: 'line',
    command: drawLine,
    icon: HorizontalRuleIcon,
  },
  rectangle: {
    name: 'rectangle',
    command: drawRect,
    icon: CropSquareIcon,
  },
  circle: {
    name: 'circle',
    command: drawCircle,
    icon: RadioButtonUncheckedIcon,
  },
  eraser: {
    name: 'eraser',
    command: eraser,
    icon: AutoFixNormalIcon,
  },
};
