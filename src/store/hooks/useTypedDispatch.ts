import { AppDispatch } from '../store.ts';
import { useDispatch } from 'react-redux';

export const useTypedDispatch: () => AppDispatch = useDispatch;
