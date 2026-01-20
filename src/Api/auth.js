import api from "./axios";

// ==============================
//  USER AUTHENTICATION (Public)
// ==============================

export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
};

export const resetPassword = async (id, token, password) => {
  const response = await api.post(`/auth/reset-password/${id}/${token}`, { password });
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.put("/auth/profile", data);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get("/auth/users");
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/auth/delete/${id}`);
  return response.data;
};

export const suspendUser = async (id) => {
  const response = await api.put(`/auth/suspend/${id}`);
  return response.data;
};