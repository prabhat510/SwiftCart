const bcrypt = require("bcrypt");
const router = require("express").Router();
const User  = require("../models/userModel");

router.post("/register", async (req, res) => {
  const userPayload = req.body;
  try {
    const userAlreadyPresent = await User.findOne({
      username: userPayload.username,
    });
    console.log('userAlreadyPresent', userAlreadyPresent);
    if (userAlreadyPresent) {
      res.json({ status: 409, message: "username already exists" });
    } else {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userPayload.password, salt);
        userPayload["password"] = hashedPassword;
        const user = await User.create(userPayload);
        res.status(201).json(user);
    }
  } catch (error) {
    res.status(500).send("server error");
  }
});

router.get("/all/users", async (req, res)=>{
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).send();
    }
})

module.exports = router;
