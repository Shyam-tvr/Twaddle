import { Hashtags } from "../Models/hashTagModel.js";

export const hashtagController = {
  getHashtags: async (req, res) => {
    try {
      const { value } = req.query;
      const hashtags = await Hashtags.find({ tag: { $regex: value } }).limit(10);
        return res.status(200).json(hashtags);
    } catch (error) {
        return res.status(500).json({ error: "ServerError", msg: err.message });
    }
  },
  addHashtag: async (req,res) => {
    try {
        const { tag } = req.body
        await Hashtags.create({tag})
        res.status(200).json({msg:"success",tag})
    } catch (error) {
        return res.status(500).json({ error: "ServerError", msg: err.message });
    }
  }
};
