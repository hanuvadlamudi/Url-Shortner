// utils/helper.js
import store from '../src/store/store';
import { redirect } from 'react-router-dom';

export const authenticate = () => {
  const { isAuthenticated } = store.getState().auth;

  if (!isAuthenticated) {
    throw redirect('/login');
  }
}
