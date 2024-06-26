import { brush, drawCircle, drawLine, drawRect, eraser } from './functions.ts';
import CreateIcon from '@mui/icons-material/Create';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import { ICanvasSize, ITools } from './types.ts';

export const lineThicknessSelect: Array<number> = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
];

export const CANVAS_SIZE: ICanvasSize = {
  width: 500,
  height: 500,
};

export const TOOLS: ITools = {
  brush: {
    name: 'brush',
    command: brush,
    icon: CreateIcon,
    tooltip: 'Brush',
  },
  line: {
    name: 'line',
    command: drawLine,
    icon: HorizontalRuleIcon,
    tooltip: 'Line',
  },
  rectangle: {
    name: 'rectangle',
    command: drawRect,
    icon: CropSquareIcon,
    tooltip: 'Rectangle',
  },
  circle: {
    name: 'circle',
    command: drawCircle,
    icon: RadioButtonUncheckedIcon,
    tooltip: 'Circle',
  },
  eraser: {
    name: 'eraser',
    command: eraser,
    icon: AutoFixNormalIcon,
    tooltip: 'Eraser',
  },
};
