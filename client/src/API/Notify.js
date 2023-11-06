import { getDataAPI, postDataAPI } from "./axiosClient";

export const notifyApi ={
    getNotifies: async (token) => {
        try {
          const response = await getDataAPI(`notify`,token);
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
}