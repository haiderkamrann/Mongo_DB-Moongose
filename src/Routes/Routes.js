// Routes.js

const express = require("express");
const router = express.Router();
const controller = require("../Controllers/Controllers.js");

router.post("/users", controller.createUser);
router.get("/users", controller.getUsers);
router.get("/users/:id", controller.getUserById);
router.put("/users/:id", controller.updateUser);
router.delete("/users/:id", controller.deleteUser);

module.exports = router;
