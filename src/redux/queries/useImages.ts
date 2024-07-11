import { get, ref, remove, set } from 'firebase/database';
import { db } from '../../apiFirebase/firebase.ts';
import { v4 as uuidv4 } from 'uuid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface ImageData {
  email: string;
  imagesrc: string;
  id: string;
}

const fetchImages = async (userUid: string): Promise<ImageData[]> => {
  const snapshot = await get(ref(db, `users/${userUid}/images`));
  return snapshot.val() ? Object.values(snapshot.val()) : [];
};

export const useImages = (userUid: string) => {
  // @ts-ignore
  return useQuery(['images', userUid], () => fetchImages(userUid));
};

const deleteImage = async ({
  userUid,
  id,
}: {
  userUid: string;
  id: string;
}) => {
  await remove(ref(db, `users/${userUid}/images/${id}`));
  return id;
};

export const useDeleteImage = (userUid: string) => {
  const queryClient = useQueryClient();
  // @ts-ignore
  return useMutation(deleteImage, {
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(['images', userUid]);
    },
  });
};

const uploadImage = async ({
  userUid,
  image,
  email,
  id,
}: {
  userUid: string;
  image: string;
  email: string;
  id?: string;
}) => {
  await set(ref(db, `users/${userUid}/images/${id || uuidv4()}`), {
    email,
    imagesrc: image,
    id,
  });
};

export const useUploadImage = (userUid: string) => {
  const queryClient = useQueryClient();
  // @ts-ignore
  return useMutation(uploadImage, {
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(['images', userUid]);
    },
  });
};
