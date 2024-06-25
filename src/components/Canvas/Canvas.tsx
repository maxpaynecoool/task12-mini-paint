import React, { useEffect, useRef, useState } from 'react';
import cl from './Canvas.module.scss';
import { useTypedSelector } from '../../store/hooks/useTypedSelector.ts';
import { useTypedDispatch } from '../../store/hooks/useTypedDispatch.ts';
import { CANVAS_SIZE, TOOLS } from './constants/canvas.ts';
import {
  changePrevPosition,
  toolIsDrawing,
} from '../../store/slice/toolSlice.ts';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks/useReduxHooks.ts';
import { ref, set } from 'firebase/database';
import { db } from '../../apiFirebase/firebase.ts';
import { v4 as uuidv4 } from 'uuid';
import { ClearOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import toast from 'react-hot-toast';

interface ISnapshot {
  data: Uint8ClampedArray;
  colorSpace: PredefinedColorSpace;
  height: number;
  width: number;
  ImageData?: ImageData;
}

const Canvas = () => {
  const [image, setImage] = useState<string>('');
  const dispatch = useTypedDispatch();
  const { tool, color, lineThickness, isDrawing, fillColor, prevPosition } =
    useTypedSelector((state) => state.tool);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [snapshot, setSnapshot] = useState<ISnapshot>({
    data: new Uint8ClampedArray(0),
    colorSpace: 'srgb',
    height: CANVAS_SIZE.height,
    width: CANVAS_SIZE.width,
  });

  console.log(image)

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d', {
        willReadFrequently: true,
      });
      contextRef.current = context;
    }
  });

  const clear = () => {
    const ctx = contextRef.current;
    ctx!.clearRect(0, 0, ctx!.canvas.width, ctx!.canvas.height);
  };

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    dispatch(toolIsDrawing(true));
    const ctx = contextRef.current;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    ctx!.beginPath();
    ctx!.lineWidth = lineThickness;
    ctx!.strokeStyle = color;
    ctx!.fillStyle = color;
    setSnapshot(ctx!.getImageData(0, 0, ctx!.canvas.width, ctx!.canvas.height));
    dispatch(changePrevPosition({ x, y }));
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = contextRef.current;
    if (!isDrawing) return;
    ctx!.putImageData(snapshot, 0, 0);

    TOOLS[tool].command(e, ctx, prevPosition, fillColor, color);
  };

  const onMouseUp = () => {
    dispatch(toolIsDrawing(false));
    saveImg();
  };

  const navigate = useNavigate();
  const { email } = useAppSelector((state) => state.user);

  const saveImg = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const dataURL = canvas.toDataURL('image/png')
    setImage(dataURL);
  };

  const uploadImg = () => {
    try {
      set(ref(db, `images/${uuidv4()}/`), {
        email,
        imagesrc: image,
        id: uuidv4(),
      });
      toast.success('Image uploaded successfully!');
    } catch {
      toast.error('Something went wrong!')
    }

  };

  // const deleteImg = () => {
  //   const imageId = getImageId(); // Define a function or method to get the specific image ID
  //   if (!imageId) return;
  //
  //   const imageRef = ref(db, `images/${imageId}`);
  //   remove(imageRef)
  //     .then(() => {
  //       console.log("Image deleted successfully");
  //       // Optionally navigate to another page or update your UI
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting image: ", error);
  //     });
  // };

  return (
    <div className={cl.canvasContainer}>
      <canvas
        className={cl.canvasBody}
        width={CANVAS_SIZE.width}
        height={CANVAS_SIZE.height}
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      />
      <div className={cl.topButtons}>
        <Tooltip placement='bottom' title='Clear'>
          <Button type='primary' className={cl.toolButton} onClick={clear}>
            <ClearOutlined style={{ fontSize: '1.25rem' }} />
          </Button>
        </Tooltip>
        <Tooltip placement='bottom' title='Save'>
          <Button type='primary' className={cl.toolButton} onClick={uploadImg}>
            <SaveOutlined style={{ fontSize: '1.25rem' }} />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Canvas;
