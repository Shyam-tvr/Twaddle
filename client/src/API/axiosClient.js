import axios from "axios";

export const getDataAPI = async (url, token) => {
  const res = await axios.get(`http://localhost:5000/api/${url}`, {
    headers: { Authorization: token },
    withCredentials:true
  });
  return res;
};

export const postDataAPI = async (url, data, token) => {
  const res = await axios.post(`http://localhost:5000/api/${url}`, data, {
    headers: { Authorization: token },
    withCredentials:true
  });
  return res;
};

export const putDataAPI = async (url, data, token) => {
  const res = await axios.put(`http://localhost:5000/api/${url}`, data, {
    headers: { Authorization: token },
    withCredentials:true
  });
  return res;
};

export const patchDataAPI = async (url, data, token) => {
  const res = await axios.patch(`http://localhost:5000/api/${url}`, data, {
    headers: { Authorization: token },
    withCredentials:true
  });
  return res;
};

export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`http://localhost:5000/api/${url}`, {
    headers: { Authorization: token },
    withCredentials:true
  });
  return res;
};
