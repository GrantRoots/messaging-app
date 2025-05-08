const prisma = require("../prisma");

async function createBlog(title, text, id) {
  try {
    await prisma.blog.create({
      data: {
        title: title,
        text: text,
        authorId: id,
      },
    });
  } catch (error) {
    throw error;
  }
}

async function getAllBlogs() {
  try {
    return await prisma.blog.findMany({
      include: {
        comments: true,
      },
    });
  } catch (error) {
    throw error;
  }
}

async function getBlog(id) {
  try {
    return await prisma.blog.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  } catch (error) {
    throw error;
  }
}

async function updateBlog(id, title, text) {
  try {
    await prisma.blog.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: title,
        text: text,
      },
    });
  } catch (error) {
    throw error;
  }
}

async function deleteBlog(id) {
  try {
    await prisma.blog.delete({
      where: {
        id: parseInt(id),
      },
    });
  } catch (error) {
    throw error;
  }
}

async function publishBlog(id) {
  try {
    await prisma.blog.update({
      where: {
        id: parseInt(id),
      },
      data: {
        published: true,
      },
    });
  } catch (error) {
    throw error;
  }
}

async function unpublishBlog(id) {
  try {
    await prisma.blog.update({
      where: {
        id: parseInt(id),
      },
      data: {
        published: false,
      },
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  publishBlog,
  unpublishBlog,
};
