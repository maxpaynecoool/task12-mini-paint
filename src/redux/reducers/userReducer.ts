const initialState = {
  userData: null,
  pending: true,
  isAuth: false,
};

type userAction = {
  type: string;
  payload?: string;
};

export const userReducer = (state = initialState, action: userAction) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        userData: action.payload,
        isAuth: true,
        pending: false,
      };
    case 'SET_UNAUTH':
      return { ...state, userData: null, isAuth: false, pending: false };
    default:
      return state;
  }
};
