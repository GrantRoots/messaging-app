const prisma = require("../prisma");

async function signUp(username, hashedPassword, firstName, lastName, author) {
  await prisma.user.create({
    data: {
      username: username,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      author: author,
    },
  });
}

module.exports = { signUp };
