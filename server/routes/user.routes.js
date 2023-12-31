const express = require("express");
const { sendEmail, mail } = require("../controllers/sendMessage");
const { createUser, login, getUserSpaces, getInfoUser, getUsers, patchUser } = require("../controllers/user.controllers");
const { auth } = require("../middleWare/auth");


const router = express.Router();


router.post("/createUser", createUser);
router.post("/login", login);
router.get("/getAllUsers", getUsers);
router.get("/getUserSpaces/",auth(), getUserSpaces);
router.get("/getInfoUser/:id", getInfoUser);
router.patch("/editUser/:idEdit", auth(), patchUser);

// router.post("/sendEmail", mail);

module.exports=router;