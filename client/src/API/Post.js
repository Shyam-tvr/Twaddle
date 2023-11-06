import { fileUpload } from "../Utils/fileUpload";
import { getDataAPI, patchDataAPI, postDataAPI } from "./axiosClient";

export const postApi = {
  addPost: async (postData, token) => {
    try { 
      const urls = await fileUpload(postData.files);
      const response = await postDataAPI(
        "post",
        {...postData,files:urls},
        token
      );

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
  getPosts: async (token) => {
    try {
      const response = await getDataAPI('post',token);
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
  getPost: async(post_id,token) =>{
    try {
      const response = await getDataAPI(`post/${post_id}`,token);
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
  editPost: async(data,post_id,token) => {
    try {
      const response = await patchDataAPI(`post/${post_id}`,data,token);
      if (response.status === 200) {
        return
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
