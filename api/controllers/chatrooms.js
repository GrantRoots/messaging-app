const db = require("../queries/chatrooms");

async function showUsersChatrooms(req, res, next) {
  try {
    const data = await db.getUserChatrooms(req.body.id);
    res.json(data.chatrooms);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  showUsersChatrooms,
};
