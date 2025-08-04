import axios from 'axios';
import store from '../store/store';

export const shorten = async (originalUrl, slug = "") => {
  const { isAuthenticated } = store.getState().auth;
  
  let endpoint;
  let payload = { url: originalUrl };  
  
  if (isAuthenticated) {
    if (slug) {
      endpoint = 'http://localhost:8080/api/create/custom';
      payload = { url: originalUrl, slug };  
    } else {
      endpoint = 'http://localhost:8080/api/create/user';
    }
  } else {
    endpoint = 'http://localhost:8080/api/create';
  }
  
  const { data } = await axios.post(endpoint, payload, {
    withCredentials: true
  });
  return data;
};
