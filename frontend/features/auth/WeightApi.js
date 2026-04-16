import api from "../../api";

// Add weight
export const addWeight = async (weightValue) => {
  const res = await api.post("/api/weights/add", null, {
    params: { weightValue },
  });
  return res.data;
};

// List weights (pagination)
export const getWeights = async (page) => {
  const res = await api.get("/api/weights/list", {
    params: { page, size: 1 },
  });
  return res.data;
};

// Edit weight
export const editWeight = async ({ id, newWeight }) => {
  const res = await api.put(`/api/weights/edit/${id}`, null, {
    params: { newWeight },
  });
  return res.data;
};

// Delete weight
export const deleteWeight = async (id) => {
  const res = await api.delete(`/api/weights/delete/${id}`);
  return res.data;
};
