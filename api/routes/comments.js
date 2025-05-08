const commentsRouter = require("express").Router({ mergeParams: true });
const commentsController = require("../controllers/comments");
const passport = require("passport");

commentsRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  commentsController.createComment
);
commentsRouter.get("/", commentsController.getAllComments);
commentsRouter.get("/:commentid", commentsController.getComment);
commentsRouter.put(
  "/:commentid",
  passport.authenticate("jwt", { session: false }),
  commentsController.updateComment
);
commentsRouter.delete(
  "/:commentid",
  passport.authenticate("jwt", { session: false }),
  commentsController.deleteComment
);

module.exports = commentsRouter;
