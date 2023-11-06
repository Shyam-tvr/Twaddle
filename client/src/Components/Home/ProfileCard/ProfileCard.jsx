import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileCard = () => {
  const user = useSelector((state) => state.user?.user);
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/user/${user._id}`);
  };

  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardActionArea>
        <img
          src={user?.avatar}
          alt=""
          style={{
            height: "5rem",
            width: "5rem",
            borderRadius: "50%",
            border: "2px solid white",
            position: "absolute",
            top: "25%",
            left: "0.5rem",
            objectFit: "cover",
          }}
        />
        <CardMedia
          component="img"
          height="120"
          image={user.coverPicture}
          alt="green iguana"
        />
        <CardContent>
          <Typography
            key="1"
            gutterBottom
            variant="h5"
            component="div"
            sx={{ marginTop: "1rem", marginBottom: "0" }}
          >
            {user.fullName}
          </Typography>
          <Typography
            key="2"
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "10px" }}
          >
            {user.username}
          </Typography>
          <Typography
            key="3"
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "10px", marginTop: "0.5rem" }}
          >
            {`${user.posts ? user.posts.length : "0"} Posts | ${
              user.following ? user.following.length : "0"
            } Following | ${
              user.followers ? user.followers.length : "0"
            } Followers`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <div>
        <Button
          variant="outlined"
          style={{ fontSize: "0.65rem", marginBottom: "1rem", marginLeft:"1rem" }}
          onClick={handleViewProfile}
        >
          View Profile
        </Button>
      </div>
    </Card>
  );
};

export default ProfileCard;
