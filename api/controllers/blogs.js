const { body, validationResult } = require("express-validator");
const db = require("../queries/blogs");

const validateBlog = [body("title").trim().notEmpty(), body("text").trim()];

const createBlog = [
  validateBlog,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors);
      return res
        .status(400)
        .json({ error: "Creation failed", details: errors.array() });
    }
    try {
      await db.createBlog(req.body.title, req.body.text, req.user.id);
      res.status(201).json({ message: "Blog created" });
    } catch (error) {
      next(error);
    }
  },
];

async function getAllBlogs(req, res, next) {
  try {
    const blogs = await db.getAllBlogs();
    res.json(blogs);
  } catch (error) {
    next(error);
  }
}

async function getBlog(req, res, next) {
  try {
    const blog = await db.getBlog(req.params.blogId);
    res.json(blog);
  } catch (error) {
    next(error);
  }
}

const updateBlog = [
  validateBlog,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors);
      return res
        .status(400)
        .json({ error: "Update failed", details: errors.array() });
    }
    try {
      await db.updateBlog(req.params.blogid, req.body.title, req.body.text);
      res.status(201).json({ message: "Blog updated" });
    } catch (error) {
      next(error);
    }
  },
];

async function deleteBlog(req, res, next) {
  try {
    await db.deleteBlog(req.params.blogid);
    res.status(201).json({ message: "Blog deleted" });
  } catch (error) {
    next(error);
  }
}

async function handlePublish(req, res, next) {
  if (req.query.published === "false") {
    try {
      await db.publishBlog(req.params.blogid);
      res.status(201).json({ message: "Blog published" });
    } catch (error) {
      next(error);
    }
  } else {
    try {
      await db.unpublishBlog(req.params.blogid);
      res.status(201).json({ message: "Blog unpublished" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  handlePublish,
};
