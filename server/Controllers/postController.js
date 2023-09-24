import { Posts } from "../Models/postModel.js";
import { Users } from "../Models/userModel.js";
import { Comments } from "../Models/commentModel.js";
import { hashtagController } from "./hashTagController.js";
import { Hashtags } from "../Models/hashTagModel.js";

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export const postCtrl = {
  createPost: async (req, res) => {
    try {
      const data = req.body;
      const newPost = new Posts({
        ...data,
        author: req.user._id,
      });
      await newPost.save();
      await data.hashtags.map(async (tag, index) => {
        await Hashtags.create({tag,posts:[newPost._id]})
      })
      await Users.updateOne({_id:req.user._id},{$set:{posts:newPost._id}})
      res.status(200).json({ msg: "Post Created!" });
    } catch (err) {
      console.log(err)
      return res.status(500).json({ msg: err.message });
    }
  },
  getPosts: async (req, res) => {
    try {
      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1 || 9;
      const skip = (page - 1) * limit;
      const posts = await Posts.find({
        author: [...req.user.following, req.user._id],
      })
        .skip(skip)
        .limit(limit)
        .populate("author");
      res.status(200).json({
        msg: "Success!",
        length: posts.length,
        posts,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updatePost: async (req, res) => {
    try {
      const data = req.body;

      const response = await Posts.updateOne({ _id: req.params.id }, data);
      if (response.modifiedCount == 1) {
        return res.status(200).json({ msg: "Post Updated!" });
      } else if (response.matchedCount == 0) {
        return res.status(400).json({ msg: "This post is not valid" });
      }
      return res.status(400).json({ msg: "Something went wrong" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  likePost: async (req, res) => {
    const id = req.params.id;
    const user_id = req.user?._id;
    const post = await Posts.findById(id);

    if (!post?.likes?.includes(user_id)) {
      likePost(id, user_id, res);
    } else {
      unLikePost(id, user_id, res);
    }
  },
  getUserPosts: async (req, res) => {
    try {
      const features = new APIfeatures(
        Posts.find({ user: req.params.id }),
        req.query
      ).paginating();
      const posts = await features.query.sort("-createdAt");

      res.json({
        posts,
        result: posts.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Posts.findById(req.params.id)
        .populate("author likes", "avatar username fullname followers")
        .populate({
          path: "comments",
          populate: {
            path: "author likes",
            select: "-password",
          },
        });

      if (!post)
        return res.status(400).json({ msg: "This post does not exist." });

      res.status(200).json({
        post,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getPostsDiscover: async (req, res) => {
    try {
      const newArr = [...req.user?.following, req.user?._id];
      const num = req.query.num || 9;

      const posts = await Posts.aggregate([
        { $match: { user: { $nin: newArr } } },
        { $sample: { size: Number(num) } },
      ]);

      return res.json({
        msg: "Success!",
        result: posts.length,
        posts,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Posts.findOneAndDelete({
        _id: id,
      });
      await Comments.deleteMany({ _id: { $in: post?.comments } });

      res.json({ msg: "Deleted Post!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  savePost: async (req, res) => {
    const user_id = req.user?._id;
    const { id } = req.params;
    const { saved } = await Users.findById(user_id).select("saved -_id");
    if (!saved.includes(id)) {
      // post adding to saved Posts
      try {
        await Users.findByIdAndUpdate(user_id, {
          $push: {
            saved: id,
          },
        }).then(() => {
          return res
            .status(200)
            .json({ msg: "this post added to saved Posts" });
        });
      } catch (error) {
        return res.status(500).json(error);
      }
    } else {
      try {
        //post removing from saved Posts
        await Users.findByIdAndUpdate(user_id, {
          $pull: {
            saved: id,
          },
        }).then(() => {
          return res
            .status(200)
            .json({ msg: "this post removed from saved Posts" });
        });
      } catch (error) {
        return res.status(500).json(error);
      }
    }
  },
  getSavePosts: async (req, res) => {
    try {
      const features = new APIfeatures(
        Posts.find({
          _id: { $in: req.user.saved },
        }),
        req.query
      ).paginating();

      const savePosts = await features.query.sort("-createdAt");

      res.json({
        savePosts,
        result: savePosts.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const likePost = async (id, user_id, res) => {
  try {
    await Posts.findByIdAndUpdate(id, {
      $push: {
        likes: user_id,
      },
    });
    // .then(async () => {
    // const post = await Posts.findOne({ _id: id }).select("author -_id");
    // const username = await Users.findOne({ _id: user_id }).select("username -_id");
    // if (post.author === user_id) {
    //   return;
    // } else {
    //   await Users.findByIdAndUpdate(post[0].author, {
    //     $push: {
    //       notifications: {
    //         action: "liked",
    //         user_id: user_id,
    //         likedBy: username[0].username,
    //         post_id: id,
    //         time: Date.now(),
    //       },
    //     },
    //   });
    // }
    //       })
    //       .then(() => {
    //         return res.status(200).json({ msg: "liked" });
    //       });
    return res.status(200).json({ msg: "liked" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const unLikePost = async (id, user_id, res) => {
  try {
    await Posts.findByIdAndUpdate(id, {
      $pull: {
        likes: user_id,
      },
    }).then(() => {
      return res.status(200).json({ msg: "disliked" });
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
