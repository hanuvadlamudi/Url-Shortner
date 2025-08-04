import store from "../store/store.js";
import { login } from '../store/slice/Auth.slice';
import { getCurrentUser } from '../api/User.Api';
import { redirect } from 'react-router-dom';

export const authenticate = async () => {
  const { isAuthenticated, user } = store.getState().auth;

  if (isAuthenticated && user) {
    return { user };
  }

  try {
    const data = await getCurrentUser();
    if (data.success && data.user) {
      store.dispatch(login(data.user));
      return { user: data.user };
    }
    throw new Error();
  } catch {
    throw redirect('/');
  }
};
