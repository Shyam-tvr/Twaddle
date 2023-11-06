import { getDataAPI, postDataAPI } from "./axiosClient";

export const hashTagApi = {
  gethashTags: async (value, token) => {
    try {
      const response = await getDataAPI(`hashtag/?value=${value}`,token);
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
  addHashtag: async (tag,token) => {
    try {
      const response = await postDataAPI('hashtag',{ tag },token);
      if (response.status === 200) {
        return response.data
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
  }
};
