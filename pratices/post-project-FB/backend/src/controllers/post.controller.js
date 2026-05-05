const postModel = require("../models/post.model");
const uploadImageKit = require("../services/stronge.service");

const createPostController = async (req, res) => {
  let url = await uploadImageKit(req.file.buffer);

  let post = await postModel.create({
    image: url,
    caption: req.body.caption,
  });

  res.status(201).json({
    message: "Post Created",
    post: post,
  });
};

const getPostController = async (req, res) => {
    let posts = await postModel.find();

    res.status(200).json({
        message : 'Fetch all posts succesfully',
        posts
    })
}

module.exports = {
  createPostController,
  getPostController
};
