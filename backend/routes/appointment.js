import exporess from 'express';
import { cancelAppointment, createAppointment, getAppointments, getUserAppointments } from '../controller/appointment.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = exporess.Router();

router.post("/create", createAppointment);
router.get("/", getAppointments);
router.get("/user", verifyToken, getUserAppointments);
router.post("/cancel", cancelAppointment);

export default router;