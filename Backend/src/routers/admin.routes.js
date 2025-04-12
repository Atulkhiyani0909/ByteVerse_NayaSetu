import { Router } from "express";
import { allWorker } from "../controllers/admin.controller.js";

const router=Router();

router.route('/get-workers').get(allWorker)

export default router