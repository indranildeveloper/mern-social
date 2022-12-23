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

// Get profile photo
const getProfilePhoto = async (userId) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const response = await axios.get(`${API_URL}/photo/${userId}`, config);
  return response.data;
};

// Get default photo
const getDefaultPhoto = async () => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const response = await axios.get(`${API_URL}/defaultphoto`, config);
  return response.data;
};

// Update User
const updateUser = async (userId, userData, token) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const formData = new FormData();
  formData.append("name", userData.name);
  formData.append("email", userData.email);
  formData.append("about", userData.about);
  formData.append("photo", userData.photo);
  formData.append("password", userData.password);

  const response = await axios.put(`${API_URL}/${userId}`, formData, config);
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

const userService = {
  getUsers,
  getUser,
  getProfilePhoto,
  getDefaultPhoto,
  updateUser,
  deleteUser,
};

export default userService;
