const bcrypt = require("bcrypt");
const router = require("express").Router();
const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const request = require("request");
const ejs = require("ejs");
const path = require("path");
const verifyToken = require("../auth/authVerify");

router.post("/register", async (req, res) => {
  const userPayload = req.body;
  try {
    const userAlreadyPresent = await User.findOne({
      $or: [
        {username: userPayload.username},
        {email: userPayload.email},
      ]
    });
    console.log("userAlreadyPresent", userAlreadyPresent);
    if (userAlreadyPresent) {
      res.status(409).json({ message: "username or email already exists" });
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

// route to ger user details,
router.get("/user", verifyToken, async (req, res) => {
  const id = req.user.userId;
  try {
    const user = await User.findOne(
      { _id: id },
      { _id: 0, password: 0, __v: 0 }
    );
    console.log("user found::", user);
    if (user === null) {
      res.status(404).json({ message: "user doesnot exists" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).send("server error");
  }
});

/**route to update user details,
/* the payload should contain only those fields which user wants to update*/
/* at one time only password can be updated or other fields can be updated*/
router.put("/user/edit", verifyToken, async (req, res) => {
  const userData = req.body;
  const userId = req.user.userId;
  try {

    const dbUser = await User.findOne({
      $or: [
        {email: userData.email},
        {mobile: userData.mobile}
      ]
    });
    if(dbUser && userId !== dbUser._id.toString()) {
      return res.status(409).json({ message: "email or mobile already taken" });
    }
    const user = await User.findOneAndUpdate({ _id: userId }, userData, {
      returnDocument: "after",
      projection: { _id: 0, password: 0, username: 0, __v: 0 },
    });
    console.log("user found::", user);
    return res.json(user);
  } catch (error) {
    console.log("error editing user::", error);
    res.status(500).send("server error");
  }
});

router.get("/all/users", verifyToken, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/user/reset", async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send("email not present");
    }
    console.log("email to::", user.email);
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: process.env.MAIL_SERVICE_USER,
        pass: process.env.MAIL_SERVICE_PASSWORD,
      },
    });

    request(
      process.env.HOST + "/api/auth/get-reset-password-email-template",
      {
        method: "POST",
        json: true,
        body: {
          user: user.username,
          link: process.env.ORIGIN + "/reset-password?user=" + user._id,
        },
      },
      async (error, response, body) => {
        if (error) {
          console.error(error);
          res.status(500).send("Internal Server Error");
        } else {
          const info = await transporter.sendMail({
            from: '"Swiftcart 👻" <no-reply@swiftcart.com>', // sender address
            to: user.email, // comma separated list of receivers
            subject: "Password Reset Request for Your Account at Swiftcart.com", // Subject line
            text: "Hello world?", // plain text body
            html: body, // html body
          });
          res.status(200).json({ message: "mail sent successfully" });
        }
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/get-reset-password-email-template", (req, res) => {
  const payload = req.body;
  const user = payload.user;
  const resetLink = payload.link;
  const expirationTime = "24 hours";

  // Render the email template
  ejs.renderFile(
    path.join(__dirname, "..", "views", "resetpasswordtemplate.ejs"),
    { user, resetLink, expirationTime },
    (err, html) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.send(html);
      }
    }
  );
});

router.post("/user/status", async (req, res) => {
  const payload = req.body;
  try {
    const user = await User.findOne({ _id: payload.id });
    console.log("sss", user);
    if (user) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/reset/password", async (req, res)=>{
  const userData = req.body;
  try {
    if (userData && userData.hasOwnProperty("password")) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      const user = await User.updateOne(
        { _id: userData.id },
        { $set: { password: hashedPassword } },
        { new: true }
      );
  
      if (user) {
        console.log("User found and updated:", user);
        return res.json({ message: "Password updated successfully" });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } else {
      return res.status(400).json({ message: "Invalid request" });
    }
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
})

module.exports = router;
