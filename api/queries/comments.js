const prisma = require("../prisma");

async function createComment(blogId, text, userId) {
  try {
    await prisma.comment.create({
      data: {
        text: text,
        blogId: parseInt(blogId),
        authorId: parseInt(userId),
      },
    });
  } catch (error) {
    throw error;
  }
}

async function getAllComments(blogId) {
  try {
    return await prisma.comment.findMany({
      where: {
        blogId: parseInt(blogId),
      },
    });
  } catch (error) {
    throw error;
  }
}

async function getComment(id) {
  try {
    return await prisma.comment.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  } catch (error) {
    throw error;
  }
}

async function updateComment(id, text) {
  try {
    await prisma.comment.update({
      where: {
        id: parseInt(id),
      },
      data: {
        text: text,
      },
    });
  } catch (error) {
    throw error;
  }
}

async function deleteComment(id) {
  try {
    await prisma.comment.delete({
      where: {
        id: parseInt(id),
      },
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createComment,
  getAllComments,
  getComment,
  updateComment,
  deleteComment,
};
