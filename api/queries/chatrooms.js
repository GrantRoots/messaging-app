const prisma = require("../prisma");

async function getUserChatrooms(id) {
  try {
    return await prisma.user.findMany({
      where: {
        id: id,
      },
    });
  } catch (error) {
    throw error;
  }
}

async function findUserId(username) {
  try {
    return await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  } catch (error) {
    throw error;
  }
}

async function createRoom(senderId, recipientId) {
  await prisma.chatroom.create({
    data: {
      users: {
        connect: [{ id: senderId }, { id: recipientId }],
      },
    },
  });
}

module.exports = {
  getUserChatrooms,
  findUserId,
  createRoom,
};
