import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(express.static('public'))
app.use(cookieParser())




import adminRoutes from './routers/admin.routes.js'
import workerRoutes from './routers/worker.routes.js'
import authRoutes from './routers/auth.routes.js'
import ticketRoutes from './routers/ticket.routes.js'
import lawyerRoutes from './routers/lawyer.routes.js'

app.use('/auth', authRoutes)
app.use('/admin',adminRoutes)
app.use('/worker',workerRoutes)
app.use('/lawyer',lawyerRoutes)
app.use('/tickets', ticketRoutes);

export default app 


