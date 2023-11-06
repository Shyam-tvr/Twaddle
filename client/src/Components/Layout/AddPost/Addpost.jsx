import { useContext, useRef, useState } from "react";
import { Box, Card, IconButton, Typography } from "@mui/material";
import {
  AddPhotoAlternateOutlined,
  CloseOutlined,
  ContentCopyOutlined,
} from "@mui/icons-material";
import PostForm from "../../Home/Post/PostForm";
import { postValidation } from "../../../Utils/Validation/Post";
import { postApi } from "../../../API/Post";
import { useDispatch, useSelector } from "react-redux";
import { setPostUpload } from "../../../redux/slices/alertSlice";
import { toast } from "react-toastify"
import { menuContext } from "../../../Pages/Layout/Layout";

const Addpost = ({ setAddPost }) => {
  const {menu, setMenu} = useContext(menuContext)
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [next, setNext] = useState(false);
  const [files, setFiles] = useState([]);
  const [select, setSelect] = useState(0);
  const [postData, setPostData] = useState({
    files: [],
    caption: "",
    location: "",
    tags: [],
    hashtags: [],
  });
  const token = useSelector((state) => state.user.accessToken);
  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    try {
      let inputs = [...e.target.files];
      let err = "";
      let newFiles = [];

      inputs.forEach((file) => {
        if (!file) return (err = "File does not exist.");

        if (file.size > 1024 * 1024 * 5) {
          return (err = "The image/video largest is 5mb.");
        }
        return newFiles.push(file);
      });
      if (err) console.log(err);
      setFiles([...files, ...newFiles]);
    } catch (error) {
      console.log(error);
    }
  };

  const clearFile = (index) => {
    try {
      if (index === select || select === files.length - 1) {
        setSelect(select - 1);
      }
      const newFiles = files.filter((_, i) => i !== index);
      setFiles(newFiles);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleNext = async () => {
    if (next) {
      try {
        const error = await postValidation(postData);
        if (Object.keys(error).length === 0) {
          dispatch(setPostUpload(true));
          console.log("first")
          await postApi.addPost(postData, token);
          dispatch(setPostUpload(false));
        }
      } catch (error) {
        dispatch(setPostUpload(false));
      }
    } else {
      if (files?.length < 1) {
        toast.warning("Please select a file to proceed.");
      } else {
        setPostData({ ...postData, files });
        setNext(true);
      }
    }
  };

  const handleCancel = () =>{
    try {
      if (next) {
        setNext(false)
      } else {
        setMenu({...menu,addPost:false})
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card
      sx={{
        minWidth: { xs: "100%", md: "25rem" },
        height: { xs: "100%", md: "30rem" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "3px 1rem",
          maxWidth: { md: "44rem" },
          borderBottom: "1px solid #dbdbdb",
        }}
      >
        <Typography
          sx={{ cursor: "pointer", fontSize: "13px", fontWeight: "700" }}
          onClick={handleCancel}
        >
          {next ? "Back" : "Cancel"}
        </Typography>
        <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
          Create Post
        </Typography>
        <Typography
          sx={{
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "700",
            color: "#1976d2",
          }}
          onClick={handleNext}
        >
          {next ? "Post" : "Next"}
        </Typography>
      </Box>
      {next ? (
        <PostForm postData={postData} setPostData={setPostData} />
      ) : (
        <>
          <input
            style={{ display: "none" }}
            ref={inputRef}
            type="file"
            name="profile"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            position="relative"
            sx={{
              width: "100%",
              height: "90%",
              backgroundColor: "white",
              marginY: { xs: "0", md: "5px" },
              position: "relative",
            }}
          >
            {files.length > 0 ? (
              <>
                <Box
                  sx={{
                    height: "20rem",
                    backgroundColor: "whitesmoke",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {files[select].type.match(/video/i) ? (
                    <video
                      src={URL.createObjectURL(files[select])}
                      alt="images"
                      autoPlay
                      loop
                      style={{ height: "20rem" }}
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(files[select])}
                      alt="images"
                      style={{ height: "20rem" }}
                    />
                  )}
                </Box>
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: "1rem",
                    right: "1rem",
                    backgroundColor: "whitesmoke",
                    zIndex: "2",
                  }}
                  onClick={handleClick}
                >
                  <ContentCopyOutlined />
                </IconButton>
                <Box
                  sx={{
                    width: "95%",
                    height: "6rem",
                    display: "flex",
                    alignItems: "center",
                    position: { xs: "absolute", md: "unset" },
                    bottom: "0",
                    overflowX: "scroll",
                  }}
                >
                  {files.map((file, index) => {
                    return (
                      <Box
                        key={index}
                        sx={{
                          height: "5rem",
                          position: "relative",
                          marginX: "5px",
                          backgroundColor: "whitesmoke",
                        }}
                      >
                        {file.type.match(/video/i) ? (
                          <video
                            src={URL.createObjectURL(file)}
                            alt="images"
                            autoPlay
                            loop
                            style={{ height: "5rem", width: "5rem" }}
                            onClick={() => setSelect(index)}
                          />
                        ) : (
                          <img
                            src={URL.createObjectURL(file)}
                            alt="images"
                            style={{ height: "5rem", width: "5rem" }}
                            onClick={() => setSelect(index)}
                          />
                        )}
                        <IconButton
                          sx={{
                            position: "absolute",
                            top: "0",
                            right: "0",
                            backgroundColor: "whitesmoke",
                            padding: "2px",
                          }}
                        >
                          <CloseOutlined
                            sx={{ fontSize: "14px", fontWeight: "bold" }}
                            onClick={() => {
                              clearFile(index);
                            }}
                          />
                        </IconButton>
                      </Box>
                    );
                  })}
                </Box>
              </>
            ) : (
              <>
                <AddPhotoAlternateOutlined sx={{ fontSize: "5rem" }} />
                <Typography marginY="0.75rem">
                  Drop Photos and videos here
                </Typography>
                <button
                  style={{
                    backgroundColor: "#1976d2",
                    border: "none",
                    color: "white",
                    padding: "7px",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={handleClick}
                >
                  Select from Device
                </button>
              </>
            )}
          </Box>
        </>
      )}
    </Card>
  );
};

export default Addpost;
