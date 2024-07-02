import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ref, get, remove } from 'firebase/database';
import { db } from '../../apiFirebase/firebase.ts';

interface ImageInfo {
  email: string;
  id: string;
  imagesrc: string;
}

interface ImagesState {
  loading: boolean;
  images: ImageInfo[];
  error: object | null;
  loaded: boolean;
}

const initialState: ImagesState = {
  loading: false,
  images: [],
  error: null,
  loaded: false,
};

export const fetchImages = createAsyncThunk(
  'images/fetchImages',
  async (userUid: string) => {
    const snapshot = await get(ref(db, `users/${userUid}/images`));
    const images: ImageInfo[] = Object.values(snapshot.val());
    return images;
  },
);

export const deleteImage = createAsyncThunk(
  'images/deleteImage',
  async ({ userUid, id }: { userUid: string | null; id: string }) => {
    await remove(ref(db, `users/${userUid}/images/${id}`));
    return id;
  },
);

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    resetLoaded: (state) => {
      state.loaded = false;
    },
    clearImages(state) {
      state.images = [];
      state.loading = false;
      state.loaded = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchImages.fulfilled,
      (state, action: PayloadAction<ImageInfo[]>) => {
        state.loading = false;
        state.images = action.payload;
        state.error = null;
        state.loaded = true;
      },
    );
    builder.addCase(fetchImages.rejected, (state, action) => {
      state.loading = false;
      state.images = [];
      state.error = action.error;
    });
    builder.addCase(
      deleteImage.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.images = state.images.filter(
          (image) => image.id !== action.payload,
        );
      },
    );
  },
});

export const { resetLoaded, clearImages } = imagesSlice.actions;

export default imagesSlice.reducer;
