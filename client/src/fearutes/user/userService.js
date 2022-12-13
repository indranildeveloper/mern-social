import axios from "axios";

const API_URL = "http://localhost:8000/api/users";

// Get all users
const getUsers = async (token) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get single user
const getUser = async (userId, token) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${userId}`, config);
  return response.data;
};

// Update User
const updateUser = async (userId, userData, token) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}/${userId}`, userData, config);
  return response.data;
};

// Delete User
const deleteUser = async (userId, token) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${userId}`, config);
  return response.data;
};

const userService = { getUsers, getUser, updateUser, deleteUser };
export default userService;
