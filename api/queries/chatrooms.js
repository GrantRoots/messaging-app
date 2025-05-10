const prisma = require("../prisma");

async function getUserChatrooms(id) {
  try {
    return await prisma.user.findMany({
      where: {
        id: parseInt(id),
      },
      include: {
        chatrooms: {
          include: {
            users: true,
          },
        },
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
        connect: [{ id: parseInt(senderId) }, { id: parseInt(recipientId) }],
      },
    },
  });
}

module.exports = {
  getUserChatrooms,
  findUserId,
  createRoom,
};
