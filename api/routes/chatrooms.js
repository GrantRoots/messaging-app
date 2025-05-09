const chatroomsRouter = require("express").Router();
const chatroomsController = require("../controllers/chatrooms");

//authorize users
chatroomsRouter.get("/", chatroomsController.showUsersChatrooms);
//make new chatroom

module.exports = chatroomsRouter;
