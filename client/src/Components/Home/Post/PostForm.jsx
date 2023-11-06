import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  Autocomplete,
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  List,
  ListItem,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { LocationOn, SentimentSatisfiedAltOutlined } from "@mui/icons-material";
import parse from "autosuggest-highlight/parse"
import EmojiPicker from "emoji-picker-react";
import Carousel from "../../../Utils/Carousel";
import { userApi } from "../../../API/User";
import { hashTagApi } from "../../../API/hashTag";
import axios from "axios";

const PostForm = ({ postData, setPostData }) => {
  const { avatar, username } = useSelector((state) => state.user.user);
  const { accessToken } = useSelector((state) => state.user);
  const [emoji, setEmoji] = useState(false);
  const [hashtag, setHashtag] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [tags, setTags] = useState([]);
  const open = Boolean(anchorEl);
  const [newHashtag, setNewHashtag] = useState("");
  const [value, setValue] = useState(null)
  const [location, SetLocation] = useState([]);

  const handleChange = async (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };
  const handleMention = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleHashtag = (event) => {
    setHashtag(true);
    setAnchorEl(event.currentTarget);
  };

  const search = useRef(null);

  const handleSearch = async (e, token) => {
    if (hashtag) {
      hashTagApi.gethashTags(e.target.value, token).then((data) => {
        if (data.length === 0) {
          setSearchResult([]);
          return setNewHashtag(e.target.value);
        }
        setSearchResult(data);
      });
    } else {
      setSearchResult(null);
      if (e.target.value.length > 0) {
        userApi
          .search(e.target.value, token)
          .then((data) => {
            setSearchResult(data);
          })
          .catch(() => {
            setSearchResult(null);
          });
      } else {
        setSearchResult(null);
      }
    }
  };

  const handleTags = async (event) => {
    try {
      let data = await userApi.search(event.target.value, accessToken);
      setTags(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLocation = async (event) => {
    const input = event.target.value;
    const backendURL = `http://localhost:5000/getlocation`;
    try {
      const { data } = await axios.get(backendURL, {
        params: { input },
      });
      SetLocation(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <Card
      sx={{
        width: "100%",
        height: { xs: "100vh", md: "fit-content" },
        paddingTop: { xs: "0", md: "1rem" },
        alignItems: "center",
        boxShadow: "none",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: { xs: "block", md: "flex" },
          justifyContent: "space-evenly",
          alignItems: "flex-start",
          height: { xs: "100%", md: "fit-content" },
          overflowY: { xs: "scroll", md: "unset" },
        }}
      >
        <CardMedia
          sx={{
            width: { xs: "100%", md: "23rem" },
            height: { xs: "fit-content", md: "100%" },
            display: "flex",
            alignItems: "center",
            margin: "auto",
            paddingRight: { xs: "0", md: "5px" },
          }}
        >
          {postData.files?.length > 0 && (
            <Carousel files={postData.files} width="100%" height="25rem" />
          )}
        </CardMedia>
        <CardContent
          sx={{
            width: { xs: "100%", md: "20rem" },
            padding: "0",
            marginX: { xs: "0", md: "1rem" },
            height: { xs: "fit-content", md: "25rem" },
            overflow: { xs: "unset", md: "scroll" },
            fontSize: "12px",
          }}
        >
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              paddingBottom: "0",
            }}
          >
            <Avatar src={avatar} />
            <Typography
              variant="caption"
              fontSize="14px"
              fontWeight="700"
              marginLeft="1rem"
            >
              {username}
            </Typography>
          </Box>
          <Box>
            <TextField
              placeholder="Write a caption ..."
              sx={{ height: "10rem" }}
              name="caption"
              multiline
              maxRows={4}
              defaultValue={postData?.caption}
              value={postData?.caption}
              onKeyDown={(event) => {
                event.key === "@"
                  ? handleMention(event)
                  : event.key === "#" && handleHashtag(event);
              }}
              onChange={handleChange}
              fullWidth
              focused
            />
            <IconButton
              onClick={() => setEmoji(!emoji)}
              disabled={postData?.caption ? false : true}
            >
              <SentimentSatisfiedAltOutlined fontSize="14px" />
            </IconButton>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={() => {
                setAnchorEl(null);
                setSearchResult(null);
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <input
                type="text"
                placeholder="Search"
                ref={search}
                onInput={(e) => {
                  handleSearch(e, accessToken);
                }}
                style={{
                  width: "100%",
                  backgroundColor: "whitesmoke",
                  padding: "1rem",
                  border: "none",
                }}
              />

              <List
                sx={{
                  width: "100%",
                  minWidth: 270,
                  backgroundColor: "whitesmoke",
                  height: "10rem",
                  overflowY: "scroll",
                  position: "relative",
                }}
              >
                {searchResult && (
                  <>
                    {searchResult.length > 0 ? (
                      searchResult.map((data, index) => {
                        return (
                          <ListItem
                            key={index}
                            onClick={() => {
                              if (hashtag) {
                                setPostData({
                                  ...postData,
                                  caption: `${postData.caption}#${data.tag}`,
                                  hashtags: [...postData.hashtags, data.tag],
                                });
                                setHashtag(false);
                              } else {
                                setPostData({
                                  ...postData,
                                  caption: `${postData.caption}@${data.username}`,
                                });
                              }
                              setAnchorEl(null);
                              setSearchResult(null);
                            }}
                            sx={{ cursor: "pointer" }}
                          >
                            {hashtag ? (
                              <>
                                <Typography
                                  sx={{
                                    fontSize: "12px",
                                    color: "#1976d2",
                                    marginLeft: "1rem",
                                    fontWeight: "bold",
                                  }}
                                >
                                  #{data.tag}
                                </Typography>
                                <Typography
                                  sx={{
                                    marginLeft: "auto",
                                    fontSize: "10px",
                                    color: "gray",
                                  }}
                                >
                                  {" "}
                                  {data?.posts?.length} posts
                                </Typography>
                              </>
                            ) : (
                              <>
                                <Avatar src={data.avatar} />
                                <Typography
                                  sx={{ fontSize: "12px", marginLeft: "1rem" }}
                                >
                                  {data.username}
                                </Typography>
                              </>
                            )}
                          </ListItem>
                        );
                      })
                    ) : (
                      <>
                        <ListItem
                          onClick={() => {
                            setPostData({
                              ...postData,
                              caption: `${postData.caption}#${newHashtag}`,
                              hashtags: [...postData.hashtags, newHashtag],
                            });
                            setHashtag(false);
                            setSearchResult(null);
                            setAnchorEl(null);
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "12px",
                              color: "#1976d2",
                              marginLeft: "1rem",
                              fontWeight: "bold",
                            }}
                          >
                            #{newHashtag}
                          </Typography>
                          <Typography
                            sx={{
                              marginLeft: "auto",
                              fontSize: "10px",
                              color: "gray",
                            }}
                          >
                            {" "}
                            0 posts
                          </Typography>
                        </ListItem>
                      </>
                    )}
                  </>
                )}
              </List>
            </Popover>
            {emoji && (
              <EmojiPicker
                width={{ xs: "100%", md: "350px" }}
                skinTonesDisabled="false"
                onEmojiClick={(e) => {
                  setPostData({
                    ...postData,
                    caption: postData?.caption + e.emoji,
                  });
                }}
              />
            )}
          </Box>
          <Box>
            <Autocomplete
              multiple
              id="tags-outlined"
              defaultValue={postData.tags}
              options={tags}
              onChange={(e, tags) => {
                setPostData({ ...postData, tags });
              }}
              getOptionLabel={(option) => option.username}
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Tags :"
                    onChange={handleTags}
                  />
                </>
              )}
            />
            <Autocomplete
              id="google-map-demo"
              filterOptions={(x) => x}
              options={location}
              autoComplete
              includeInputInList
              filterSelectedOptions
              value={value}
              getOptionLabel={(option) => option.structured_formatting.main_text}
              noOptionsText="No locations"
              componentName="location"
              onInputChange={handleLocation}
              onChange={(e, location) => {
                setPostData({ ...postData, location: location.place_id });
                setValue( location )
              }}
              renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Add a Location :"
                  />
              )}
              renderOption={(props, option) => {
                const matches =
                  option.structured_formatting.main_text_matched_substrings || [];
        
                const parts = parse(
                  option.structured_formatting.main_text,
                  matches.map((match) => [match.offset, match.offset + match.length]),
                );
        
                return (
                  <li {...props}>
                    <Grid container alignItems="center">
                      <Grid item sx={{ display: 'flex', width: 44 }}>
                        <LocationOn sx={{ color: 'text.secondary' }} />
                      </Grid>
                      <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                        {parts.map((part, index) => (
                          <Box
                            key={index}
                            component="span"
                            sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                          >
                            {part.text}
                          </Box>
                        ))}
                        <Typography variant="body2" color="text.secondary">
                          {option.structured_formatting.secondary_text}
                        </Typography>
                      </Grid>
                    </Grid>
                  </li>
                );
              }}
            />
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default PostForm;
