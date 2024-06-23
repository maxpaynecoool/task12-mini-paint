import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IToolState {
  tool: string;
  color: string;
  lineThickness: number;
  isDrawing: boolean;
  fillColor: boolean;
  prevPosition: {
    x: number;
    y: number;
  };
}

const initialState: IToolState = {
  tool: 'line',
  color: '#000000',
  lineThickness: 1,
  isDrawing: false,
  fillColor: false,
  prevPosition: {
    x: 0,
    y: 0,
  },
};

export const toolSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    changeTool: (state, action: PayloadAction<string>) => {
      state.tool = action.payload;
    },
    changeToolColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    changeLineThickness: (state, action: PayloadAction<number>) => {
      state.lineThickness = action.payload;
    },
    toolIsDrawing: (state, action: PayloadAction<boolean>) => {
      state.isDrawing = action.payload;
    },
    changeFillColor: (state) => {
      state.fillColor = !state.fillColor;
    },
    changePrevPosition: (
      state,
      action: PayloadAction<{ x: number; y: number }>,
    ) => {
      state.prevPosition = action.payload;
    },
  },
});

export const {
  changeTool,
  changeToolColor,
  changeLineThickness,
  toolIsDrawing,
  changeFillColor,
  changePrevPosition,
} = toolSlice.actions;

export default toolSlice.reducer;
