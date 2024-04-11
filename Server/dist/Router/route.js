import { Router } from "express";
const router = Router();
/** import all controllers */
import * as controller from "../Controller/appcontroller.js";
import { registerMail } from "../Controller/mailer.js";
import { localVariables } from "../middleware/auth.js";
import { verifyUser } from "../middleware/middleware.js";
/** POST Methods */
router.route("/register").post(controller.register); // register user
router.route("/registerMail").post(registerMail); // send the email
router.route("/authenticate").post(verifyUser, (req, res) => res.end()); // authenticate user
router.route("/login").post(controller.login); // login in app
router.route("/existmail").post(controller.checkmail);
/** GET Methods */
// router.route("/user/:email").get(controller.getUser); // user with username
router.route("/generateOTP").get(localVariables, controller.generateOTP); // generate random OTP
router.route("/verifyOTP").get(controller.verifyOTP); // verify generated OTP
router.route("/createResetSession").get(controller.createResetSession); // reset all the variables
/** PUT Methods */
// router.route("/updateuser").put(Auth, controller.updateUser); // is use to update the user profile
// router.route("/resetPassword").put(verifyUser, controller.resetPassword); // use to reset password
export default router;
