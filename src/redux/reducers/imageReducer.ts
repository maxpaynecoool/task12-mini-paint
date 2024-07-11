const initialState = {
  loading: false,
  images: [],
  error: null,
  loaded: false,
};

type imageAction = {
  type: string;
  payload?: string;
};

export const imagesReducer = (state = initialState, action: imageAction) => {
  switch (action.type) {
    case 'FETCH_IMAGES_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_IMAGES_SUCCESS':
      return { ...state, loading: false, images: action.payload, loaded: true };
    case 'FETCH_IMAGES_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_IMAGE_SUCCESS':
      return {
        ...state,
        // @ts-ignore
        images: state.images.filter((image) => image.id !== action.payload),
      };
    case 'RESET_LOADED':
      return { ...state, loaded: false };
    case 'CLEAR_IMAGES':
      return { ...state, images: [], loading: false, loaded: false };
    default:
      return state;
  }
};
