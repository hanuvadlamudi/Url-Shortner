import axios from 'axios';
import store from '../store/store';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const shorten = async (originalUrl, slug = "") => {
  const { isAuthenticated } = store.getState().auth;

  let endpoint;
  let payload = { url: originalUrl };

  if (isAuthenticated) {
    if (slug) {
      endpoint = `${API_BASE_URL}/api/create/custom`;
      payload = { url: originalUrl, slug };
    } else {
      endpoint = `${API_BASE_URL}/api/create/user`;
    }
  } else {
    endpoint = `${API_BASE_URL}/api/create`;
  }

  const { data } = await axios.post(endpoint, payload, {
    withCredentials: true
  });
  return data;
};
