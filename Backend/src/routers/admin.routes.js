import { Router } from "express";
import { allWorker, loginAdmin, pendingComplaints, registerAdmin } from "../controllers/admin.controller.js";

const router=Router();

router.route('/register').post(registerAdmin)
router.route('/get-workers').get(allWorker)
router.route('/login').post(loginAdmin)
router.route('/pending-tickets').get(pendingComplaints)

export default router