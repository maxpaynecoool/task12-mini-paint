import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import cl from './Canvas.module.scss';
import { useTypedSelector } from '../../store/hooks/useTypedSelector.ts';
import { useTypedDispatch } from '../../store/hooks/useTypedDispatch.ts';
import { CANVAS_SIZE, TOOLS } from './constants.ts';
import {
  changePrevPosition,
  toolIsDrawing,
} from '../../store/slice/toolSlice.ts';
import { useAppSelector } from '../../store/hooks/useReduxHooks.ts';
import { child, get, ref, set } from 'firebase/database';
import { db } from '../../apiFirebase/firebase.ts';
import { v4 as uuidv4 } from 'uuid';
import { ClearOutlined, DownloadOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { resetLoaded } from '../../store/slice/imageSlice.ts';

interface ISnapshot {
  data: Uint8ClampedArray;
  colorSpace: PredefinedColorSpace;
  height: number;
  width: number;
  ImageData?: ImageData;
}

const Canvas = () => {
  const { id: existingId } = useParams<{ id: string }>();
  const [imageExists, setImageExists] = useState<boolean>(true);
  // const location = useLocation();
  const navigate = useNavigate();
  const [image, setImage] = useState<string>('');
  const [isCanvasModified, setIsCanvasModified] = useState<boolean>(false);
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
  const { userData } = useAppSelector((state) => state.user);

  const checkIfImageExists = async (imageID: string) => {
    try {
      const dbRef = ref(db);
      const snapshot = await get(
        child(dbRef, `users/${userData!.uid}/images/${imageID}`),
      );
      if (snapshot.exists()) {
        const imageData = snapshot.val();
        setImage(imageData.imagesrc);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error checking image existence:', error);
      return false;
    }
  };

  useEffect(() => {
    if (existingId) {
      checkIfImageExists(existingId).then((exists) => {
        if (!exists) {
          setImageExists(false);
          toast.error('Image does not exist!');
          navigate('/home');
        }
      });
    }
  }, [existingId]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d', {
        willReadFrequently: true,
      });
      contextRef.current = context;

      if (image) {
        const img = new Image();
        img.src = image;
        img.onload = () => {
          context?.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
      }
    }
  }, [image]);

  const clear = () => {
    const ctx = contextRef.current;
    ctx!.clearRect(0, 0, ctx!.canvas.width, ctx!.canvas.height);
    setIsCanvasModified(true);
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
    setIsCanvasModified(true);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = contextRef.current;
    if (!isDrawing) return;
    ctx!.putImageData(snapshot, 0, 0);
    TOOLS[tool].command(e, ctx, prevPosition, fillColor, color);
    setIsCanvasModified(true);
  };

  const onMouseUp = () => {
    dispatch(toolIsDrawing(false));
    saveImg();
  };
  const saveImg = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const dataURL = canvas.toDataURL('image/png');
    setImage(dataURL);
  };

  const isCanvasEmpty = () => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) {
      return true;
    }
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      if (imageData.data[i + 3] !== 0) {
        return false;
      }
    }
    return true;
  };

  const uploadImg = () => {
    if (!isCanvasModified) {
      toast.error('No changes to save!');
      return;
    }
    if (isCanvasEmpty()) {
      toast.error('Nothing to save!');
      return;
    }

    const id = existingId || uuidv4();
    const projectName = `project-${id.slice(0, 6)}`;

    try {
      set(ref(db, `users/${userData!.uid}/images/${id}/`), {
        email: userData!.email,
        imagesrc: image,
        id: id,
        projectName: projectName,
      });
      toast.success('Image uploaded successfully!');
      setIsCanvasModified(false);
      navigate(`/paint/${id}`, { state: { imageID: image, id } });
      dispatch(resetLoaded());
    } catch {
      toast.error('Something went wrong!');
    }
  };

  const downloadPainting = () => {
    const image = canvasRef!.current!.toDataURL('image/png');
    const link = document.createElement('a');
    if (isCanvasEmpty()) {
      toast.error('Nothing to save on your device!');
      return;
    } else {
      link.href = image;
      link.download = `image${existingId}.png`;
      link.click();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          if (img.width !== img.height) {
            toast.error('Only square images are allowed!');
            return;
          }
          const canvas = canvasRef.current;
          const context = contextRef.current;
          if (canvas && context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
            setIsCanvasModified(true);
            saveImg();
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  if (!imageExists) {
    return <div>Image not found. Redirecting...</div>;
  }

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
        <Tooltip placement='bottom' title='Download Image'>
          <Button
            type='primary'
            className={cl.toolButton}
            onClick={downloadPainting}
          >
            <DownloadOutlined style={{ fontSize: '1.25rem' }} />
          </Button>
        </Tooltip>
        <Tooltip placement='bottom' title='Upload Image'>
          <Button
            type='primary'
            className={cl.toolButton}
            onClick={() => document.getElementById('uploadImageInput')?.click()}
          >
            <UploadOutlined style={{ fontSize: '1.25rem' }} />
          </Button>
        </Tooltip>
        <input
          type='file'
          id='uploadImageInput'
          style={{ display: 'none' }}
          accept='image/*'
          onChange={handleImageUpload}
        />
      </div>
    </div>
  );
};

export default Canvas;