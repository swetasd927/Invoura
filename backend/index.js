import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { clerkMiddleware } from '@clerk/express'
import { connectDB } from './config/db.js';
import path from 'path';
import invoiceRouter from './routes/InvoiceRouter.js';

const app = express();
const port = 5000;

//Middleware
app.use(cors());
app.use(express.json({limit: "20mb"}));
app.use(express.urlencoded({limit: "20mb", extended: true}));
app.use(clerkMiddleware())

//DB
connectDB();


//Routes
app.use('/uploads', express.static(path.join(process.cwd(), "uploads")));
app.use('/api/invoice', invoiceRouter)

app.get('/',( req, res ) => {
    res.send("API is working");
});

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});