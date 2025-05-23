import { Router } from "express";
import { userMiddleware } from "../middlewares/auth.middleware.js";
import { allTickets, allWorker, loginAdmin, pendingComplaints, registerAdmin } from "../controllers/admin.controller.js";

const router=Router();

router.route('/register').post(registerAdmin)

router.route('/login').post(loginAdmin)

router.route('/get-workers').get(userMiddleware,allWorker)

router.route('/pending-tickets').get(userMiddleware,pendingComplaints)

//for test only
router.route('/allTickets').get(allTickets);

export default router