import { Router } from "express";
import {getTickets, loginWorker, registerWorker} from '../controllers/worker.controller.js'

const router =Router()


router.route('/register').post(registerWorker)
router.route('/login').post(loginWorker)
router.route('/get-tickets').get(getTickets)
 
export default router