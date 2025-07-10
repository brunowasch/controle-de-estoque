const express = require("express");
const userController = require("../controllers/userController");
const { authenticateToken, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/getUsers", authenticateToken, isAdmin, userController.getUsers);
router.post("/forgotPassword", userController.forgotPassword);
router.post("/resetPassword", userController.resetPassword);
router.post("/refreshToken", userController.refreshToken);
router.post('/users/create', authenticateToken, isAdmin, userController.createUserByAdmin);


module.exports = router;
