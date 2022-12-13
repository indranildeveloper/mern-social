import axios from "axios";

const API_URL = "http://localhost:8000/api/auth";

// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    sessionStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login User
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data) {
    sessionStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};
// Logout User
const logout = async () => {
  sessionStorage.removeItem("user");
};

const authService = { register, login, logout };

export default authService;
