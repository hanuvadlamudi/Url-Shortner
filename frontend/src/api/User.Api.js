import axios from "axios";

export const registerUser = async (name, email, password) => {
  const { data } = await axios.post("http://localhost:8080/api/auth/register", { name, email, password }, {
    withCredentials: true  // Add this to enable cookies
  });
  return data;
};

export const loginUser = async (email, password) => {
  const { data } = await axios.post("http://localhost:8080/api/auth/login", { email, password }, {
    withCredentials: true  // Add this to enable cookies
  });
  return data;
};
