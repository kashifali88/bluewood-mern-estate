import Post from '../models/postModel.js'
import SavedPost from "../models/savedPostModel.js";
import jwt from "jsonwebtoken";
import PostDetail from '../models/postDetailsModel.js'

export const getPosts = async (req, res,next) => {
  const query = req.query;

  try {
    // Build dynamic query
    const filter = {};
    if (query.city) filter.city = query.city;
    if (query.type) filter.type = query.type;
    if (query.property) filter.property = query.property;
    if (query.bedroom) filter.bedroom = parseInt(query.bedroom);
    if (query.minPrice || query.maxPrice) {
      filter.price = {};
      if (query.minPrice) filter.price.$gte = parseInt(query.minPrice);
      if (query.maxPrice) filter.price.$lte = parseInt(query.maxPrice);
    }

    const posts = await Post.find(filter);
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};


export const getPost = async (req, res, next) => {
  const id = req.params.id;

  try {
    // Fetch the post with populated details
    const post = await Post.findById(id)
      .populate("postDetail")
      .populate("user", "username avatar");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const token = req.cookies?.token;

    if (!token) {
      // If no token, return post with isSaved: false
      return res.status(200).json({ ...post.toObject(), isSaved: false });
    }

    // Verify JWT and check if the post is saved by user
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
      if (err) {
        // Token invalid or expired → still return post, not an auth error
        return res.status(200).json({ ...post.toObject(), isSaved: false });
      }

      const saved = await SavedPost.findOne({
        postId: id,
        userId: payload.id,
      });

      res.status(200).json({ ...post.toObject(), isSaved: !!saved });
    });

  } catch (err) {
    next(err);
  }
};



export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    // 1️⃣ Create Post first
    const newPost = new Post({
      ...body.postData,
      user: tokenUserId,
    });
    await newPost.save();

    // 2️⃣ Create PostDetail and link it to Post
    const newPostDetail = new PostDetail({
      ...body.postDetail,
      postId: newPost._id,
    });
    await newPostDetail.save();

    // 3️⃣ Link PostDetail ObjectId to Post
    newPost.postDetail = newPostDetail._id;
    await newPost.save();

    res.status(200).json({
      message: "Post created successfully!",
      post: newPost,
      postDetail: newPostDetail,
    });
  } catch (err) {
    console.error("Error while creating post:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};


export const updatePost = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    Object.assign(post, body.postData);
    if (body.postDetail) {
      post.postDetail = body.postDetail;
    }

    await post.save();

    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await Post.findByIdAndDelete(id);

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    next(err);
  }
};
