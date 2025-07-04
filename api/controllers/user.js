const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../queries/user");
const dbChatroomQueries = require("../queries/chatrooms");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const validateUser = [
  body("username").trim().notEmpty().escape(),
  body("password").trim().notEmpty(),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .custom((value, { req }) => {
      if (value === req.body.password) {
        return true;
      }
      throw new Error("Passwords do not match");
    }),
  body("firstName").trim().notEmpty().isAlpha().escape(),
  body("lastName").trim().notEmpty().isAlpha().escape(),
];

const signUp = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors);
      return res
        .status(400)
        .json({ error: "Sign Up failed", details: errors.array() });
    }
    try {
      await db.signUp(
        req.body.username,
        await bcrypt.hash(req.body.password, 10),
        req.body.firstName,
        req.body.lastName
      );
      const user = await db.getUser(req.body.username);
      await dbChatroomQueries.createRoom(
        1,
        user.id,
        "Hello, welcome to my messaging app! Send me a message! :)"
      );
      res.status(201).end();
    } catch (error) {
      next(error);
    }
  },
];

function logIn(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    jwt.sign(
      { sub: user.id },
      process.env.JWT_SECRET,
      // 1 week
      { expiresIn: "168h" },
      (err, token) => {
        if (err) {
          return next(err);
        }
        res.json({ token, userId: user.id, username: user.username });
      }
    );
  })(req, res, next);
}

const validateUsername = [body("newUsername").trim().notEmpty().escape()];

const updateProfile = [
  validateUsername,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors);
      return res
        .status(400)
        .json({ error: "Sign Up failed", details: errors.array() });
    }
    try {
      await db.updateProfile(req.body.newUsername, req.body.oldUsername);
      return res.json({
        success: true,
        message: "Updated Profile",
      });
    } catch (error) {
      next(error);
    }
  },
];

module.exports = {
  signUp,
  logIn,
  updateProfile,
};
