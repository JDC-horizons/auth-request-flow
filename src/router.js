const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const mockUser = {
  username: "authguy",
  password: "mypassword",
  profile: {
    firstName: "Chris",
    lastName: "Wolstenholme",
    age: 43,
  },
};

// let token = "";

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === mockUser.username && password === mockUser.password) {
    let token = jwt.sign({ username: mockUser.username }, "super_duper_secret");
    res.json({ token: token });
  } else {
    res.json({ error: "Credentials invalid" });
  }
});

router.get("/profile", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "super_duper_secret");

    res.json({ user: mockUser });
  } catch (err) {
    return res.status(401).json({ error: "Not authorised " });
  }
});

module.exports = router;
