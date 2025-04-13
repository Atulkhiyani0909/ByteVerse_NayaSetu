import { Router } from "express";
import { userMiddleware } from "../middlewares/auth.middleware.js";
import {getTickets, loginWorker, registerWorker, toggleTicket} from '../controllers/worker.controller.js'

const router =Router()


router.route('/register').post(registerWorker)
router.route('/login').post(loginWorker)
router.route('/get-tickets').get(userMiddleware,getTickets)
router.route('/toggle-ticket/:id/:Status').get(userMiddleware,toggleTicket)
 
export default router