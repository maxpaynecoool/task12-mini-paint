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

export const changeTool = (tool: string) => ({
  type: 'CHANGE_TOOL',
  payload: tool,
});
export const changeToolColor = (color: string) => ({
  type: 'CHANGE_TOOL_COLOR',
  payload: color,
});
export const changeLineThickness = (thickness: number) => ({
  type: 'CHANGE_LINE_THICKNESS',
  payload: thickness,
});
export const toolIsDrawing = (isDrawing: boolean) => ({
  type: 'TOOL_IS_DRAWING',
  payload: isDrawing,
});
export const changeFillColor = () => ({ type: 'CHANGE_FILL_COLOR' });
export const changePrevPosition = (position: { x: number; y: number }) => ({
  type: 'CHANGE_PREV_POSITION',
  payload: position,
});
