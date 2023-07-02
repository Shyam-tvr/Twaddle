import { Comments } from "../Models/commentModel.js";
import { Posts } from "../Models/postModel.js";

export const commentCtrl = {
  createComment: async (req, res) => {
    try {
      const data = req.body;
      const posts = await Posts.findById(data.post);
      if (!posts)
        return res.status(400).json({ msg: "This post does not exist." });
      const { _id, post } = await Comments.create({
        ...data,
        author: posts.author,
        user: req.user?._id,
      });
      await Posts.findByIdAndUpdate(post, {
        $push: {
          comments: _id,
        },
      });
      return res.status(200).json({ msg: "comment added" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateComment: async (req, res) => {
    try {
      const { content } = req.body;

      await Comments.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { content }
      );

      res.json({ msg: "Message Updated Successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  likeComment: async (req, res) => {
    try {
      const user  = req.user._id;
      const comment = req.params.id;
      const { likes } = await Comments.findOne({ _id: comment }).select(
        "likes -_id"
        );
        if (likes?.includes(user)) {
        unlikeComment(comment, user, res);
      } else {
        likeComment(comment, user, res);
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteComment: async (req, res) => {
    try {
      const { id } = req.params;
      const comment = await Comments.findOneAndDelete({
        _id: id,
        $or: [{ user: req.user._id }, { author: req.user._id }],
      });

      await Posts.findOneAndUpdate(
        { _id: comment.post },
        {
          $pull: { comments: id },
        }
      );
      const { replies, _id } = await Comments.findOne({
        replies: `${id}`,
      }).select("replies");
      if (replies?.includes(id)) {
        await Comments.findByIdAndUpdate(_id, {
          $pull: { replies: id },
        });
      }
      res.json({ msg: "Deleted Comment!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  replyComment: async (req, res) => {
    try {
      const { comment, content } = req.body;
      const commentExist = await Comments.findById(comment);
      if (!commentExist)
        return res.status(400).json({ msg: "This Comment does not exist." });
      const { _id } = await Comments.create({ content, user: req.user._id });
      await Comments.findByIdAndUpdate(comment, {
        $push: {
          replies: _id,
        },
      });
      return res.status(200).json({ msg: "comment added" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const likeComment = async (comment, user, res) => {
  try {
    await Comments.findOneAndUpdate(
      { _id: comment },
      {
        $push: { likes: user },
      },
      { new: true }
    );
    res.json({ msg: "Liked Comment!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const unlikeComment = async (comment, user, res) => {
  try {
    await Comments.findOneAndUpdate(
      { _id: comment },
      {
        $pull: { likes: user },
      },
      { new: true }
    );
    res.json({ msg: "UnLiked Comment!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
