import exporess from 'express';
import { getUser, userLogin, userLogout, userSignup } from '../controller/user.js';

const router = exporess.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/logout", userLogout);
router.get("/", getUser);

export default router;