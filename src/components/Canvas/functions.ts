import React from 'react';

type TPrevPosition = {
  x: number;
  y: number;
};

export const drawRect = (
  e: React.MouseEvent<HTMLCanvasElement>,
  ctx: CanvasRenderingContext2D | null,
  prevPosition: TPrevPosition,
  fillColor: boolean,
) => {
  if (!fillColor) {
    return ctx!.strokeRect(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY,
      prevPosition.x - e.nativeEvent.offsetX,
      prevPosition.y - e.nativeEvent.offsetY,
    );
  }
  ctx!.fillRect(
    e.nativeEvent.offsetX,
    e.nativeEvent.offsetY,
    prevPosition.x - e.nativeEvent.offsetX,
    prevPosition.y - e.nativeEvent.offsetY,
  );
};

export const drawCircle = (
  e: React.MouseEvent<HTMLCanvasElement>,
  ctx: CanvasRenderingContext2D | null,
  prevPosition: TPrevPosition,
  fillColor: boolean,
) => {
  ctx!.beginPath();
  const radius = Math.sqrt(
    Math.pow(prevPosition.x - e.nativeEvent.offsetX, 2) +
      Math.pow(prevPosition.y - e.nativeEvent.offsetY, 2),
  );
  ctx!.arc(prevPosition.x, prevPosition.y, radius, 0, 2 * Math.PI);
  fillColor ? ctx!.fill() : ctx!.stroke();
};

export const drawLine = (
  e: React.MouseEvent<HTMLCanvasElement>,
  ctx: CanvasRenderingContext2D | null,
  prevPosition: TPrevPosition,
) => {
  ctx!.beginPath();
  ctx!.moveTo(prevPosition.x, prevPosition.y);
  ctx!.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  ctx!.stroke();
};

export const eraser = (
  e: React.MouseEvent<HTMLCanvasElement>,
  ctx: CanvasRenderingContext2D | null,
) => {
  ctx!.strokeStyle = '#fff';
  ctx!.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  ctx!.stroke();
};

export const brush = (
  e: React.MouseEvent<HTMLCanvasElement>,
  ctx: CanvasRenderingContext2D | null,
  _prevPosition: TPrevPosition,
  fillColor: boolean,
  color: string,
) => {
  ctx!.strokeStyle = color;
  ctx!.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  ctx!.stroke();
  fillColor ? ctx!.fill() : ctx!.stroke();
};
