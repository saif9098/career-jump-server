import express from "express";
import {
  updateUserController,
} from "../controllers/userController.js";
import {userAuth,isAdmin} from "../middelwares/authMiddleware.js";

//router object
const router = express.Router();

//routes
// GET USER DATA || POST
router.get("/getUser", userAuth, (req, res) => {
  res.status(200,"hello").send({ ok: true });
});
//protected Admin route auth
router.get("/admin-auth", userAuth, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// UPDATE USER || PUT
router.put("/update-user", userAuth, updateUserController);

export default router;
