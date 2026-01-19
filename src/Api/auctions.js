import api from "./axios";

export const getAllAuctions = async () => {
  const response = await api.get("/auctions");
  return response.data;
};

export const getMyAuctions = async () => {
  const response = await api.get("/auctions/user/my-auctions");
  return response.data;
};

export const createAuction = async (data) => {
  const response = await api.post("/auctions/create", data); 
  return response.data;
};

export const deleteAuction = async (id) => {
  const response = await api.delete(`/auctions/delete/${id}`);
  return response.data;
};

export const getAuctionById = async (id) => {
  const response = await api.get(`/auctions/${id}`);
  return response.data;
};

export const updateAuction = async (id, data) => {
  const response = await api.put(`/auctions/edit/${id}`, data);
  return response.data;
};

export const deleteImage = async (imageId) => {
  const response = await api.delete(`/auctions/image/${imageId}`);
  return response.data;
};