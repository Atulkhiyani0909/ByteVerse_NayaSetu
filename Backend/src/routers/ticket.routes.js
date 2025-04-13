import express from 'express';
import { createTicket, getUserTickets } from '../controllers/ticket.controller.js';


//TODO Implement a middleware so that route is protect by not logged in users
const router = express.Router();

router.post('/:id', createTicket);

router.get('/:id', getUserTickets);

export default router;
