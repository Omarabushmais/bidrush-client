import api from "./axios";

export const getAllBids = async () => {
  const response = await api.get("/bids");
  return response.data;
};

export const getBidsByAuctionId = async (auctionId) => {
  const response = await api.get(`/bids/auction/${auctionId}`);
  return response.data;
};

export const createBid = async (data) => {
  const response = await api.post("/bids/create", data);
  return response.data;
};

export const deleteBid = async (id) => {
  const response = await api.delete(`/bids/delete/${id}`);
  return response.data;
};

export const updateBid = async (id, data) => {
  const response = await api.put(`/bids/update/${id}`, data);
  return response.data;
};

export const getMyBids = async () => {
  const response = await api.get("/bids/user/my-bids");
  return response.data;
};