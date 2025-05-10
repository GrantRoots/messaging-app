const db = require("../queries/chatrooms");

async function showChatrooms(req, res, next) {
  try {
    const data = await db.getUserChatrooms(req.body.userId);
    res.json(data[0].chatrooms);
  } catch (error) {
    next(error);
  }
}

async function createRoom(req, res, next) {
  try {
    const recipient = await db.findUserId(req.body.reciepientUsername);
    if (!recipient) {
      res.json({
        success: false,
        message: "User doesn't exist",
      });
    }
    const recipientId = recipient.id;
    const sendersRooms = await db.getUserChatrooms(req.body.userId);
    const exists = sendersRooms[0].chatrooms.some((room) =>
      room.users.some((user) => user.id === recipientId)
    );
    if (exists) {
      res.json({
        success: false,
        message: "Room already exists",
      });
    }

    await db.createRoom(req.body.userId, recipientId);
    res.json({
      success: true,
      message: "Room created",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  showChatrooms,
  createRoom,
};
