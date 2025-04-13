import express from 'express'
import cookieParser from 'cookie-parser'
import Worker from './models/worker.model.js';
import Admin from './models/admin.model.js';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))
app.use(cookieParser())



import adminRoutes from './routers/admin.routes.js'
import ticketRoutes from './routers/ticket.routes.js'

app.use('/admin', adminRoutes)
app.use('/tickets', ticketRoutes);

export default app

