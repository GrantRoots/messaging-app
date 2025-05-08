const { body, validationResult } = require("express-validator");
const db = require("../queries/comments");

const validateComment = [body("text").trim().notEmpty().escape()];

const createComment = [
  validateComment,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors);
      return res
        .status(400)
        .json({ error: "Create failed", details: errors.array() });
    }
    try {
      await db.createComment(
        req.params.blogid,
        req.body.text,
        req.query.userid
      );
      res.status(201).json({ message: "Comment created" });
    } catch (error) {
      next(error);
    }
  },
];

async function getAllComments(req, res, next) {
  try {
    const comments = await db.getAllComments(req.params.blogid);
    res.json(comments);
  } catch (error) {
    next(error);
  }
}

async function getComment(req, res, next) {
  try {
    const comment = await db.getComment(req.params.commentId);
    res.json(comment);
  } catch (error) {
    next(error);
  }
}

const updateComment = [
  validateComment,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors);
      return res
        .status(400)
        .json({ error: "Update failed", details: errors.array() });
    }
    try {
      await db.updateComment(req.params.commentid, req.body.text);
      res.status(201).json({ message: "Comment updated" });
    } catch (error) {
      next(error);
    }
  },
];

async function deleteComment(req, res, next) {
  try {
    await db.deleteComment(req.params.commentid);
    res.status(201).json({ message: "Comment deleted" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createComment,
  getAllComments,
  getComment,
  updateComment,
  deleteComment,
};
