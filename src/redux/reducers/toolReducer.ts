import { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  tool: 'line',
  color: '#000000',
  lineThickness: 1,
  isDrawing: false,
  fillColor: false,
  prevPosition: { x: 0, y: 0 },
};

type ToolAction = {
  type: string;
  payload?: string;
};

export const toolReducer = (state = initialState, action: ToolAction) => {
  switch (action.type) {
    case 'CHANGE_TOOL':
      return { ...state, tool: action.payload };
    case 'CHANGE_TOOL_COLOR':
      return { ...state, color: action.payload };
    case 'CHANGE_LINE_THICKNESS':
      return { ...state, lineThickness: action.payload };
    case 'TOOL_IS_DRAWING':
      return { ...state, isDrawing: action.payload };
    case 'CHANGE_FILL_COLOR':
      return { ...state, fillColor: !state.fillColor };
    case 'CHANGE_PREV_POSITION':
      return { ...state, prevPosition: action.payload };
    default:
      return state;
  }
};
