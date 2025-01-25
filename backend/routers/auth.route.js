import express from "express";
import { deleteUserMiddleware, forgotPasswordMiddleWare, loginMiddleWare, resetPasswordMiddleware, signinMiddleWare, verifymiddleware } from "../middlewares/user.authentication.middleware.js";
import { adminLogin, checkAuthWorking, deleteAccount, forgotPassword, login, logout, resetOldPassword, signup, verifyEmail } from "../controllers/user.controller.js";
import { ensureAuthentication } from "../middlewares/ensureAuth.js";

const authRouter = express.Router();

authRouter.route("/signup").post(signinMiddleWare, signup);
authRouter.route("/verify-email").post(verifymiddleware, verifyEmail);

authRouter.route("/login").post(loginMiddleWare, login);
authRouter.route("/logout").post(ensureAuthentication ,logout);  

authRouter.route("/delete-user").post(ensureAuthentication, deleteUserMiddleware, deleteAccount);

authRouter.route("/forgot-password").post(forgotPasswordMiddleWare, forgotPassword);
authRouter.route("/reset-password").post(resetPasswordMiddleware, resetOldPassword);

authRouter.route("/admin-login").post(adminLogin);

authRouter.route("/check-auth").get(ensureAuthentication, checkAuthWorking);

export default authRouter;