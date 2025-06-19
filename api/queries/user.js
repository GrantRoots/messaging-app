const prisma = require("../prisma");

async function signUp(username, hashedPassword, firstName, lastName) {
  await prisma.user.create({
    data: {
      username: username,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    },
  });
}

async function updateProfile(newUsername, oldUsername) {
  await prisma.user.update({
    where: {
      username: oldUsername,
    },
    data: {
      username: newUsername,
    },
  });
}

async function getUser(username) {
  const user = await prisma.user.findUnique({
    where: { username },
  });
  return user;
}

module.exports = { signUp, updateProfile, getUser };
