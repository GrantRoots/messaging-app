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

module.exports = {
  getUserChatrooms,
};
