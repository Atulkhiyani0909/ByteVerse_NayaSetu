import { Router } from "express";
import {getTickets} from '../controllers/worker.controller.js'

const router =Router()

router.route('/get-tickets').get(getTickets)
 
export default router