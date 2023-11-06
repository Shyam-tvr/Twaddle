import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import {
  Avatar,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { userApi } from "../../../API/User";

const Search = ({search}) => {
  const navigate = useNavigate()
  const token = useSelector((state) => state.user.accessToken);
  const [searchResult, setSearchResult] = useState([]);
  const handleInput = async (e) => {
    try {
      const users = await userApi.search(e.target.value, token);
      if (users) {
        setSearchResult(users);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = (user) => {
    navigate(`/user/${user._id}`)
    setSearchResult([])
    search(false)
  }
  return (
    <>
      <TextField placeholder="Search" fullWidth onChange={handleInput} />
      <List>
        {searchResult.map((user, index) => {
          return (
            <>
              <ListItem key={index} sx={{paddingX:1, cursor:"pointer"}} onClick={()=>handleClick(user)}>
                <Avatar src={user.avatar} />
                <Typography sx={{ cursor: "default", marginLeft:"1rem" }}>{user.username}</Typography>
              </ListItem>
            </>
          );
        })}
      </List>
    </>
  );
};

export default Search;
