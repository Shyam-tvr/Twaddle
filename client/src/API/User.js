import { getDataAPI, patchDataAPI } from "./axiosClient";

export const userApi = {
  search: async (search, token) => {
    try {
      if (search.length > 0 && token.length > 0) {
        const response = await getDataAPI(
          `user/search?username=${search}`,
          token
        );
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error(response.data.msg);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("Internal Server Error");
      } else {
        console.log(error);
      }
    }
  },

  getUser: async (id, token) => {
    try {
      const response = await getDataAPI(`user/${id}`, token);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data.msg);
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("Internal Server Error");
      } else {
        console.log(error);
      }
    }
  },

  suggestions: async (token) => {
    try {
      const response = await getDataAPI(`user/user/suggestions`, token);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data.msg);
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("Internal Server Error");
      } else {
        console.log(error);
      }
    }
  },

  editUser: async (data, token) => {
    try {
      const response = await patchDataAPI(`user`, data, token);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data.msg);
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("Internal Server Error");
      } else {
        console.log(error);
      }
    }
  },
};
