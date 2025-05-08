const blogsRouter = require("express").Router();
const blogsController = require("../controllers/blogs");
const { blog } = require("../prisma");
const commentsRouter = require("./comments");
const passport = require("passport");

blogsRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  blogsController.createBlog
);
blogsRouter.get("/", blogsController.getAllBlogs);
blogsRouter.get("/:blogid", blogsController.getBlog);
blogsRouter.put(
  "/:blogid",
  passport.authenticate("jwt", { session: false }),
  blogsController.updateBlog
);
blogsRouter.delete(
  "/:blogid",
  passport.authenticate("jwt", { session: false }),
  blogsController.deleteBlog
);
blogsRouter.put(
  "/:blogid/publish",
  passport.authenticate("jwt", { session: false }),
  blogsController.handlePublish
);

blogsRouter.use("/:blogid/comments", commentsRouter);

module.exports = blogsRouter;
