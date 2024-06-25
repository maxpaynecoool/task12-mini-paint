import React, { memo, useCallback, useMemo } from 'react';
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
import { Button, Tooltip } from 'antd';
import { ClearOutlined, SaveOutlined } from '@ant-design/icons';

export const ToolBar = memo(() => {
  const dispatch = useTypedDispatch();
  const { tool, color, fillColor, lineThickness } = useTypedSelector(
    (state) => state.tool,
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
          const { name, icon: Icon, tooltip } = item;
          return (
            <Tooltip key={name} placement='top' title={tooltip}>
              <Button
                type='primary'
                className={`${cl.toolButton} ${
                  tool === name ? cl.selectedToolButton : ''
                }`}
                onClick={() => dispatch(changeTool(name))}
                style={{ fontSize: '1.25rem' }}
              >
                <Icon />
              </Button>
            </Tooltip>
          );
        })}
      </div>
      <div className={cl.toolButtonsControlContainer}>
        <Box>Fill:</Box>
        <Checkbox checked={fillColor} onChange={setFillColor} />
        <Box>Color:</Box>
        <Tooltip placement='top' title='Choose a color'>
          <input
            className={cl.input}
            value={color}
            onChange={setToolColor}
            type='color'
          />
        </Tooltip>
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
