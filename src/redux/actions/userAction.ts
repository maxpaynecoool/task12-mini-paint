export interface userDataProps {
  email: string | null;
  uid: string | null;
}

export const setUser = (user: userDataProps) => ({
  type: 'SET_USER',
  payload: user,
});
export const setUnAuth = () => ({ type: 'SET_UNAUTH' });
