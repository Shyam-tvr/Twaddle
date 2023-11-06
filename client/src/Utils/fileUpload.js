import axios from "axios";

export const fileUpload = async (files) => {
  let fileArr = [];
  try {
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "u7lj9tra");
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/djkop1xi1/upload",
        formData
      );
      fileArr.push({ public_id: data.public_id, url: data.secure_url });
    }

    return fileArr;
  } catch (err) {
    throw err;
  }
};
