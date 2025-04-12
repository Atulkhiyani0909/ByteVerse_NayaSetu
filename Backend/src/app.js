import express from 'express'
import cookieParser from 'cookie-parser'

const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static('public'))
app.use(cookieParser())

export default app

// W4qxfqs0q0qpxDGp
 // mongodb+srv://atulkhiyani09:<db_password>@nayasetu.r48yc8w.mongodb.net/?retryWrites=true&w=majority&appName=nayaSetu
