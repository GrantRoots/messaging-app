const prisma = require("./prisma");
const bcrypt = require("bcryptjs");

async function seedUser() {
  const users = [
    {
      username: "GrantRoots",
      password: await bcrypt.hash("password", 10),
      firstName: "Grant",
      lastName: "Roots",
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: {
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  }
}

seedUser();
