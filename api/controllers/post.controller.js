import Post from "../models/post.model.js";

const create = async (req, res, next) => {


  if (!req.user.isAdmin) {

    return res.status(403).json({

      message: "You are not allowed to create a post",

    });
  }

  if (!req.body.title || !req.body.content) {

    return res.status(400).json({

      message: "Please fill all the fields",
      
    });
  }

  try {
    const slug = req.body.title
      .replace(/[^\w\s]+/gi, "-")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .toLowerCase();

    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      slug: slug,
      image: req.body.image,
      userId: req.user.id,
      category: req.body.category,
    });

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (err) {
    next(err);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const start = parseInt(req.query.start) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const order = req.query.order === "asc" ? 1 : -1;

    const filter = {};

    if (req.query.userId) {
      filter.userId = req.query.userId;
    }

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.slug) {
      filter.slug = req.query.slug;
    }

    if (req.query.postId) {
      filter._id = req.query.postId;
    }

    if (req.query.searchTerm) {
      filter.$or = [
        { title: { $regex: req.query.searchTerm, $options: "i" } },
        { content: { $regex: req.query.searchTerm, $options: "i" } },
      ];
    }

    const posts = await Post.find(filter)
      .sort({ updatedAt: order })
      .skip(start)
      .limit(limit);

    const total = await Post.countDocuments();

    const n = new Date();
    const countlastmonth = await Post.countDocuments({
      createdAt: {
        $gte: new Date(n.getFullYear(), n.getMonth() - 1, n.getDate()),
      },
    });

    res.status(200).json({
      posts,
      total,
      countlastmonth,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  console.log(" s" + req.params.postId);
  console.log(req.params.userId);
  console.log(req.user.id);
  console.log(req.user.isAdmin);
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return res.status(403).json({
      message: "You are not allowed to delete this post",
    });
  }

  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
const updatePost = async( req , res, next)=> {
  console.log(" s" + req.params.postId);
  console.log(req.params.userId);
  console.log(req.user.id);
  console.log(req.user.isAdmin);
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return res.status(403).json({
      message: "You are not allowed to update this post",
    });
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.postId, {$set: {
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
      category: req.body.category,
    }}, {new:true});
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
}

export { create, getPosts, deletePost, updatePost };
