import React, { FC, memo, useCallback, useMemo } from 'react';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Checkbox,
  SelectChangeEvent,
} from '@mui/material';
import { useTypedDispatch } from '../../store/hooks/useTypedDispatch.ts';
import { useTypedSelector } from '../../store/hooks/useTypedSelector.ts';
import {
  changeFillColor,
  changeLineThickness,
  changeTool,
  changeToolColor,
} from '../../store/slice/toolSlice.ts';
import { TOOLS } from '../Canvas/constants/canvas.ts';
import { lineThicknessSelect } from '../Canvas/constants/lineThickness.ts';
import cl from './ToolBar.module.scss';

export const ToolBar: FC = memo(() => {
  const dispatch = useTypedDispatch();
  const { tool, color, fillColor, lineThickness } = useTypedSelector(
    (state) => state.tool,
  );

  const setToolIconColor = useMemo(
    () => (selectedTool: string) => {
      return tool === selectedTool ? 'primary' : 'info';
    },
    [tool],
  );

  const setFillColor = useCallback(
    () => dispatch(changeFillColor()),
    [dispatch],
  );

  const setToolColor = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(changeToolColor(e.target.value));

  const setLineThickness = (e: SelectChangeEvent<number>) =>
    dispatch(changeLineThickness(+e.target.value));

  return (
    <div className={cl.toolBarContainer}>
      <div className={cl.toolButtonsContainer}>
        {Object.values(TOOLS).map((item) => {
          const { name, icon: Icon } = item;
          return (
            <button
              className={cl.toolButton}
              key={name}
              onClick={() => dispatch(changeTool(name))}
              color={setToolIconColor(name)}
            >
              <Icon />
            </button>
          );
        })}
      </div>
      <div className={cl.toolButtonsControlContainer}>
        <Box>Fill:</Box>
        <Checkbox checked={fillColor} onChange={setFillColor} />
        <Box>Color:</Box>
        <input
          className={cl.input}
          value={color}
          onChange={setToolColor}
          type='color'
        />
        <Box>Line thickness:</Box>
        <Box sx={{ minWidth: 100 }}>
          <FormControl fullWidth size='small'>
            <Select value={lineThickness || ''} onChange={setLineThickness}>
              {lineThicknessSelect.map((thick) => {
                return (
                  <MenuItem key={thick} value={thick}>
                    {thick}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </div>
    </div>
  );
});

ToolBar.displayName = 'ToolBar';
