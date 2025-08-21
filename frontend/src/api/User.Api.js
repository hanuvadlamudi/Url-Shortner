import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (name, email, password) => {
  const { data } = await axios.post(`${API_BASE_URL}/api/auth/register`, { name, email, password }, {
    withCredentials: true
  });
  return data;
};


export const loginUser = async (email, password) => {
  const { data } = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password }, {
    withCredentials: true
  });
  return data;
};

export const logoutUser = async () => {
  const { data } = await axios.post(`${API_BASE_URL}/api/auth/logout`, {}, {
    withCredentials: true
  });
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/api/auth/current`, {
    withCredentials: true
  });
  return data;
}

export const getUserUrls = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/api/user/urls`, {
    withCredentials: true
  });
  return data;
};
