import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Collapse,
  Typography,
  IconButton,
  CardActions,
  Avatar
} from "@mui/material";
import {
  Favorite,
  Bookmark,
  Comment,
  MoreVert,
  NearMe,
} from "@mui/icons-material";
import "./Posts.css";
import moment from "moment";
import Actions from "./Actions";
import Comments from "./comment";
import Carousel from "../../../Utils/Carousel";

export default function Post({ post }) {
  console.log("post")
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [like, setlike] = useState(post.likes ? post?.likes?.length : 0);
  const [readMore, setReadmore] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(
    post?.likes?.includes(user._id) ? true : false
  );
  const [bookmarked, setBookmarked] = useState(
    user?.bookmarks?.includes(post._id) ? true : false
  );

  const [open, setOpen] = useState(false);
  
  const handleClose = ()=> {
    setOpen(false)
  }

  const handlebookmarks = () => {
    // userApi.bookmark(post._id, user._id);
    setBookmarked(!bookmarked);
  };

  const handleLike = () => {
    // postApi.likePost(user._id, post._id).then(() => {
    //   setlike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
    // });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: "100%", marginY: "1rem" }}>
      <CardHeader
        avatar={<Avatar src={post?.author?.avatar} />}
        action={
          <IconButton
            onClick={()=>setOpen(true)}
          >
            <MoreVert />
          </IconButton>
        }
        title={
          <Typography
            variant="body2"
            onClick={() => navigate(`/${post?.author?._id}`)}
          >
            {post?.author?.username}
          </Typography>
        }
        
        subheader={moment(post.createdAt).fromNow()}
        subheaderTypographyProps={{ fontSize: "10px" }}
      />
      
        { open && <Actions handleClose={handleClose} id={post._id} author={post.author._id} />}

      <CardMedia sx={{width:"100%"}}>
        <Carousel files={post.files} width="100%" height="20rem"/>
      </CardMedia>

      <CardContent sx={{ padding: "1rem" }}>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ fontSize: "10px", maxLines: 1 }}
        >
          <span
            style={{ fontSize: "12px", fontWeight: 800, marginRight: "0.5rem" }}
          >
            {post?.author?.username}
          </span>
          <span>
            {post.caption?.length < 60
              ? post.caption
              : readMore
              ? post.caption + " "
              : post.caption?.slice(0, 60) + "..."}
          </span>
          {post.caption?.length > 60 && (
            <span className="readMore" onClick={() => setReadmore(!readMore)}>
              {readMore ? "Hide content" : "Read more"}
            </span>
          )}
        </Typography>
      </CardContent>
      <Typography fontSize="12px" marginLeft="1rem">
        {like} likes
      </Typography>
      <CardActions
        sx={{ padding: "0 1rem", marginBottom: ".5rem" }}
        disableSpacing
      >
        <IconButton aria-label="add to favorites" onClick={handleLike}>
          {isLiked ? <Favorite sx={{ color: "black" }} /> : <Favorite />}
        </IconButton>
        <Comment
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          sx={{ color: "text.secondary" }}
        />
        <IconButton aria-label="share post" onClick={handleLike}>
          <NearMe />
        </IconButton>
        <IconButton
          aria-label="share"
          onClick={handlebookmarks}
          sx={{ marginLeft: "auto" }}
        >
          {bookmarked ? <Bookmark sx={{ color: "black" }} /> : <Bookmark />}
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Comments post_id={post._id} />
      </Collapse>
    </Card>
  );
}
