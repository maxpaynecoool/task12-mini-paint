import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ref, get } from 'firebase/database';
import { db } from '../../apiFirebase/firebase.ts';

interface ImageInfo {
  email: string;
  imagesrc: string;
}

interface ImagesState {
  loading: boolean;
  images: ImageInfo[];
  error: object | null;
}

const initialState: ImagesState = {
  loading: false,
  images: [],
  error: null,
};

export const fetchImages = createAsyncThunk('images/fetchImages', async () => {
  const snapshot = await get(ref(db, `images`));
  const images: ImageInfo[] = Object.values(snapshot.val());
  return images;
});

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchImages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      state.loading = false;
      state.images = action.payload;
      state.error = null;
    });
    builder.addCase(fetchImages.rejected, (state, action) => {
      state.loading = false;
      state.images = [];
      state.error = action.error;
    });
  },
});

export default imagesSlice.reducer;
