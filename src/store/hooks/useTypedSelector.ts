import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../store.ts';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
