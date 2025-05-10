const chatroomsRouter = require("express").Router();
const chatroomsController = require("../controllers/chatrooms");
const passport = require("passport");

chatroomsRouter.get("/", chatroomsController.showChatrooms);
chatroomsRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  chatroomsController.createRoom
);
// chatroomsRouter.get(
//   "/:roomId",
//   passport.authenticate("jwt", { session: false }),
//   chatroomsController.getRoom
// );

module.exports = chatroomsRouter;
