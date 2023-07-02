import express from "express";
const router = express.Router();
import { postCtrl } from "../Controllers/postController.js";
import { auth } from "../Middlewares/auth.js";

router.route("/").post(auth, postCtrl.createPost).get(auth, postCtrl.getPosts);

router
  .route("/:id")
  .patch(auth, postCtrl.updatePost)
  .get(auth, postCtrl.getPost)
  .delete(auth, postCtrl.deletePost);

router.patch("/:id/like", auth, postCtrl.likePost);

router.get("/user_posts/:id", auth, postCtrl.getUserPosts);

router.get("/post/discover", auth, postCtrl.getPostsDiscover);

router.patch("/savePost/:id", auth, postCtrl.savePost);

router.get("/getSavePosts", auth, postCtrl.getSavePosts);

export default router;
