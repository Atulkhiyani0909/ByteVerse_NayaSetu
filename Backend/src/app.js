import express from 'express'
import cookieParser from 'cookie-parser'
import Ticket from './models/tickets.model.js';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))
app.use(cookieParser())



//insert in DB
const answer = async ()=>{
    const tickets=[
        { 
            title:"Complaint against Staff",
            department:'Railway',
            description:'Staff are very rude',
            location:{
                city:'Gwalior',
                state:'Madhya Pradesh'
            }
        },
        { 
            title:"Complaint against Traffic Police",
            department:'Traffic Police',
            description:'Inspector is rude',
            location:{
                city:'Gwalior',
                state:'Madhya Pradesh'
            }
        }

    ]
      const done =await Ticket.insertMany(tickets);
      console.log(done);
      
 }
 
 //answer();

import adminRoutes from './routers/admin.routes.js'
import workerRoutes from './routers/worker.routes.js'
import authRoutes from './routers/auth.routes.js'
import ticketRoutes from './routers/ticket.routes.js'
import lawyerRoutes from './routers/lawyer.routes.js'

app.use('/api/auth', authRoutes)
app.use('/admin',adminRoutes)
app.use('/worker',workerRoutes)
app.use('/lawyer',lawyerRoutes)
app.use('/tickets', ticketRoutes);

export default app 


